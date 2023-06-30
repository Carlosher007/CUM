import { useFormik } from 'formik';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getSucursals } from '../../assets/api/sucursal.api';
import { newUser } from '../../assets/api/user.api';
import { urls } from '../../assets/urls/urls';
import { createProfileValidation } from '../../assets/validation/CreateProfileValidation';

const NewUser = () => {
  const submitUser = async (values) => {
    try {
      await newUser(values);
      formik.resetForm();
      toast.success('Usuario creado correctamente', {
        position: toast.POSITION.TOP_RIGHT,
      });
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
      id: '',
      email: '',
      rol: '',
      cellphone: '',
      full_name: '',
      address: '',
      sucursal: '',
    },
    // validationSchema: createProfileValidation,
    onSubmit: (values) => {
      values.sucursal = selectedSucursal; // Asignar el valor seleccionado al campo "sucursal"
      values.sucursal = parseInt(selectedSucursal);
      if (
        !values.id ||
        !values.email ||
        !values.rol ||
        !values.cellphone ||
        !values.full_name ||
        !values.address ||
        !values.sucursal
      ) {
        toast.error(
          'Por favor, complete todos los campos antes de proceder con la cotización',
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
        return;
      } else {
        const ccRegex = /^\d+$/;

        if (!ccRegex.test(values.id)) {
          toast.error(
            'Por favor, ingrese un número válido para el campo de Cedula',
            {
              position: toast.POSITION.TOP_RIGHT,
            }
          );
          return;
        }

        // Verificar cellphone como número
        const phoneRegex = /^\d+$/;
        if (!phoneRegex.test(values.cellphone)) {
          toast.error(
            'Por favor, ingrese un número válido para el campo de Teléfono',
            {
              position: toast.POSITION.TOP_RIGHT,
            }
          );
          return;
        }

        // Verificar email con formato válido
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(values.email)) {
          toast.error('Por favor, ingrese un correo electrónico válido', {
            position: toast.POSITION.TOP_RIGHT,
          });
          return;
        }

        submitUser(values);
      }
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
  const [selectedSucursal, setSelectedSucursal] = useState('');

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
      try {
        const { data } = await getSucursals();
        setSucursals(data);
      } catch (error) {
        if (error.response) {
          const { data } = error.response;
          toast.error(data.error, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    };
    getSucursalsData();
  }, []);

  return (
    <div className="bg-secondary-100 p-8 rounded-xl mb-8">
      <h1 className="text-xl text-gray-100">Nuevo Usuario</h1>
      <hr className="my-8 border-gray-500/30" />
      <form>
        {/* CC */}
        <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
          <div className="w-full md:w-1/4">
            <p>Cedula</p>
          </div>
          <div className="flex-1">
            <input
              type="text"
              className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
              placeholder="Cedula"
              name="id"
              value={values.id}
              onChange={handleChange}
              maxLength={10}
            />
            {touched.id && errors.id && showErrorToast(errors.id)}
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
            <p>Email</p>
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
            <p>Rol</p>
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
            <p>Sucursal</p>
          </div>
          <div className="flex-1">
            <select
              className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
              name="sucursal"
              value={selectedSucursal}
              onChange={(event) => {
                setSelectedSucursal(event.target.value);
                handleChange(event);
              }}
            >
              <option value="">Seleccione una sucursal</option>
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
              placeholder="Celular"
              name="cellphone"
              value={values.cellphone}
              maxLength={10}
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
            }}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewUser;
