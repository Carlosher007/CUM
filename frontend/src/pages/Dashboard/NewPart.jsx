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
  getPart,
  getParts,
  getPartsInSucursal,
  newPart,
  newPartInSucursal,
} from '../../assets/api/parts';

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
import { createPartValidation } from '../../assets/validation/createPartValidation';
import { createVehicleValidation } from '../../assets/validation/createVehicleValidation';
import VehiclesWithPartTable from '../../components/Dashboard/UI/VehiclesWithPartTable';

const NewVehicle = () => {
  const cookies = new Cookies();
  const idSucursal = cookies.get('sucursal');
  const token = cookies.get('token');

  const [vehicles, setVehicles] = useState([]);
  const [parts, setParts] = useState([]);
  const [idPartSelectedValue, setIdPartSelectedValue] = useState('');
  const [part, setPart] = useState({});
  const [vehiclesWithPart, setVehiclesWithPart] = useState({});

  const getPartData = async (id) => {
    try {
      const { data } = await getPart(id);
      setPart(data);
      const { name, price } = data;
      if (data.vehicle === null) {
        formik.setValues({
          ...formik.values,
          name,
          price,
          vehicle: '',
        });
      } else {
        formik.setValues({
          ...formik.values,
          name,
          price,
          vehicle: data.vehicle,
        });
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        const { data } = error.response;
        console.log(data);
        if (Array.isArray(data)) {
          data.forEach((errorMessage) => {
            toast.error(errorMessage, {
              position: toast.POSITION.TOP_RIGHT,
            });
          });
        } else {
          if (data.error) {
            toast.error(data.error, {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        }
      }
    }
  };

  const resetFormik = () => {
    setErrorShown(true);
    formik.setValues({
      ...formik.values,
      name: '',
      price: '',
      vehicle: '',
      quantity: '',
    });
    setIdPartSelectedValue(''); // Set the state value to ""
  };

  const getAllVehicles = async () => {
    try {
      const { data } = await getCarsBySucursal(idSucursal);
      setVehicles(data);
    } catch (error) {
      const { data } = error.response;
      if (Array.isArray(data)) {
        data.forEach((errorMessage) => {
          toast.error(errorMessage, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
      } else {
        if (data.error) {
          toast.error(data.error, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    }
  };

  const getAllParts = async () => {
    try {
      const { data } = await getPartsInSucursal(idSucursal);
      setParts(data);
      //  }
    } catch (error) {
      const { data } = error.response;
      if (Array.isArray(data)) {
        data.forEach((errorMessage) => {
          toast.error(errorMessage, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
      } else {
        if (data.error) {
          toast.error(data.error, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    }
  };

  useEffect(() => {
    getAllVehicles();
    getAllParts();
  }, []);

  const createNewPartInSucursal = async (values, partId) => {
    try {
      const body = {
        sucursal: parseInt(values.sucursal),
        quantity: parseInt(values.quantity),
        part: partId,
      };

      await newPartInSucursal(body);
      toast.success('Repuesto añadido a la sucursal', {
        position: toast.POSITION.TOP_RIGHT,
      });
      await getAllParts();
    } catch (error) {
      const { data } = error.response;
      if (Array.isArray(data)) {
        data.forEach((errorMessage) => {
          toast.error(errorMessage, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
      } else {
        if (data.error) {
          toast.error(data.error, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    }
  };

  const addNewPart = async (values) => {
    try {
      const { data } = await newPart(values);
      return data.id; // Devolver el ID del carro añadido
    } catch (error) {
      const { data } = error.response;
      if (Array.isArray(data)) {
        data.forEach((errorMessage) => {
          toast.error(errorMessage, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
      } else {
        if (data.error) {
          toast.error(data.error, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    }
  };

  const addPartInSucursal = async (values, partId) => {
    try {
      const body = {
        sucursal: parseInt(values.sucursal),
        part: parseInt(partId),
        quantity: values.quantity,
      };

      const { data } = await newPartInSucursal(body);
      toast.success('Se agrego la cantidad dada del repuesto a la sucursal', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      const { data } = error.response;
      if (Array.isArray(data)) {
        data.forEach((errorMessage) => {
          toast.error(errorMessage, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
      } else {
        if (data.error) {
          toast.error(data.error, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    }
  };

  //   const getGeneralPart = async (idPart) => {
  //     try {
  //       const { data } = await getPartsInSucursal(idSucursal);
  //       let id = null;
  //
  //       data.map((item) => {
  //         if (item.part.id === parseInt(idPart)) {
  //           id = item.id;
  //         }
  //       });
  //
  //       return id;
  //     } catch (error) {
  //       const { data } = error.response;
  //       if (Array.isArray(data)) {
  //         data.forEach((errorMessage) => {
  //           toast.error(errorMessage, {
  //             position: toast.POSITION.TOP_RIGHT,
  //           });
  //         });
  //       } else {
  //         if (data.error) {
  //           toast.error(data.error, {
  //             position: toast.POSITION.TOP_RIGHT,
  //           });
  //         }
  //       }
  //     }
  //   };

  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      vehicle: '',
      sucursal: idSucursal,
      quantity: '',
    },
    validationSchema: createPartValidation,
    onSubmit: async (values) => {
      if (
        idPartSelectedValue === '' ||
        idPartSelectedValue === null ||
        isNaN(idPartSelectedValue)
      ) {
        const partId = await addNewPart(values); // Añadir el carro y obtener su ID
        // const partId = 1;
        if (partId) {
          await createNewPartInSucursal(values, partId); // Crear el vehículo en la sucursal con el ID del carro
          resetFormik();
          // await getAllVehicles();
        }
      } else {
        // const id = await getGeneralPart(idPartSelectedValue);
        await addPartInSucursal(values, idPartSelectedValue);
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

  const handleSelectedPart = async (e) => {
    resetFormik();
    const selectedPartId = e.target.value;
    setIdPartSelectedValue(selectedPartId);
    if (selectedPartId) {
      await getPartData(selectedPartId);
    }
  };

  return (
    <div className="bg-secondary-100 p-8 rounded-xl mb-4">
      <div>
        <h1 className=" text-2xl font-bold">
          Elige un repuesto existente si desea aumentar su cantidad
        </h1>
        <div className="mt-5">
          <div style={{ backgroundColor: 'transparent' }} className="">
            {/* <h2 className=" text-xl mb-4 font-bold">Seleccione</h2> */}
            <FormGroup>
              <Input
                type="select"
                name="idPartSelected"
                onChange={handleSelectedPart} // Usar solo onChange
                className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900 appearance-none"
                value={idPartSelectedValue}
              >
                <option value="">Seleccione uno</option>
                {parts.map((part) => (
                  <option value={part.part.id} key={part.part.id}>
                    {part.part.name} :{' '}
                    {part.part.vehicle === null ? (
                      'Generico'
                    ) : (
                      <>
                        {part.part.vehicle.model} {part.part.vehicle.year}
                      </>
                    )}
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
        <h2 className=" text-xl mb-4 font-bold">Datos del Repuesto</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <FormGroup>
              <div>
                <p>
                  Nombre <span className="text-red-500">*</span>
                </p>
              </div>
              <Input
                className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                type="text"
                placeholder="Nombre"
                name="name"
                value={values.name}
                onChange={handleChange}
                invalid={touched.name && !!errors.name}
                disabled={!!idPartSelectedValue}
              />
              {touched.name && errors.name && showErrorToast(errors.name)}
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
                disabled={!!idPartSelectedValue}
              />
              {touched.price && errors.price && showErrorToast(errors.price)}
            </FormGroup>
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

        <div className="mb-10 mt-3">
          <h2 className=" text-xl mb-4 font-bold">
            Vehiculo a agregar el repuesto
          </h2>
          <div>
            <FormGroup>
              <Input
                type="select"
                name="vehicle"
                value={values.vehicle}
                className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900 appearance-none"
                onChange={handleChange}
                disabled={!!idPartSelectedValue}
                invalid={touched.vehicle && !!errors.vehicle}
              >
                <option value="0">Generico</option>
                {vehicles.map((car) => (
                  <option value={car.vehicle.id} key={car.vehicle.id}>
                    {car.vehicle.model} - {car.vehicle.year}
                  </option>
                ))}
              </Input>
              {touched.vehicle &&
                errors.vehicle &&
                showErrorToast(errors.vehicle)}
            </FormGroup>
          </div>
        </div>

        <hr className="my-8 border-gray-500/30" />
        <div className="flex justify-between">
          <div className="flex justify-start">
            <Link
              className="bg-primary/80 text-black py-2 px-4 rounded-lg hover:bg-primary transition-colors"
              to={urls.seeParts}
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
