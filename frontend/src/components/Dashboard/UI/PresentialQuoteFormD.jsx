import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, FormGroup, FormText, Input } from 'reactstrap';
import { getSucursals } from '../../../assets/api/sucursal.api';
import { presentialQuoteExtendValidation } from '../../../assets/validation/PresentialQuoteExtendValidation';
import '../../../styles/find-car-form.css';

const PresentialQuoteForm = () => {
  const [sucursals, setSucursals] = useState([]);

  useEffect(() => {
    const getSucursalsData = async () => {
      try {
        const { data } = await getSucursals();
        setSucursals(data);
        console.log(data);
      } catch (error) {
        if (error.response) {
          const { data } = error.response;
          console.log(data);
        }
      }
    };
    getSucursalsData();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      date: '',
      time: '',
      city: '',
      cc: '',
      phone: '',
      email: '',
      address: '',
      password: '',
    },
    validationSchema: presentialQuoteExtendValidation,
    onSubmit: (values) => {
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
    <Form
      style={{ backgroundColor: 'transparent' }}
      className="form"
      onSubmit={handleSubmit}
    >
      <div>
        <h6 className="font-bold mb-2">Información Personal</h6>
        <div className="align-items-around justify-content-around flex-wrap flex flex-row">
          <FormGroup className="basis-1/4 mr-3">
            <FormText>Nombre</FormText>
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
          <FormGroup className="basis-1/4 mr-3">
            <FormText>Telefono</FormText>
            <Input
              type="text"
              className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
              placeholder="Telefono"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              invalid={touched.phone && !!errors.phone}
            />
            {touched.phone && errors.phone && showErrorToast(errors.phone)}
          </FormGroup>
          <FormGroup className="basis-1/4 mr-3">
            <FormText>Dirección</FormText>
            <Input
              type="text"
              placeholder="Direccion"
              className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
              name="address"
              value={values.address}
              onChange={handleChange}
              invalid={touched.address && !!errors.address}
            />
            {touched.address &&
              errors.address &&
              showErrorToast(errors.address)}
          </FormGroup>
          <FormGroup className="basis-1/4 mr-3">
            <FormText>Cedula</FormText>
            <Input
              type="text"
              placeholder="Cedula"
              className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
              name="cc"
              value={values.cc}
              onChange={handleChange}
              invalid={touched.cc && !!errors.cc}
            />
            {touched.cc && errors.cc && showErrorToast(errors.cc)}
          </FormGroup>
        </div>
        <h6 className="mt-4 font-bold ">Acceso a la Plataforma</h6>
        <div className="d-flex align-items-center  flex-wrap flex flex-row">
          <FormGroup className="basis-1/4 mr-3">
            <FormText>Email</FormText>
            <Input
              type="text"
              placeholder="Email"
              className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
              name="email"
              value={values.email}
              onChange={handleChange}
              invalid={touched.email && !!errors.email}
            />
            {touched.email && errors.email && showErrorToast(errors.email)}
          </FormGroup>
          <FormGroup className="basis-1/4 mr-3">
            <FormText>Contraseña</FormText>
            <Input
              type="password"
              placeholder="Contraseña"
              className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
              name="password"
              value={values.password}
              onChange={handleChange}
              invalid={touched.password && !!errors.password}
            />
            {touched.password &&
              errors.password &&
              showErrorToast(errors.password)}
          </FormGroup>
        </div>
        <h6 className="mt-4 font-bold ">Fecha, Hora y Lugar</h6>
        <div className="d-flex align-items-center justify-content-between flex-wrap flex flex-row">
          <FormGroup className="basis-1/4 mr-3">
            <FormText>Fecha</FormText>
            <Input
              type="date"
              placeholder="Journey date"
              className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900 appearance-none"
              name="date"
              value={values.date}
              onChange={handleChange}
              invalid={touched.date && !!errors.date}
            />
            {touched.date && errors.date && showErrorToast(errors.date)}
          </FormGroup>
          <FormGroup className="basis-1/4 mr-3">
            <FormText>Hora</FormText>
            <Input
              type="time"
              placeholder="Journey time"
              name="time"
              className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900 appearance-none"
              value={values.time}
              onChange={handleChange}
              invalid={touched.time && !!errors.time}
            />
            {touched.time && errors.time && showErrorToast(errors.time)}
          </FormGroup>
          <FormGroup className="select__group">
            <FormText>Sucursal</FormText>
            <Input
              type="select"
              name="city"
              value={values.city}
              className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900 appearance-none"
              onChange={handleChange}
              invalid={touched.city && !!errors.city}
            >
              <option value="">Seleccione una ciudad</option>
              {sucursals.map((office) => (
                <option value={office.city} key={office.id}>
                  {office.city}
                </option>
              ))}
            </Input>
            {touched.city && errors.city && showErrorToast(errors.city)}
          </FormGroup>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-center flex-wrap mt-4">
        <FormGroup className="w-1/2 mr-3">
          <button
            className="btn find__car-btn"
            type="submit"
            onClick={resetErrorShown}
          >
            Enviar
          </button>
        </FormGroup>
      </div>
    </Form>
  );
};

export default PresentialQuoteForm;
