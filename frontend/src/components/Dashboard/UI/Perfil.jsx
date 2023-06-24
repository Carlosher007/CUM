import { useFormik } from 'formik';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getSucursals } from '../../../assets/api/sucursal.api';
import { updateMyProfile } from '../../../assets/api/user.api';
import { urls } from '../../../assets/urls/urls';
import { editProfileValidation } from '../../../assets/validation/EditProfileValidation';

const Perfil = ({ user }) => {
  const [sucursals, setSucursals] = useState([]);

  const updateProfile = async (values) => {
    try {
      const { data } = await updateMyProfile(user.id, values);
      toast.success('Usuario editado con exito', {
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
      full_name: '',
      cellphone: '',
      address: '',
      email: '',
      rol: '',
      sucursal: '',
    },
    validationSchema: editProfileValidation,
    onSubmit: (values) => {
      const selectedValue = parseInt(values.sucursal);
      values.sucursal = isNaN(selectedValue) ? null : selectedValue;
      // console.log(values);
      updateProfile(values);
    },
  });

  const { handleSubmit, handleChange, values, touched, errors } = formik;

  const [rols, setRols] = useState([
    'Gerente',
    'Vendedor',
    'Cliente',
    'JefeTaller',
  ]);

  useEffect(() => {
    if (user) {
      const initialValues = {
        full_name: user.full_name || '',
        cellphone: user.cellphone || '',
        address: user.address || '',
        email: user.email || '',
        rol: user.rol || '',
        sucursal: user.sucursal || '',
      };
      formik.setValues(initialValues);
    }
  }, [user]);

  useEffect(() => {
    const getSucursalsData = async () => {
      try {
        const { data } = await getSucursals();
        setSucursals(data);
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
    getSucursalsData();
  }, []);

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
      <h1 className="text-xl text-gray-100">Editando Usuario</h1>
      <hr className="my-8 border-gray-500/30" />
      <form>
        {/* ID */}
        <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
          <div className="w-full md:w-1/4">
            <p>ID</p>
          </div>
          <div className="flex-1">
            <input
              type="text"
              className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
              name="id"
              placeholder={user.id}
              readOnly={true}
            />
          </div>
        </div>
        {/* FULL NAME */}
        <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
          <div className="w-full md:w-1/4">
            <p>Nombre Completo</p>
          </div>
          <div className="flex-1">
            <input
              type="text"
              className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
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
            <p>Email</p>
          </div>
          <div className="flex-1">
            <input
              type="text"
              className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
            {touched.email && errors.email && showErrorToast(errors.email)}
          </div>
        </div>
        {/* ROL */}
        <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
          <div className="w-full md:w-1/4">
            <p>Rol</p>
          </div>
          <div className="flex-1">
            <select
              className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
              name="rol"
              value={values.rol}
              onChange={handleChange}
            >
              {rols.map((rol) => (
                <option value={rol} key={rol}>
                  {rol}
                </option>
              ))}
            </select>
            {touched.rol && errors.rol && showErrorToast(errors.rol)}
          </div>
        </div>{' '}
        {/* SUCURSAL */}
        <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
          <div className="w-full md:w-1/4">
            <p>Sucursal</p>
          </div>
          <div className="flex-1">
            <select
              className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
              name="sucursal"
              value={values.sucursal}
              onChange={handleChange}
            >
              {sucursals.map((office) => (
                <option value={office.id} key={office.id}>
                  {office.city}
                </option>
              ))}
            </select>
            {touched.sucursal &&
              errors.sucursal &&
              showErrorToast(errors.sucursal)}
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
            <p>Super Usuario</p>
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
            <p>Fecha en la que se unio</p>
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
      <div className="flex justify-between">
        <div className="flex justify-start">
          <Link
            className="bg-primary/80 text-black py-2 px-4 rounded-lg hover:bg-primary transition-colors"
            to={urls.allUsers}
          >
            <i className="ri-arrow-left-line"></i> Volver
          </Link>
        </div>
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
    </div>
  );
};

export default Perfil;
