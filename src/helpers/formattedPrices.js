// Agregar dos ceros al final de item.price
export const formattedPrice = (num) => {
  const fixedPrice = parseFloat(num).toFixed(2);
  return fixedPrice;
};
