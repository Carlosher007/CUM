export const listStateWorkOrder = [
  {
    value: 'CANCELLED',
    return: 'Cancelado',
  },
  {
    value: 'SENT',
    return: 'Enviado',
  },
  {
    value: 'FINISHED',
    return: 'Finalizado',
  },
];

export const renderWOState = (rol) => {
  const state = listStateWorkOrder.find((item) => item.value === rol);
  if (state) {
    return state.return
  } else {
    return rol
  }
};