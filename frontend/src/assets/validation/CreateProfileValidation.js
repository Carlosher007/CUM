import * as yup from 'yup';

export const createProfileValidation = yup.object().shape({
  cellphone: yup
    .string()
    .required('El celular es obligatorio'),
  email: yup
    .string()
    .email('El correo electrónico no es válido')
    .required('El correo electrónico es obligatorio'),
  rol: yup.string().required('El rol es obligatorio'),
  full_name: yup.string().required('El nombre es obligatorio'),
  address: yup.string().required('La dirección es obligatoria'),
  sucursal: yup.string().required('La sucursal es obligatoria'),
  id: yup.number().required('La cc es obligatoria')
});
