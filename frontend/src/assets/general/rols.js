export const listRols = [
  {
    value: 'Cliente',
    return: 'Cliente',
  },
  {
    value: 'JefeTaller',
    return: 'Jefe de Taller',
  },
  {
    value: 'Vendedor',
    return: 'Vendedor',
  },
  {
    value: 'Gerente',
    return: 'Gerente',
  },
];

export const renderRoltate = (rol) => {
  const state = listRols.find((item) => item.value === rol);
  if (state) {
    return state.return
  } else {
    return rol
  }
};