import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import officesData from '../../assets/data/officesData';
import '../../styles/find-car-form.css';

const PresentialPurchaseForm = () => {
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.target);
  //   const data = Object.fromEntries(formData.entries());
  //   console.log(data);
  // };

  const handleValidation = (data) => {
    let errors = {};

    // Validación de la fecha
    const date = new Date(data.date);
    const today = new Date();
    if (date < today) {
      errors.date = 'La fecha debe ser igual o posterior a hoy';
    }

    // Validación de la cedula
    const ccRegex = /^\d{8,12}$/;
    if (!ccRegex.test(data.cc)) {
      errors.cc = 'La cedula debe tener entre 8 y 12 digitos';
    }

    // Validación de la hora
    const time = data.time.split(':');
    const hour = parseInt(time[0]);
    if (hour < 8 || hour >= 19) {
      errors.time = 'La hora debe estar entre las 8:00 am y 7:00 pm';
    }

    if (Object.keys(errors).length !== 0) {
      Object.values(errors).forEach((error) => {
        toast.error(error);
      });
      return false;
    }
    return true;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const isValid = handleValidation(data);
    if (isValid) {
      console.log(data);
    }
  };

  return (
    <Form className="form" onSubmit={handleFormSubmit}>
      <div>
        Información Personal
        <div className=" d-flex align-items-center justify-content-between flex-wrap">
          <FormGroup className="form__group">
            <Input
              type="text"
              placeholder="Nombre"
              required
              name="name"
              // onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup className="form__group">
            <Input
              type="email"
              placeholder="example@gmail.com"
              required
              name="email"
              // onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup className="form__group">
            <Input
              type="text"
              placeholder="Cedula"
              required
              name="cc"
              // onChange={handleInputChange}
            />
          </FormGroup>
        </div>
        Fecha, Hora y Lugar
        <div className=" d-flex align-items-center justify-content-between flex-wrap">
          <FormGroup className="form__group">
            <Input
              type="date"
              placeholder="Journey date"
              required
              name="date"
            />
          </FormGroup>
          <FormGroup className="form__group">
            <input
              className="journey__time"
              type="time"
              placeholder="Journey time"
              required
              name="time"
            />
          </FormGroup>
          <FormGroup className="select__group">
            <Input type="select" name="city">
              {officesData.map((office) => (
                <option value={office.city} key={office.id}>
                  {office.city}
                </option>
              ))}
            </Input>
          </FormGroup>
        </div>
        <div className=" d-flex align-items-center justify-content-end flex-wrap">
          <FormGroup className="form__group">
            <button className="btn find__car-btn">Enviar</button>
          </FormGroup>
        </div>
      </div>
    </Form>
  );
};

export default PresentialPurchaseForm;
