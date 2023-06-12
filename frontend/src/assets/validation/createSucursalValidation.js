import * as yup from 'yup';

export const createSucursalValidation = yup.object().shape({
  city: yup.string().required('La ciudad es obligatoria'),
  address: yup.string().required('La dirección es obligatoria'),
  cellphone: yup.string().required('El celular es obligatorio'),
});
