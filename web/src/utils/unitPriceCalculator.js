/**
 * Unit Price & Comparison Logic for ScanIQ
 * Calculates normalized price per 100g, 100ml, or per unit (electronics / appliances).
 * Determines better value, payable price, and checks fair category comparison.
 */

export function isFoodProduct(prod) {
  if (!prod) return false;
  if (prod.productType) return prod.productType === "food";
  if (prod.nutritionalInfo && Object.keys(prod.nutritionalInfo).length > 0) return true;
  if (prod.packageSize?.unit === "g" || prod.packageSize?.unit === "ml") return true;
  return false;
}

export function calculateUnitPrice(price, packageSize, productType = "food") {
  if (!price) return 0;
  
  if (productType === "electronics" || packageSize?.unit === "unit") {
    return Number(Number(price).toFixed(2));
  }

  const quantity = packageSize?.value || packageSize;
  if (!quantity || quantity <= 0) {
    return Number(price);
  }

  const per100 = (Number(price) / Number(quantity)) * 100;
  return Number(per100.toFixed(2));
}

export function compareProducts(prodA, prodB, currency = "₹") {
  if (!prodA || !prodB) return null;

  const isFoodA = isFoodProduct(prodA);
  const isFoodB = isFoodProduct(prodB);

  const unitA = calculateUnitPrice(prodA.price, prodA.packageSize, prodA.productType);
  const unitB = calculateUnitPrice(prodB.price, prodB.packageSize, prodB.productType);

  let betterValue = "EQUAL";
  let savingsPercent = "0.0";

  if (unitA > 0 && unitB > 0) {
    if (unitA < unitB) {
      betterValue = "A";
      savingsPercent = (((unitB - unitA) / unitB) * 100).toFixed(1);
    } else if (unitB < unitA) {
      betterValue = "B";
      savingsPercent = (((unitA - unitB) / unitA) * 100).toFixed(1);
    }
  }

  // Fair comparison check: Category comparison
  const catA = (prodA.category || "").trim().toLowerCase();
  const catB = (prodB.category || "").trim().toLowerCase();
  const isSameCategory = catA && catB && (catA.includes(catB) || catB.includes(catA) || catA === catB);

  // Store final payable price calculation for each product
  const getDealsSummary = (deals, basePrice) => {
    if (!deals || deals.length === 0) {
      return [{
        store: "Standard Retail",
        platform: "Retail",
        basePrice: Number(basePrice),
        deliveryFee: 0,
        discount: 0,
        finalPayable: Number(basePrice),
        isLowest: true,
        source: "MRP / Catalog",
        dataType: "CATALOG_BENCHMARK_MRP"
      }];
    }

    const calculated = deals.map(deal => {
      const delivery = Number(deal.delivery || deal.deliveryFee || 0);
      const discount = Number(deal.discount || 0);
      const base = Number(deal.price || basePrice);
      const finalPrice = deal.finalPayable !== undefined ? Number(deal.finalPayable) : Math.max(0, base + delivery - discount);
      return {
        ...deal,
        store: deal.store || deal.platform || "Online Store",
        platform: deal.platform || deal.store || "Online",
        basePrice: base,
        deliveryFee: delivery,
        discount,
        finalPayable: finalPrice,
        dataType: deal.dataType || "LIVE_API_FEED",
        isLowest: false
      };
    });

    // Mark the lowest payable price
    let lowest = calculated[0];
    for (const d of calculated) {
      if (d.finalPayable < lowest.finalPayable) {
        lowest = d;
      }
    }
    lowest.isLowest = true;

    return calculated;
  };

  const dealsA = getDealsSummary(prodA.deals, prodA.price);
  const dealsB = getDealsSummary(prodB.deals, prodB.price);

  let unitLabel = "100g";
  if (!isFoodA || !isFoodB || prodA.productType === "electronics") {
    unitLabel = "unit";
  } else if (prodA.packageSize?.unit === "ml") {
    unitLabel = "100ml";
  }

  return {
    unitA,
    unitB,
    unitUnit: unitLabel,
    isFoodComparison: isFoodA && isFoodB,
    betterValue,
    savingsPercent,
    isSameCategory,
    categoryA: prodA.category,
    categoryB: prodB.category,
    dealsA,
    dealsB,
    currency
  };
}
