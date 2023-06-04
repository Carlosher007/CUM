import * as yup from 'yup';

export const presentialQuoteValidation = yup.object().shape({
  name: yup.string().required('El nombre es obligatorio'),
  date: yup
    .date()
    .required('La fecha es obligatoria')
    .min(new Date(), 'La fecha debe ser igual o posterior a hoy')
    .test(
      'week-day-validation',
      'La fecha debe ser un día de la semana',
      function (value) {
        const dayOfWeek = value.getDay();
        return dayOfWeek >= 1 && dayOfWeek <= 5; // 1-5 representan lunes a viernes
      }
    ),
  time: yup
    .string()
    .required('La hora es obligatoria')
    .test(
      'time-validation',
      'La hora debe estar entre las 8am y las 5pm',
      function (value) {
        if (!value) {
          return false;
        }

        const [hour, minute] = value.split(':');
        const selectedTime = new Date();
        selectedTime.setHours(hour);
        selectedTime.setMinutes(minute);

        const startTime = new Date();
        startTime.setHours(8);
        startTime.setMinutes(0);

        const endTime = new Date();
        endTime.setHours(17);
        endTime.setMinutes(0);

        return selectedTime >= startTime && selectedTime <= endTime;
      }
    ),
  city: yup.string().required('La sucursal es obligatoria'),
});
