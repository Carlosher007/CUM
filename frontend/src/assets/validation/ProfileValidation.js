import * as yup from 'yup';

export const profileValidation = yup.object().shape({
  phone: yup
    .string()
    .matches(
      /^\d{8,10}$/,
      'El número de teléfono debe tener entre 8 y 10 dígitos'
    ),
});
