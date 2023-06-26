import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { CirclePicker } from 'react-color';
import { RiEdit2Line } from 'react-icons/ri';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, FormGroup, FormText, Input } from 'reactstrap';
import Cookies from 'universal-cookie';
import {
  getCar,
  newCar,
  newCarInSucursal,
  updateCar,
} from '../../assets/api/cars';
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
import { editVehicleValidation } from '../../assets/validation/editVehicleValidation';

const EditVehicle = () => {
  const { idVehicle } = useParams();

  const [carData, setCarData] = useState({});
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    const getVehicleData = async () => {
      try {
        const { data } = await getCar(idVehicle);
        setCarData(data);
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
          id,
        } = data;
        formik.setValues({
          ...formik.values,
          id,
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
        setPreviewImage(data.image);
      } catch (error) {
        if (error.response) {
          const { data } = error.response;
          toast.error(data.error, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    };
    getVehicleData();
  }, []);

  const updateSelectedCar = async (values, id) => {
    try {
      const body = values;
      if (typeof body.image === 'string') {
        delete body.image;
      }
      const { data } = await updateCar(body, id);
      toast.success('Vehiculo actualizado', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        toast.error(data.error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      id: '',
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
    },
    validationSchema: editVehicleValidation,
    onSubmit: async (values) => {
      updateSelectedCar(values, values.id);
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
      <h1 className=" text-2xl font-bold mb-10">
        Editando el vehiculo:{' '}
        <span className="text-primary">
          {carData.model} - {carData.year}{' '}
        </span>
      </h1>
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
            {formik.values.image ? (
              <div className="max-w-lg mx-auto">
                <FormGroup>
                  <div className="flex-1">
                    <div className="relative mt-2">
                      <img
                        src={
                          previewImage
                            ? previewImage
                            : 'https://img.freepik.com/fotos-premium/icono-archivo-imagen-ilustracion-procesamiento-3d_567294-3412.jpg?w=826'
                        }
                        className="w-full h-full object-cover rounded-lg"
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
            ) : (
              <div></div>
            )}
          </div>
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

export default EditVehicle;
