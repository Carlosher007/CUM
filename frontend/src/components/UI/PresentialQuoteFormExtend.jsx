import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, FormGroup, FormText, Input } from 'reactstrap';
import officesData from '../../assets/data/officesData';
import { presentialQuoteExtendValidation } from '../../assets/validation/PresentialQuoteExtendValidation';
import '../../styles/find-car-form.css';

const PresentialQuoteFormExtend = () => {
  const location = useLocation();
  const formData = location.state;

  const formik = useFormik({
    initialValues: {
      name: formData.name,
      date: formData.date,
      time: formData.time,
      city: formData.city,
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
    <Form className="form" onSubmit={handleSubmit}>
      <div>
        <h6 className="fw-bold text-black">Información Personal</h6>
        <div className="d-flex align-items-center justify-content-between flex-wrap">
          <FormGroup className="form__group">
            <FormText>Nombre</FormText>
            <Input
              type="text"
              placeholder="Nombre"
              name="name"
              value={values.name}
              onChange={handleChange}
              invalid={touched.name && !!errors.name}
            />
            {touched.name && errors.name && showErrorToast(errors.name)}
          </FormGroup>
          <FormGroup className="form__group">
            <FormText>Telefono</FormText>
            <Input
              type="text"
              placeholder="Telefono"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              invalid={touched.phone && !!errors.phone}
            />
            {touched.phone && errors.phone && showErrorToast(errors.phone)}
          </FormGroup>
          <FormGroup className="form__group">
            <FormText>Dirección</FormText>
            <Input
              type="text"
              placeholder="Direccion"
              name="address"
              value={values.address}
              onChange={handleChange}
              invalid={touched.address && !!errors.address}
            />
            {touched.address &&
              errors.address &&
              showErrorToast(errors.address)}
          </FormGroup>
          <FormGroup className="form__group">
            <FormText>Cedula</FormText>
            <Input
              type="text"
              placeholder="Cedula"
              name="cc"
              value={values.cc}
              onChange={handleChange}
              invalid={touched.cc && !!errors.cc}
            />
            {touched.cc &&
              errors.cc &&
              showErrorToast(errors.cc)}
          </FormGroup>
        </div>
        <h6 className="mt-4 fw-bold text-black">Acceso a la Plataforma</h6>
        <div className="d-flex align-items-center  flex-wrap">
          <FormGroup className="form__group me-5">
            <FormText>Email</FormText>
            <Input
              type="text"
              placeholder="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              invalid={touched.email && !!errors.email}
            />
            {touched.email && errors.email && showErrorToast(errors.email)}
          </FormGroup>
          <FormGroup className="form__group">
            <FormText>Contraseña</FormText>
            <Input
              type="password"
              placeholder="Contraseña"
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
        <h6 className="mt-4 fw-bold text-black">Fecha, Hora y Lugar</h6>
        <div className="d-flex align-items-center justify-content-between flex-wrap">
          <FormGroup className="form__group">
            <FormText>Fecha</FormText>
            <Input
              type="date"
              placeholder="Journey date"
              name="date"
              value={values.date}
              onChange={handleChange}
              invalid={touched.date && !!errors.date}
            />
            {touched.date && errors.date && showErrorToast(errors.date)}
          </FormGroup>
          <FormGroup className="form__group">
            <FormText>Hora</FormText>
            <Input
              type="time"
              placeholder="Journey time"
              name="time"
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
              onChange={handleChange}
              invalid={touched.city && !!errors.city}
            >
              <option value="">Seleccione una ciudad</option>
              {officesData.map((office) => (
                <option value={office.city} key={office.id}>
                  {office.city}
                </option>
              ))}
            </Input>
            {touched.city && errors.city && showErrorToast(errors.city)}
          </FormGroup>
        </div>
        <div className="d-flex align-items-center justify-content-center flex-wrap mt-4">
          <FormGroup className="form__group">
            <button
              className="btn find__car-btn"
              type="submit"
              onClick={resetErrorShown}
            >
              Enviar
            </button>
          </FormGroup>
        </div>
      </div>
    </Form>
  );
};

export default PresentialQuoteFormExtend;
