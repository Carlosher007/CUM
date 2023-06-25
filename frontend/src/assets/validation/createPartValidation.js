import * as yup from 'yup';
export const createPartValidation = yup.object().shape({
  name: yup.string().required('El nombre es obligatorio'),
  price: yup
    .string()
    .required('El precio es obligatorio')
    .test(
      'is-number',
      'El precio debe ser un número',
      (value) => !isNaN(Number(value))
    ),
  vehicle: yup.string().required('Seleccione un vehículo'),
  sucursal: yup.string().required('Necesita una sucursal'),
  quantity: yup
    .string()
    .required('Digite una cantidad')
    .test(
      'is-number',
      'La cantidad debe ser un número',
      (value) => !isNaN(Number(value))
    ),
});
