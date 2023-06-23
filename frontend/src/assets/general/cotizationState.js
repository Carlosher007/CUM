export const listState = [
  {
    value: 'IN_PROGRESS',
    return: 'En Progreso',
  },
  {
    value: 'CANCELLED',
    return: 'Cancelado',
  },
  {
    value: 'ACCEPTED',
    return: 'Aceptado',
  },
  {
    value: 'FINISHED',
    return: 'Finalizado',
  },
];

export const renderCState = (rol) => {
  const state = listState.find((item) => item.value === rol);
  if (state) {
    return state.return
  } else {
    return rol
  }
};