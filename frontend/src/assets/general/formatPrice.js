export const formatPrice = (price) => {
  if (typeof price !== 'string') {
    const formattedPrice = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      useGrouping: true,
    }).format(price);

    return formattedPrice;
  }

  const numericPrice = parseInt(price.replace(/\D/g, ''));
  const formattedPrice = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    useGrouping: true,
  }).format(numericPrice);

  return formattedPrice;
};
