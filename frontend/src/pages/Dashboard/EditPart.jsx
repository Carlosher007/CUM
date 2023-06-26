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
import { getPart, partialUpdatePart } from '../../assets/api/parts';
import { getCarsBySucursal } from '../../assets/api/sucursal.api';
import {
  codeToColorName,
  colorNameToCode,
  colorOptions,
} from '../../assets/color/colorUtils';
import { urls } from '../../assets/urls/urls';
import VehiclesWithPartTable from '../../components/Dashboard/UI/VehiclesWithPartTable';

const EditPart = () => {
  const { idPart } = useParams();

  const [partData, setPartData] = useState({});
  const [vehiclesWithPart, setVehiclesWithPart] = useState({});

  useEffect(() => {
    const getPartData = async () => {
      try {
        const { data } = await getPart(idPart);
        setPartData(data);
        const { name, price } = data;
        formik.setValues({
          ...formik.values,
          name,
          price,
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
    getPartData();
  }, []);

  const updateSelectedPart = async (values, id) => {
    try {
      await partialUpdatePart(id, values);
      toast.success('Repuesto actualizado', {
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
      name: '',
      price: '',
    },
    // validationSchema: editVehicleValidation,
    onSubmit: async (values) => {
      updateSelectedPart(values, idPart);
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
        Editando el repuesto:{' '}
        <span className="text-primary">{partData.name}</span>
      </h1>
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
              />
              {touched.price && errors.price && showErrorToast(errors.price)}
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

export default EditPart;
