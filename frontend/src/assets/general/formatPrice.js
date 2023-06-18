export const formatPrice = (price) => {
  const formattedPrice = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    useGrouping: true,
  }).format(price);

  return formattedPrice;
};
