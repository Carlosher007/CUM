import * as yup from 'yup';

export const presentialQuoteValidation = yup.object().shape({
  name: yup.string().required('El nombre es obligatorio'),
  date: yup
    .date()
    .required('La fecha es obligatoria')
    .min(new Date(), 'La fecha debe ser igual o posterior a hoy'),
  time: yup
    .string()
    .required('La hora es obligatoria')
    .test(
      'time-validation',
      'La hora debe ser posterior a la hora actual',
      function (value) {
        const currentTime = new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });

        if (!value) {
          return false;
        }

        const isTimeValid = value >= currentTime;

        return isTimeValid;
      }
    ),
  city: yup.string().required('La sucursal es obligatoria'),
});
