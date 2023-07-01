import * as yup from 'yup';

export const loginValidation = yup.object().shape({
  email: yup
    .string()
    .email('El correo electrónico no es válido')
    .required('El correo electrónico es obligatorio'),
  password: yup.string().required('La contraseña es obligatoria'),
});
