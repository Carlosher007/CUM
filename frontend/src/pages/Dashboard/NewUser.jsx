import { useFormik } from 'formik';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getSucursals } from '../../assets/api/sucursal.api';
import { createProfileValidation } from '../../assets/validation/CreateProfileValidation';

const NewUser = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      rol: '',
      cellphone: '',
      sucursal: '',
      full_name: '',
      address: '',
    },
    validationSchema: createProfileValidation,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const { handleSubmit, handleChange, values, touched, errors } = formik;

  const [errorShown, setErrorShown] = useState(false);
  const [rols, setRols] = useState([
    'Gerente',
    'Vendedor',
    'Cliente',
    'JefeTaller',
  ]);
  const [sucursals, setSucursals] = useState([]);

  const showErrorToast = (message) => {
    if (!errorShown) {
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setErrorShown(true);
    }
  };


  useEffect(() => {
    const getSucursalsData = async () => {
      const { data } = await getSucursals();
      setSucursals(data);
    };
    getSucursalsData();
  }, []);

  return (
    <div className="bg-secondary-100 p-8 rounded-xl mb-8">
      <h1 className="text-xl text-gray-100">Nuevo Usuario</h1>
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
              placeholder="Email"
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
            <p>
              Rol <span className="text-red-500">*</span>
            </p>
          </div>
          <div className="flex-1">
            <select
              className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
              name="rol"
              value={values.rol}
              onChange={handleChange}
            >
              <option value="">Seleccione un rol</option>
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
            <p>
              Sucursal <span className="text-red-500">*</span>
            </p>
          </div>
          <div className="flex-1">
            <select
              className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
              name="sucursal"
              value={values.sucursal}
              onChange={handleChange}
            >
              <option value="">Seleccione una sucursal</option>
              {sucursals.map((office) => (
                <option value={office.city} key={office.id}>
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
      </form>
      <hr className="my-8 border-gray-500/30" />
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
    </div>
  );
};

export default NewUser;
