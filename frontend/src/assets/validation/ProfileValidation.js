import * as yup from 'yup';

export const profileValidation = yup.object().shape({
  cellphone: yup
    .string()
});
