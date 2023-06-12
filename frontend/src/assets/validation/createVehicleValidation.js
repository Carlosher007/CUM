import * as yup from 'yup';

export const createVehicleValidation = yup.object().shape({
  model: yup.string().required('El modelo es obligatorio'),
  year: yup.number().required('El año es obligatorio'),
  brand: yup.string().required('La marca es obligatoria'),
  doors: yup.number().required('El numero de puertas es obligatorio'),
  motor: yup.string().required('El tipo de motor es requerido'),
  potency: yup.number().required('La potencia es obligatoria'),
  range: yup.number().required('El rango es obligatorio'),
  baterry_capacity: yup.number().required('La capacidad de bateria es obligatoria'),
  charging_time: yup.number().required('El tiempo de carga es obligatorio'),
  top_speed: yup.number().required('La velocidad maxima es obligatoria'),
  brakes: yup.string().required('El tipo de frenos es obligatorio'),
  suspension: yup.string().required('El tipo de suspensión es obligatoria'),
  img_url: yup.string().required('La imagen es obligatoria'),
  price: yup.number().required('El precio es obligatorio'),
  description: yup.string().required('La descripcion es obligaotria'),
  color: yup.string().required('El color es obligatorio'),
});
