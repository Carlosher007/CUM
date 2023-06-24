import { useFormik } from 'formik';
import moment, { isDuration } from 'moment';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import { getSucursal } from '../../../assets/api/sucursal.api';
import { updateMyProfile } from '../../../assets/api/user.api.js';
import { profileValidation } from '../../../assets/validation/ProfileValidation';

const MiPerfil = ({ user }) => {
  const cookies = new Cookies();
  const idSucursal = cookies.get('sucursal');
  const [city, setCity] = useState(null);

  useEffect(() => {
    const getCitySucursal = async () => {
      try {
        const { data } = await getSucursal(idSucursal);
        setCity(data.city);
      } catch (error) {
        if (error.response) {
          const { data } = error.response;
          let errorMessage = '';

          // Construir el mensaje de error con los detalles del error
          Object.keys(data).forEach((key) => {
            errorMessage += `${key}: ${data[key][0]}\n`;
          });

          // Mostrar mensaje de error al usuario utilizando toast
          toast.error(errorMessage, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    };
    getCitySucursal();
  }, []);

  const updateProfile = async () => {
    console.log(user.id);
    try {
      const { data } = await updateMyProfile(user.id, values);
      toast.success('Usuario actualizado con exito', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        let errorMessage = '';

        // Construir el mensaje de error con los detalles del error
        Object.keys(data).forEach((key) => {
          errorMessage += `${key}: ${data[key][0]}\n`;
        });

        // Mostrar mensaje de error al usuario utilizando toast
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      full_name: user.full_name,
      cellphone: user.cellphone,
      address: user.address,
    },
    validationSchema: profileValidation,
    onSubmit: (values) => {
      updateProfile();
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
      <h1 className="text-xl text-gray-100">Perfil</h1>
      <hr className="my-8 border-gray-500/30" />
      <form>
        {/* FULL NAME */}
        <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
          <div className="w-full md:w-1/4">
            <p>Nombre Completo</p>
          </div>
          <div className="flex-1">
            <input
              type="text"
              className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
              placeholder="Nombre(s)"
              name="full_name"
              value={values.full_name}
              onChange={handleChange}
            />
            {touched.full_name &&
              errors.full_name &&
              showErrorToast(errors.full_name)}
          </div>
        </div>
        {/* EMAIL */}
        <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
          <div className="w-full md:w-1/4">
            <p>
              Email <span className="text-red-500">*</span>
            </p>
          </div>
          <div className="flex-1">
            <input
              type="text"
              className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
              placeholder={user.email}
              readOnly={true}
            />
          </div>
        </div>
        {/* ROL */}
        <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
          <div className="w-full md:w-1/4">
            <p>
              Rol <span className="text-red-500">*</span>
            </p>
          </div>
          <div className="flex-1">
            <input
              type="text"
              className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
              placeholder={user.rol}
              readOnly={true}
            />
          </div>
        </div>{' '}
        {/* SUCURSAL */}
        <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
          <div className="w-full md:w-1/4">
            <p>
              Sucursal <span className="text-red-500">*</span>
            </p>
          </div>
          <div className="flex-1">
            <input
              type="text"
              className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
              placeholder={city}
              readOnly={true}
            ></input>
          </div>
        </div>
        {/* phone */}
        <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
          <div className="w-full md:w-1/4">
            <p>Celular</p>
          </div>
          <div className="flex-1">
            <input
              type="text"
              className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
              placeholder="Celular"
              name="cellphone"
              value={values.cellphone}
              onChange={handleChange}
            />
            {touched.cellphone &&
              errors.cellphone &&
              showErrorToast(errors.cellphone)}
          </div>
        </div>
        {/* DIRECCION */}
        <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
          <div className="w-full md:w-1/4">
            <p>Direccion</p>
          </div>
          <div className="flex-1">
            <input
              type="text"
              className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
              placeholder="Dirección"
              name="address"
              value={values.address}
              onChange={handleChange}
            />
            {touched.address &&
              errors.address &&
              showErrorToast(errors.address)}
          </div>
        </div>
        {/* IS SUPERUSER */}
        <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
          <div className="w-full md:w-1/4">
            <p>
              Super Usuario <span className="text-red-500">*</span>
            </p>
          </div>
          <div className="flex-1">
            {user.is_superuser ? (
              <span className="py-1 px-2 bg-green-500/10 text-green-500 rounded-lg">
                Si
              </span>
            ) : (
              <span className="py-1 px-2 bg-red-500/10 text-red-500 rounded-lg">
                No
              </span>
            )}
          </div>
        </div>
        {/* Datwe Joined */}
        <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
          <div className="w-full md:w-1/4">
            <p>
              Fecha en la que se unio <span className="text-red-500">*</span>
            </p>
          </div>
          <div className="flex-1">
            <input
              type="text"
              className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
              placeholder={moment(user.date_joined).format('DD/MM/YYYY')}
              readOnly={true}
            />
          </div>
        </div>
      </form>
      <hr className="my-8 border-gray-500/30" />
      <div className="flex justify-end">
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
      </div>
    </div>
  );
};

export default MiPerfil;
