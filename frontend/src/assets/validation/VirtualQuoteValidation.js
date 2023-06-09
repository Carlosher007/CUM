import * as yup from 'yup';

export const virtualQuoteValidation = yup.object().shape({
  initial_fee: yup
    .string()
    .required('El valor de cuotas iniciales es obligatorio')
    .test(
      'is-number',
      'El valor de cuotas iniciales debe ser un número',
      (value) => !isNaN(value)
    )
    .test(
      'minimum-value',
      'El valor de cuotas iniciales debe ser mínimo de un millón',
      (value) => parseInt(value) >= 1000000
    )
    .test(
      'minimum-value',
      'El valor de cuotas iniciales no debe pasar de $2147.483.647',
      (value) => parseInt(value) <2147483647
    ),
  num_installments: yup
    .string()
    .required('El valor del número de cuotas es obligatorio')
    .test(
      'valid-number',
      'El número de cuotas debe estar entre 2 y 24',
      (value) => {
        if (!isNaN(value)) {
          const numberDues = parseInt(value);
          return numberDues > 1 && numberDues <= 24;
        }
        return false;
      }
    ),
});
