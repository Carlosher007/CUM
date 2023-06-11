import * as yup from 'yup';

export const createProfileValidation = yup.object().shape({
  cellphone: yup
    .string()
    .matches(
      /^\d{8,10}$/,
      'El número de teléfono debe tener entre 8 y 10 dígitos'
    )
    .required('El celular es obligatorio'),
  email: yup
    .string()
    .email('El correo electrónico no es válido')
    .required('El correo electrónico es obligatorio'),
  rol: yup.string().required('El rol es obligatorio'),
  full_name: yup.string().required('El nombre es obligatorio'),
  address: yup.string().required('La dirección es obligatoria'),
  sucursal: yup.string().required('La sucursal es obligatoria'),
});
