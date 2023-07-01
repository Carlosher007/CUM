import * as yup from 'yup';

export const presentialQuoteExtendValidation = yup.object().shape({
  name: yup.string().required('El nombre es obligatorio'),
  date: yup
    .date()
    .required('La fecha es obligatoria')
    .min(new Date(), 'La fecha debe ser igual o posterior a hoy'),
  time: yup
    .string()
    .required('La hora es obligatoria'),
  city: yup.string().required('La sucursal es obligatoria'),
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
  password: yup
    .string()
    .required('La contraseña es obligatoria'),
});
