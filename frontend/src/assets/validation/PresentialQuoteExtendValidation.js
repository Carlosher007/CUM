import * as yup from 'yup';

export const presentialQuoteExtendValidation = yup.object().shape({
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
  cc: yup
    .string()
    .required('El número de cédula es obligatorio')
    .matches(
      /^\d{6,10}$/,
      'El número de cédula debe tener entre 6 y 10 dígitos'
    ),
  phone: yup
    .string()
    .required('El número de teléfono es obligatorio')
    .matches(
      /^\d{8,10}$/,
      'El número de teléfono debe tener entre 8 y 10 dígitos'
    ),
  email: yup
    .string()
    .email('El correo electrónico no es válido')
    .required('El correo electrónico es obligatorio'),
  address: yup.string().required('La dirección es obligatoria'),
  password: yup
    .string()
    .required('La contraseña es obligatoria')
    .matches(
      /^(?=.*\d).{6,15}$/,
      'La contraseña debe tener entre 6 y 15 caracteres y al menos un número'
    ),
});
