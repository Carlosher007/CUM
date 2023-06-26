import { useFormik } from 'formik';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import { updateSucursal } from '../../../assets/api/sucursal.api';
import { profileValidation } from '../../../assets/validation/ProfileValidation';

const MiSucursal = ({ sucursal }) => {
  const cookies = new Cookies();
  const rolUser = cookies.get('rol');

  const updateSucursalData = async () => {
    try {
      const { data } = await updateSucursal(sucursal.id, values);
    } catch (error) {
      if (error.response) {
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
    }
  };

  const formik = useFormik({
    initialValues: {
      city: sucursal.city,
      address: sucursal.address,
      cellphone: sucursal.cellphone,
    },
    // validationSchema: profileValidation,
    onSubmit: (values) => {
      updateSucursalData();
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
    <div className="bg-secondary-100 p-8 rounded-xl mb-8">
      <h1 className="text-xl text-gray-100">Mi Sucursal</h1>
      <hr className="my-8 border-gray-500/30" />
      <form>
        {/* City */}
        <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
          <div className="w-full md:w-1/4">
            <p>
              Ciudad <span className="text-red-500">*</span>
            </p>
          </div>
          <div className="flex-1">
            <input
              type="text"
              className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
              value={values.city}
              readOnly={true}
            />
          </div>
        </div>
        {/* Address */}
        <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
          <div className="w-full md:w-1/4">
            <p>Direccion</p>
          </div>
          <div className="flex-1">
            <input
              type="text"
              className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
              name="address"
              value={values.address}
              onChange={handleChange}
            />
            {touched.address &&
              errors.address &&
              showErrorToast(errors.address)}
          </div>
        </div>
        {/* Cellphone */}
        <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
          <div className="w-full md:w-1/4">
            <p>Celular</p>
          </div>
          <div className="flex-1">
            <input
              type="text"
              className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
              name="cellphone"
              value={values.cellphone}
              onChange={handleChange}
            />
            {touched.cellphone &&
              errors.cellphone &&
              showErrorToast(errors.cellphone)}
          </div>
        </div>{' '}
      </form>
      <hr className="my-8 border-gray-500/30" />
      <div className="flex justify-end">
        {rolUser === 'Gerente' && (
          <button
            type="submit"
            className="bg-primary/80 text-black py-2 px-4 rounded-lg hover:bg-primary transition-colors"
            onClick={() => {
              handleSubmit(); // Primera función
              resetErrorShown(); // Segunda función
            }}
          >
            Guardar
          </button>
        )}
      </div>
    </div>
  );
};

export default MiSucursal;
