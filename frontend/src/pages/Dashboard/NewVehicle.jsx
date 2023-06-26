import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { CirclePicker } from 'react-color';
import { RiEdit2Line } from 'react-icons/ri';
import { Link, URL } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, FormGroup, FormText, Input } from 'reactstrap';
import Cookies from 'universal-cookie';
import { getCar, newCar, newCarInSucursal } from '../../assets/api/cars';
import {
  bodyWorkData,
  brakesData,
  motorData,
  suspensionData,
} from '../../assets/api/defaultData';
import { getCarsBySucursal } from '../../assets/api/sucursal.api';
import {
  codeToColorName,
  colorNameToCode,
  colorOptions,
} from '../../assets/color/colorUtils';
import { urls } from '../../assets/urls/urls';
import { createVehicleValidation } from '../../assets/validation/createVehicleValidation';

const NewVehicle = () => {
  const cookies = new Cookies();
  const idSucursal = cookies.get('sucursal');

  const [vehicles, setVehicles] = useState([]);
  const [idCarSelectedValue, setIdCarSelectedValue] = useState('');
  const [car, setCar] = useState({});
  const [resetForm, setResetForm] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const getCarData = async (id) => {
    try {
      const { data } = await getCar(id);
      setCar(data);
      const {
        model,
        year,
        brand,
        bodywork,
        doors,
        motor,
        potency,
        range,
        battery_capacity,
        charging_time,
        top_speed,
        brakes,
        suspension,
        image,
        price,
        description,
      } = data;
      formik.setValues({
        ...formik.values,
        model,
        year,
        brand,
        bodywork,
        doors,
        motor,
        potency,
        range,
        battery_capacity,
        charging_time,
        top_speed,
        brakes,
        suspension,
        image,
        price,
        description,
      });
    } catch (error) {
      const { data } = error.response;
      Object.values(data).forEach((errorMessages) => {
        errorMessages.forEach((errorMessage) => {
          toast.error(errorMessage, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
      });
    }
  };

  const resetFormik = () => {
    setErrorShown(true);
    formik.setValues({
      ...formik.values,
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
      image: '',
      price: '',
      description: '',
      idCar: '', // restablecer a ''
      quantity: '',
    });
    setIdCarSelectedValue(''); // Set the state value to ""
    setPreviewImage('');
  };

  const getAllVehicles = async () => {
    try {
      const { data } = await getCarsBySucursal(idSucursal);
      setVehicles(data);
    } catch (error) {
      const { data } = error.response;
      Object.values(data).forEach((errorMessages) => {
        errorMessages.forEach((errorMessage) => {
          toast.error(errorMessage, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
      });
    }
  };

  useEffect(() => {
    getAllVehicles();
  }, []);

  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);

  const handleColorChange = (color) => {
    setSelectedColor(color.hex.toUpperCase());
  };

  useEffect(() => {
    formik.setFieldValue('color', selectedColor);
  }, [selectedColor]);

  const createNewVehicleInSucursal = async (values, carId) => {
    try {
      const body = {
        sucursal: values.sucursal,
        vehicle: carId,
        color: values.color,
        quantity: values.quantity,
      };

      const { data } = await newCarInSucursal(body);
      toast.success('Vehiculo añadido a la empresa y la sucursal', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      const { data } = error.response;
      Object.values(data).forEach((errorMessages) => {
        errorMessages.forEach((errorMessage) => {
          toast.error(errorMessage, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
      });
    }
  };

  const addNewVehicle = async (values) => {
    try {
      const { data } = await newCar(values);
      return data.id; // Devolver el ID del carro añadido
    } catch (error) {
      const { data } = error.response;
      Object.values(data).forEach((errorMessages) => {
        errorMessages.forEach((errorMessage) => {
          toast.error(errorMessage, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
      });
    }
  };

  const addVehicleInSucursal = async (values, carId) => {
    try {
      const body = {
        sucursal: parseInt(values.sucursal),
        vehicle: parseInt(carId),
        color: values.color,
        quantity: values.quantity,
      };

      await newCarInSucursal(body);
      toast.success('Se agrego la cantidad dada del vehiculo a la sucursal', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      const { data } = error.response;
      Object.values(data).forEach((errorMessages) => {
        errorMessages.forEach((errorMessage) => {
          toast.error(errorMessage, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
      });
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
      suspension: '',
      image: '',
      price: '',
      description: '',
      color: selectedColor,
      sucursal: idSucursal,
      quantity: '',
    },
    // validationSchema: createVehicleValidation,
    onSubmit: async (values) => {
      if (
        !values.model ||
        !values.year ||
        !values.brand ||
        !values.bodywork ||
        !values.doors ||
        !values.motor ||
        !values.potency ||
        !values.range ||
        !values.battery_capacity ||
        !values.charging_time ||
        !values.top_speed ||
        !values.brakes ||
        !values.suspension ||
        !values.image ||
        !values.price ||
        !values.description ||
        !values.color ||
        !values.quantity
      ) {
        toast.error(
          'Por favor, complete todos los campos antes de proceder con la cotización',
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
        return;
      }

      const file = values.image; // Obtener el archivo del formulario, ajusta esto según tu código
      const maxSize = 10485760; // Tamaño máximo permitido en bytes

      console.log(file);
      console.log(file.size);
      if (file && file.size > maxSize) {
        toast.error('El tamaño del archivo es demasiado grande.', {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }

      const regex = /^\d+$/;
      if (!regex.test(values.year)) {
        toast.error('Por favor, ingrese un año valido', {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      if (!regex.test(values.doors)) {
        toast.error('Por favor, ingrese un numero de puertas valido', {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      if (!regex.test(values.potency)) {
        toast.error('Por favor, ingrese un numero de potencia valido', {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      if (!regex.test(values.range)) {
        toast.error('Por favor, ingrese un numero rango valido', {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      if (!regex.test(values.battery_capacity)) {
        toast.error(
          'Por favor, ingrese un numero de capacidad de bateria valido',
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
        return;
      }
      if (!regex.test(values.charging_time)) {
        toast.error('Por favor, ingrese un numero de tiempo de carga valido', {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      if (!regex.test(values.top_speed)) {
        toast.error('Por favor, ingrese un numero de velocidad maxima valido', {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      if (!regex.test(values.price)) {
        toast.error('Por favor, ingrese un precio valido', {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      if (!regex.test(values.quantity)) {
        toast.error('Por favor, ingrese una cantidad valida', {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }

      console.log('paso');

      if (
        idCarSelectedValue === '' ||
        idCarSelectedValue === null ||
        isNaN(idCarSelectedValue)
      ) {
        console.log('nuevo');
        const carId = await addNewVehicle(values); // Añadir el carro y obtener su ID
        // const carId = 1;
        if (carId) {
          await createNewVehicleInSucursal(values, carId); // Crear el vehículo en la sucursal con el ID del carro
          resetFormik();
          // await getAllVehicles();
        }
      } else {
        console.log('existente');
        await addVehicleInSucursal(values, idCarSelectedValue);
        resetFormik();
      }
      await getAllVehicles();
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

  const handleSelectedVehicle = async (e) => {
    resetFormik();
    const selectedCarId = e.target.value;
    setIdCarSelectedValue(selectedCarId);
    if (selectedCarId) {
      await getCarData(selectedCarId);
    }
  };

  return (
    <div className="bg-secondary-100 p-8 rounded-xl mb-4">
      <div>
        <h1 className=" text-2xl font-bold">
          Elige un vehiculo existente si desea aumentar su cantidad
        </h1>
        <div className="mt-5">
          <div style={{ backgroundColor: 'transparent' }} className="">
            {/* <h2 className=" text-xl mb-4 font-bold">Seleccione</h2> */}
            <FormGroup>
              <Input
                type="select"
                name="idCarSelected"
                onChange={handleSelectedVehicle} // Usar solo onChange
                className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900 appearance-none"
                value={idCarSelectedValue}
              >
                <option value="">Seleccione uno</option>
                {vehicles.map((car) => (
                  <option value={car.vehicle.id} key={car.vehicle.id}>
                    {car.vehicle.model} - {car.vehicle.year}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <button
                className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900 appearance-none"
                onClick={resetFormik}
              >
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
        encType="multipart/form-data"
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
                disabled={!!idCarSelectedValue}
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
                disabled={!!idCarSelectedValue}
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
                disabled={!!idCarSelectedValue}
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
                disabled={!!idCarSelectedValue}
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
                disabled={!!idCarSelectedValue}
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
                disabled={!!idCarSelectedValue}
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
                placeholder="Potencia (kW)"
                name="potency"
                value={values.potency}
                onChange={handleChange}
                disabled={!!idCarSelectedValue}
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
                placeholder="Rango (km)"
                name="range"
                value={values.range}
                onChange={handleChange}
                disabled={!!idCarSelectedValue}
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
                placeholder="Capacidad de bateria (kWh)"
                name="battery_capacity"
                value={values.battery_capacity}
                disabled={!!idCarSelectedValue}
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
                placeholder="Tiempo de carga (hrs)"
                name="charging_time"
                value={values.charging_time}
                disabled={!!idCarSelectedValue}
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
                placeholder="Velocidad Máxima (km/h)"
                name="top_speed"
                value={values.top_speed}
                onChange={handleChange}
                disabled={!!idCarSelectedValue}
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
                disabled={!!idCarSelectedValue}
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
                disabled={!!idCarSelectedValue}
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
                disabled={!!idCarSelectedValue}
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
                  disabled={!!idCarSelectedValue}
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
            {formik.values.image ? (
              <div className="">
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
                          src={previewImage || formik.values.image}
                          className="w-28 h-28 object-cover rounded-lg"
                          alt="Imagen subida"
                        />
                        <label
                          htmlFor="image"
                          className="absolute bg-secondary-100 p-2 rounded-full hover:cursor-pointer -top-2 left-24"
                        >
                          <RiEdit2Line />
                        </label>
                        <input
                          type="file"
                          id="image"
                          className="hidden"
                          // disabled={!!idCarSelectedValue}
                          onChange={(event) => {
                            const file = event.currentTarget.files[0];
                            formik.setFieldValue('image', file);

                            const reader = new FileReader();
                            reader.onload = (e) => {
                              setPreviewImage(e.target.result);
                            };
                            reader.readAsDataURL(file);
                          }}
                        />
                      </div>
                      <p className="text-gray-500 text-sm">
                        Tipos de img permitidos: png, jpg, jpeg.
                      </p>
                    </div>
                    {touched.image &&
                      errors.image &&
                      showErrorToast(errors.image)}
                  </FormGroup>
                </div>
              </div>
            ) : (
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
                        src={
                          previewImage
                            ? previewImage
                            : 'https://img.freepik.com/fotos-premium/icono-archivo-imagen-ilustracion-procesamiento-3d_567294-3412.jpg?w=826'
                        }
                        className="w-28 h-28 object-cover rounded-lg"
                        alt="Imagen subida"
                      />

                      <label
                        htmlFor="image"
                        className="absolute bg-secondary-100 p-2 rounded-full hover:cursor-pointer -top-2 left-24"
                      >
                        <RiEdit2Line />
                      </label>
                      <input
                        type="file"
                        id="image"
                        className="hidden"
                        // disabled={!!idCarSelectedValue}
                        onChange={(event) => {
                          const file = event.currentTarget.files[0];
                          formik.setFieldValue('image', file);

                          const reader = new FileReader();
                          reader.onload = (e) => {
                            setPreviewImage(e.target.result);
                          };
                          reader.readAsDataURL(file);
                        }}
                      />
                    </div>
                    <p className="text-gray-500 text-sm">
                      Tipos de img permitidos: png, jpg, jpeg.
                    </p>
                  </div>
                  {touched.image &&
                    errors.image &&
                    showErrorToast(errors.image)}
                </FormGroup>
              </div>
            )}
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

        <div className="mb-10 mt-3">
          <FormGroup>
            <div>
              <p>
                Cantidad <span className="text-red-500">*</span>
              </p>
            </div>
            <Input
              type="number"
              className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
              placeholder="Numero de stock a agregar"
              name="quantity"
              value={values.quantity}
              onChange={handleChange}
              invalid={touched.quantity && !!errors.quantity}
            />
            {touched.quantity &&
              errors.quantity &&
              showErrorToast(errors.quantity)}
          </FormGroup>
        </div>

        <hr className="my-8 border-gray-500/30" />
        <div className="flex justify-between">
          <div className="flex justify-start">
            <Link
              className="bg-primary/80 text-black py-2 px-4 rounded-lg hover:bg-primary transition-colors"
              to={urls.seeCarsD}
            >
              <i className="ri-arrow-left-line"></i> Volver
            </Link>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-primary/80 text-black py-2 px-4 rounded-lg hover:bg-primary transition-colors"
              onClick={resetErrorShown}
            >
              Guardar
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default NewVehicle;
