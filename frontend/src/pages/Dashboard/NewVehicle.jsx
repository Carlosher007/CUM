import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import { CirclePicker } from 'react-color';
import { RiEdit2Line } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { Form, FormGroup, FormText, Input } from 'reactstrap';
import Cookies from 'universal-cookie';
import { newCar } from '../../assets/api/cars';
import {
  bodyWorkData,
  brakesData,
  motorData,
  suspensionData,
} from '../../assets/api/defaultData';
import {
  codeToColorName,
  colorNameToCode,
  colorOptions,
} from '../../assets/color/colorUtils';
import { createVehicleValidation } from '../../assets/validation/createVehicleValidation';

const NewVehicle = () => {
  const cookies = new Cookies();
  const idSucursal = cookies.get('sucursal');

  const [vehicles,setVehicles] = useState([])  
  
  useEffect(() => {
    const getAllVehicles = async () => {
       try {
        //  const { data } = await getSucursals();
        //  setSucursals(data);
       } catch (error) {
         if (error.response) {
           const { data } = error.response;
           // Mostrar mensaje de error al usuario o tomar alguna acción según corresponda
           toast.error(data.error, {
             position: toast.POSITION.TOP_RIGHT,
           });
         }
       }
    }
  },[])

  const createVehicle = async (values) => {
    try {
      const { data } = await newCar(values);
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

  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);

  const handleColorChange = (color) => {
    setSelectedColor(color.hex.toUpperCase());
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
      suspension: '',
      img_url: '',
      price: '',
      description: '',
      color: selectedColor,
      sucursal: idSucursal,
    },
    // validationSchema: createVehicleV.alidation,
    onSubmit: (values) => {
      // createVehicle(values);
      console.log(values);
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
      <div>
        <h1 className=" text-2xl font-bold">Añadir un Vehiculo</h1>
        <div className="mt-5">
          <div style={{ backgroundColor: 'transparent' }} className="">
            <h2 className=" text-xl mb-4 font-bold">Seleccione un Vehiculo</h2>
            <FormGroup>
              <Input
                type="select"
                name="bodywork"
                className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900 appearance-none"
                onChange={() => {}}
              >
                <option value="">Seleccione uno</option>
                {bodyWorkData.map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <button className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900 appearance-none">
                Rehacer
              </button>
            </FormGroup>
          </div>
        </div>
      </div>
      <Form
        style={{ backgroundColor: 'transparent' }}
        className="mt-6"
        onSubmit={handleSubmit}
      >
        <h2 className=" text-xl mb-4 font-bold">Datos del Vehiculo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <FormGroup>
              <div>
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
          </div>
          <div>
            <FormGroup>
              <div>
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
          <div>
            <FormGroup>
              <div>
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
          </div>
          <div>
            <FormGroup>
              <div>
                <p>
                  Carroceria <span className="text-red-500">*</span>
                </p>
              </div>
              <Input
                type="select"
                name="bodywork"
                value={values.bodywork}
                className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900 appearance-none"
                onChange={handleChange}
                invalid={touched.bodywork && !!errors.bodywork}
              >
                <option value="">Seleccione un tipo</option>
                {bodyWorkData.map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </Input>
              {touched.bodywork &&
                errors.bodywork &&
                showErrorToast(errors.bodywork)}
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <div>
                <p>
                  Puertas <span className="text-red-500">*</span>
                </p>
              </div>
              <Input
                type="text"
                className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                placeholder="Número de puertas"
                name="doors"
                value={values.doors}
                onChange={handleChange}
                invalid={touched.doors && !!errors.doors}
              />
              {touched.doors && errors.doors && showErrorToast(errors.doors)}
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <div>
                <p>
                  Motor <span className="text-red-500">*</span>
                </p>
              </div>
              <Input
                type="select"
                name="motor"
                value={values.motor}
                className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900 appearance-none"
                onChange={handleChange}
                invalid={touched.motor && !!errors.motor}
              >
                <option value="">Seleccione un tipo</option>
                {motorData.map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </Input>
              {touched.motor && errors.motor && showErrorToast(errors.motor)}
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <div>
                <p>
                  Potencia <span className="text-red-500">*</span>
                </p>
              </div>
              <Input
                type="text"
                className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                placeholder="Potencia"
                name="potency"
                value={values.potency}
                onChange={handleChange}
                invalid={touched.potency && !!errors.potency}
              />
              {touched.potency &&
                errors.potency &&
                showErrorToast(errors.potency)}
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <div>
                <p>
                  Rango <span className="text-red-500">*</span>
                </p>
              </div>
              <Input
                type="text"
                className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                placeholder="Rango"
                name="range"
                value={values.range}
                onChange={handleChange}
                invalid={touched.range && !!errors.range}
              />
              {touched.range && errors.range && showErrorToast(errors.range)}
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <div>
                <p>
                  Capacidad de Batería <span className="text-red-500">*</span>
                </p>
              </div>
              <Input
                type="text"
                className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                placeholder="Capacidad de bateria"
                name="battery_capacity"
                value={values.battery_capacity}
                onChange={handleChange}
                invalid={touched.battery_capacity && !!errors.battery_capacity}
              />
              {touched.battery_capacity &&
                errors.battery_capacity &&
                showErrorToast(errors.battery_capacity)}
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <div>
                <p>
                  Tiempo de carga <span className="text-red-500">*</span>
                </p>
              </div>
              <Input
                type="text"
                className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                placeholder="Tiempo de carga"
                name="charging_time"
                value={values.charging_time}
                onChange={handleChange}
                invalid={touched.charging_time && !!errors.charging_time}
              />
              {touched.charging_time &&
                errors.charging_time &&
                showErrorToast(errors.charging_time)}
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <div>
                <p>
                  Velocidad Máxima <span className="text-red-500">*</span>
                </p>
              </div>
              <Input
                type="text"
                className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                placeholder="Velocidad Máxima"
                name="top_speed"
                value={values.top_speed}
                onChange={handleChange}
                invalid={touched.top_speed && !!errors.top_speed}
              />
              {touched.top_speed &&
                errors.top_speed &&
                showErrorToast(errors.top_speed)}
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <div>
                <p>
                  Frenos <span className="text-red-500">*</span>
                </p>
              </div>
              <Input
                type="select"
                name="brakes"
                value={values.brakes}
                className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900 appearance-none"
                onChange={handleChange}
                invalid={touched.brakes && !!errors.brakes}
              >
                <option value="">Seleccione un tipo</option>
                {brakesData.map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </Input>
              {touched.brakes && errors.brakes && showErrorToast(errors.brakes)}
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <div>
                <p>
                  Suspension <span className="text-red-500">*</span>
                </p>
              </div>
              <Input
                type="select"
                name="suspension"
                value={values.suspension}
                className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900 appearance-none"
                onChange={handleChange}
                invalid={touched.suspension && !!errors.suspension}
              >
                <option value="">Seleccione un tipo</option>
                {suspensionData.map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </Input>
              {touched.suspension &&
                errors.suspension &&
                showErrorToast(errors.suspension)}
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <div>
                <p>
                  Precio <span className="text-red-500">*</span>
                </p>
              </div>
              <Input
                type="text"
                className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                placeholder="Precio"
                name="price"
                value={values.price}
                onChange={handleChange}
                invalid={touched.price && !!errors.price}
              />
              {touched.price && errors.price && showErrorToast(errors.price)}
            </FormGroup>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between mt-12">
          <div className="w-full  mt-4 sm:mt-0 space-x-2">
            <div>
              <FormGroup>
                <div>
                  <p>
                    Descripción <span className="text-red-500">*</span>
                  </p>
                </div>
                <Input
                  type="textarea"
                  className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                  placeholder="Descripcion"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  invalid={touched.description && !!errors.description}
                />
                {touched.description &&
                  errors.description &&
                  showErrorToast(errors.description)}
              </FormGroup>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between mt-8">
          <div className="w-full  mt-4 sm:mt-0 space-x-2">
            <div>
              <FormGroup>
                <div>
                  <p>
                    Imagen <span className="text-red-500">*</span>
                  </p>
                </div>
                <div className="flex-1">
                  <div className="relative mt-2">
                    <img
                      src="https://img.freepik.com/foto-gratis/negocios-finanzas-empleo-concepto-mujeres-emprendedoras-exitosas-joven-empresaria-segura-anteojos-mostrando-gesto-pulgar-arriba-sostenga-computadora-portatil-garantice-mejor-calidad-servicio_1258-59118.jpg"
                      className="w-28 h-28 object-cover rounded-lg"
                      alt="Imagen de una persona"
                    />
                    <label
                      htmlFor="img_url"
                      className="absolute bg-secondary-100 p-2 rounded-full hover:cursor-pointer -top-2 left-24"
                    >
                      <RiEdit2Line />
                    </label>
                    <input
                      type="file"
                      id="img_url"
                      className="hidden"
                      onChange={handleChange}
                    />
                  </div>
                  <p className="text-gray-500 text-sm">
                    Tipos de img permitidos: png, jpg, jpeg.
                  </p>
                </div>
                {touched.img_url &&
                  errors.img_url &&
                  showErrorToast(errors.img_url)}
              </FormGroup>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between mt-5">
          <div className="w-full  mt-4 sm:mt-0 space-x-2">
            <div>
              <FormGroup>
                <div>
                  <p>
                    Color <span className="text-red-500">*</span> :{' '}
                    {selectedColor
                      ? codeToColorName(selectedColor).charAt(0).toUpperCase() +
                        codeToColorName(selectedColor).slice(1)
                      : 'Sin definir'}
                  </p>
                </div>
                <div className="my-4">
                  <div className="color__options">
                    <CirclePicker
                      colors={colorOptions}
                      color={selectedColor}
                      onChangeComplete={handleColorChange}
                      circleSize={30}
                      circleSpacing={10}
                    />
                  </div>
                </div>
                {touched.color && errors.color && showErrorToast(errors.color)}
              </FormGroup>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-primary/80 text-black py-2 px-4 rounded-lg hover:bg-primary transition-colors"
            onClick={() => {
              handleSubmit(); // Primera función
            }}
          >
            Guardar
          </button>
        </div>
      </Form>
    </div>
  );
};

export default NewVehicle;
