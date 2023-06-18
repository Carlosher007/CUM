import * as yup from 'yup';

export const virtualQuoteValidation = yup.object().shape({
  initial_dues: yup
    .string()
    .required('El valor de cuotas iniciales es obligatorio')
    .test(
      'is-number',
      'El valor de cuotas iniciales debe ser un número',
      (value) => !isNaN(value)
    )
    .test(
      'minimum-value',
      'El valor de cuotas iniciales debe ser mínimo de 1 millón',
      (value) => parseInt(value) >= 1000000
    ),
  number_dues: yup
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
