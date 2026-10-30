/**
 * In-Store Physical Shelf Price vs Online Deal Comparison Engine
 */

export function checkStoreVsOnlinePrice(product, inStorePrice) {
  if (!product || !inStorePrice || isNaN(inStorePrice)) {
    return null;
  }

  const shelfPrice = Number(inStorePrice);

  // Compute lowest online payable price across available store deals
  let lowestOnlineDeal = null;
  if (product.deals && product.deals.length > 0) {
    const dealsWithFinal = product.deals.map((d) => {
      const delivery = Number(d.delivery || 0);
      const discount = Number(d.discount || 0);
      const finalPayable = Math.max(0, Number(d.price) + delivery - discount);
      return {
        ...d,
        finalPayable
      };
    });

    lowestOnlineDeal = dealsWithFinal.reduce((min, d) =>
      d.finalPayable < min.finalPayable ? d : min
    );
  } else {
    lowestOnlineDeal = {
      store: "Online Benchmark",
      finalPayable: Number(product.price || 0),
      delivery: 0,
      discount: 0
    };
  }

  const onlinePrice = lowestOnlineDeal.finalPayable;
  const diff = Number((shelfPrice - onlinePrice).toFixed(2));
  const absDiff = Math.abs(diff);
  const percentage = onlinePrice > 0 ? ((absDiff / onlinePrice) * 100).toFixed(1) : "0.0";

  let verdict = "FAIR"; // OVERPRICED | CHEAPER | FAIR
  if (diff > 5) {
    verdict = "OVERPRICED";
  } else if (diff < -5) {
    verdict = "CHEAPER";
  }

  return {
    shelfPrice,
    lowestOnlineDeal,
    onlinePrice,
    diff,
    absDiff,
    percentage,
    verdict
  };
}
