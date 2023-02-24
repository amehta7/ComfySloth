export const formatPrice = (price) => {
  const newPrice = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price / 100); // to convert dollar into cents === price/100
  return newPrice;
};

export const getUniqueValues = (data, type) => {
  let unique = data.map((d) => d[type]);
  //console.log(unique);

  if (type === "colors") {
    unique = unique.flat();
    // console.log(unique);
    return ["all", ...new Set(unique)];
  }
  // let uniqueArray = new Set(unique);
  // return ["all", ...uniqueArray];

  return ["all", ...new Set(unique)];
};
