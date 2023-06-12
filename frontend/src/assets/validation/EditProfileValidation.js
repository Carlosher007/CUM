import * as yup from 'yup';

export const editProfileValidation = yup.object().shape({
  cellphone: yup
    .string(),
  email: yup.string().email('El correo electrónico no es válido'),
});
