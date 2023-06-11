import * as yup from 'yup';

export const editProfileValidation = yup.object().shape({
  cellphone: yup
    .string()
    .matches(
      /^\d{8,10}$/,
      'El número de teléfono debe tener entre 8 y 10 dígitos'
    ),
  email: yup.string().email('El correo electrónico no es válido'),
});
