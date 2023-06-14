import * as yup from 'yup';

export const virtualQuoteValidation = yup.object().shape({
  name: yup.string().required('El nombre es obligatorio'),
  sucursal: yup.string().required('La sucursal es obligatoria'),
  cc: yup
    .string()
    .required('El número de cédula es obligatorio'),
  phone: yup
    .string()
    .required('El número de teléfono es obligatorio'),
  email: yup
    .string()
    .email('El correo electrónico no es válido')
    .required('El correo electrónico es obligatorio'),
  address: yup.string().required('La dirección es obligatoria'),
  // password: yup
  //   .string()
  //   .required('La contraseña es obligatoria')
  //   .matches(
  //     /^(?=.*\d).{6,15}$/,
  //     'La contraseña debe tener entre 6 y 15 caracteres y al menos un número'
  //   ),
});
