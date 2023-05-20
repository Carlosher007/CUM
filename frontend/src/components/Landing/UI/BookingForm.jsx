import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Form, FormGroup, Input } from 'reactstrap';
import officesData from '../../assets/data/officesData';
import '../../styles/booking-form.css';

const BookingForm = () => {
  const handleValidation = (data) => {
    let errors = {};

    // Validación de la cedula
    const ccRegex = /^\d{8,12}$/;
    if (!ccRegex.test(data.cc)) {
      errors.cc = 'La cedula debe tener entre 8 y 12 digitos';
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
    <Form onSubmit={handleFormSubmit}>
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <Input type="text" placeholder="Nombre" name="name" required />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <Input type="email" placeholder="Email" name="email" required />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <Input type="text" placeholder="Cedula" name="cc" required />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <Input
          type="number"
          placeholder="Numero Telefonico"
          name="phone"
          required
        />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <Input type="text" placeholder="Direccion" name="address" required />
      </FormGroup>
      <FormGroup className="select__group booking__form d-inline-block me-4 mb-4">
        <Input type="select" name="city" placeholder="Sucursal" required>
          {officesData.map((office) => (
            <option value={office.city} key={office.id}>
              {office.city}
            </option>
          ))}
        </Input>
      </FormGroup>
      <div className=" d-flex align-items-center justify-content-center flex-wrap">
        <FormGroup className="form__group">
          <button className="btn find__car-btn">Enviar</button>
        </FormGroup>
      </div>
    </Form>
  );
};

export default BookingForm;
