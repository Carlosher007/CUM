import { useFormik } from 'formik';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Form, FormGroup, FormText, Input } from 'reactstrap';
import { newCar } from '../../assets/api/cars';
import {
  brakesData,
  motorData,
  suspensionData,
} from '../../assets/api/defaultData';
import { createVehicleValidation } from '../../assets/validation/createVehicleValidation';

const NewVehicle = () => {
  const createVehicle = async (values) => {
    try {
      const { data } = await NewVehicle(values);
      console.log(data);
      formik.resetForm();
      toast.success('Vehiculo creado correctamente', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        // Mostrar mensaje de error al usuario o tomar alguna acción según corresponda
        toast.error(data.error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      model: '',
      year: '',
      brand: '',
      bodywork: '',
      doors: '',
      motor: '',
      potency: '',
      range: '',
      battery_capacity: '',
      charging_time: '',
      top_speed: '',
      brakes: '',
      city: '',
      suspension: '',
      img_url: '',
      price: '',
      description: '',
    },
    validationSchema: createVehicleValidation,
    onSubmit: (values) => {
      createVehicle(values);
    },
  });

  const { handleSubmit, handleChange, values, touched, errors } = formik;

  const [errorShown, setErrorShown] = useState(false);

  const showErrorToast = (message) => {
    if (!errorShown) {
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setErrorShown(true);
    }
  };

  const resetErrorShown = () => {
    setErrorShown(false);
  };

  return (
    <div className="bg-secondary-100 p-8 rounded-xl mb-4">
      <h2 className=" text-2xl font-bold">Cotice su vehiculo ahora</h2>
      <Form
        style={{ backgroundColor: 'transparent' }}
        className="form"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap items-center justify-between">
          <div className="w-full sm:w-1/2 ">
            <FormGroup className="w-full">
              <div className="w-full md:w-1/4">
                <p>
                  Modelo <span className="text-red-500">*</span>
                </p>
              </div>
              <Input
                className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                type="text"
                placeholder="Modelo"
                name="model"
                value={values.model}
                onChange={handleChange}
                invalid={touched.model && !!errors.model}
              />
              {touched.model && errors.model && showErrorToast(errors.model)}
            </FormGroup>
            <FormGroup className="w-full">
              <div className="w-full md:w-1/4">
                <p>
                  Año <span className="text-red-500">*</span>
                </p>
              </div>
              <Input
                type="text"
                className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                placeholder="Año"
                name="year"
                value={values.year}
                onChange={handleChange}
                invalid={touched.year && !!errors.year}
              />
              {touched.year && errors.year && showErrorToast(errors.year)}
            </FormGroup>
          </div>
          <div className="w-full sm:w-1/2 mt-4 sm:mt-0 space-x-2">
            <FormGroup className="w-full ml-2">
              <div className="w-full md:w-1/4">
                <p>
                  Marca <span className="text-red-500">*</span>
                </p>
              </div>
              <Input
                type="text"
                className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                placeholder="Marca"
                name="brand"
                value={values.brand}
                onChange={handleChange}
                invalid={touched.brand && !!errors.brand}
              />
              {touched.brand && errors.brand && showErrorToast(errors.brand)}
            </FormGroup>
            <FormGroup className="w-full ml-2">
              <div className="w-full md:w-1/4">
                <p>
                  Carroceria <span className="text-red-500">*</span>
                </p>
              </div>
              <Input
                type="text"
                className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                placeholder="Carroceria"
                name="bodywork"
                value={values.bodywork}
                onChange={handleChange}
                invalid={touched.bodywork && !!errors.bodywork}
              />
              {touched.bodywork &&
                errors.bodywork &&
                showErrorToast(errors.bodywork)}
            </FormGroup>
          </div>
        </div>

        <h6 className="font-bold mt-5">Datos para la Plataforma</h6>
        <div className="flex flex-wrap items-center justify-between">
          <div className="w-full sm:w-1/2 mt-4 sm:mt-0 space-x-2">
            <FormGroup className="w-full ml-2">
              <FormText>Sucursal</FormText>
              <Input
                type="select"
                name="city"
                value={values.city}
                className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900 appearance-none"
                onChange={handleChange}
                invalid={touched.city && !!errors.city}
              >
                <option value="">Seleccione una ciudad</option>
                {brakesData.map((brakes) => (
                  <option value={brakes.city} key={brakes.id}>
                    {brakes.city}
                  </option>
                ))}
              </Input>
              {touched.city && errors.city && showErrorToast(errors.city)}
            </FormGroup>
          </div>
        </div>
        <div className="flex items-center justify-center flex-wrap mt-4">
          <FormGroup className="w-1/4">
            <button
              className="btn find__car-btn"
              type="submit"
              onClick={resetErrorShown}
            >
              Enviar
            </button>
          </FormGroup>
        </div>
      </Form>
    </div>
  );
};

export default NewVehicle;
