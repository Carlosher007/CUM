// En el archivo donde se encuentra la variable global (por ejemplo, GlobalState.js)
let modo = 'landing';

export const cambiarModo = (nuevoModo) => {
  modo = nuevoModo;
};

export const obtenerModo = () => {
  return modo;
};
