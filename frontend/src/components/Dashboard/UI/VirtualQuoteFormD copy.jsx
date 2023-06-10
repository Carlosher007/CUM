import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Form, FormGroup, FormText, Input } from 'reactstrap';
import { getSucursals } from '../../../assets/api/sucursal.api';
import { virtualQuoteValidation } from '../../../assets/validation/VirtualQuoteValidation';

const VirtualQuoteFormD = ({ slug, selectedColor }) => {
  const [sucursals, setSucursals] = useState([]);

  useEffect(() => {
    formik.setFieldValue('color', selectedColor); // Actualiza el valor en formik cuando selectedColor cambie
  }, [selectedColor]);

  useEffect(() => {
    const getSucursalsData = async () => {
      try {
        const { data } = await getSucursals();
        setSucursals(data);
      } catch (error) {
        if (error) {
          const { data } = error.response;
          toast.error(data.error, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    };
    getSucursalsData();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      city: '',
      cc: '',
      phone: '',
      email: '',
      address: '',
      password: '',
      idCar: slug,
      color: selectedColor,
    },
    validationSchema: virtualQuoteValidation,
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
      <h6 className="font-bold mb-2">Datos Personales</h6>
      <div className="flex flex-wrap items-center justify-between">
        <div className="w-full sm:w-1/2 ">
          <FormGroup className="w-full">
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
          <FormGroup className="w-full">
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
        </div>
        <div className="w-full sm:w-1/2 mt-4 sm:mt-0 space-x-2">
          <FormGroup className="w-full ml-2">
            <FormText>Dirección</FormText>
            <Input
              type="text"
              className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
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
          <FormGroup className="w-full ml-2">
            <FormText>Cedula</FormText>
            <Input
              type="text"
              className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
              placeholder="Cedula"
              name="cc"
              value={values.cc}
              onChange={handleChange}
              invalid={touched.cc && !!errors.cc}
            />
            {touched.cc && errors.cc && showErrorToast(errors.cc)}
          </FormGroup>
        </div>
      </div>

      <h6 className="font-bold mt-5">Datos Personales</h6>
      <div className="flex flex-wrap items-center justify-between">
        <div className="w-full sm:w-1/2 ">
          <FormGroup className="w-full">
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
          <FormGroup className="w-full">
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
        </div>
        <div className="w-full sm:w-1/2 mt-4 sm:mt-0 space-x-2">
          <FormGroup className="w-full ml-2">
            <FormText>Dirección</FormText>
            <Input
              type="text"
              className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
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
          <FormGroup className="w-full ml-2">
            <FormText>Cedula</FormText>
            <Input
              type="text"
              className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
              placeholder="Cedula"
              name="cc"
              value={values.cc}
              onChange={handleChange}
              invalid={touched.cc && !!errors.cc}
            />
            {touched.cc && errors.cc && showErrorToast(errors.cc)}
          </FormGroup>
        </div>
      </div>
      <h6 className="mt-4 font-bold mb-2">Acceso a la Plataforma</h6>
      <div className="flex flex-wrap items-center justify-between">
        <FormGroup className="w-1/4">
          <FormText>Email</FormText>
          <Input
            type="email"
            className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            invalid={touched.email && !!errors.email}
          />
          {touched.email && errors.email && showErrorToast(errors.email)}
        </FormGroup>
        <FormGroup className="w-1/4">
          <FormText>Contraseña</FormText>
          <Input
            type="password"
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
        <FormGroup className="w-1/4">
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
      <div className="flex items-center justify-center flex-wrap mt-4">
        <FormGroup className="w-1/4">
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

export default VirtualQuoteFormD;
