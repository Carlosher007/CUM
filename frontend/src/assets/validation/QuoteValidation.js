import * as yup from 'yup';

export const quoteValidation = yup.object().shape({
  wayPay: yup.string().required('Elija una forma de pago'),
  numberCC: yup
    .string()
    .required('Digite el número de tarjeta de crédito')
    .test(
      'is-number',
      'El número de tarjeta de crédito debe ser un número',
      (value) => {
        return /^[0-9]+$/.test(value); // Verifica que el valor sea un número
      }
    ),
  dateExpectedCC: yup
    .string()
    .required('Ponga la fecha de expedición de la tarjeta de crédito'),
  segurityCodeCC: yup
    .string()
    .required('Digite el número de seguridad de la tarjeta de crédito')
    .test(
      'max-length',
      'El número de seguridad debe tener 4 dígitos',
      (value) => {
        return /^\d+$/.test(value) && value.length === 4; // Verifica que el valor sea numero menor a 4 digitos
      }
    ),
});
