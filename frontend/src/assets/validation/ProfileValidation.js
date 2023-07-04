import * as yup from 'yup';

export const profileValidation = yup.object().shape({
  cellphone: yup
    .string()
    .test('is-number', 'El campo debe ser un número de teléfono válido', value => {
      if (!value) return true; // Permitir campos vacíos si se desea
      
      // Verificar si el valor es un número de teléfono válido
      const regex = /^[0-9]+$/;
      return regex.test(value);
    })
});
