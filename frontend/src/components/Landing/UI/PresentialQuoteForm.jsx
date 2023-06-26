import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, FormGroup, Input } from 'reactstrap';
import { getSucursals } from '../../../assets/api/sucursal.api';
import { urls } from '../../../assets/urls/urls';
import { presentialQuoteValidation } from '../../../assets/validation/PresentialQuoteValidation';
import '../../../styles/find-car-form.css';

const PresentialQuoteForm = () => {
  const navigate = useNavigate();

  const [sucursals, setSucursals] = useState([]);

  useEffect(() => {
    const getSucursalsData = async () => {
      try {
        const { data } = await getSucursals();
        setSucursals(data);
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
    },
    validationSchema: presentialQuoteValidation,
    onSubmit: (values) => {
      navigate(urls.presentialquote, { state: values });
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
      <div className="text-black">
        Información Personal
        <div className="d-flex align-items-center justify-content-between flex-wrap">
          <FormGroup className="form__group">
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
        </div>
        Fecha, Hora y Lugar
        <div className="d-flex align-items-center justify-content-between flex-wrap">
          <FormGroup className="form__group">
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
            <Input
              type="select"
              name="city"
              value={values.city}
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
        <div className="d-flex align-items-center justify-content-end flex-wrap">
          <FormGroup className="form__group">
            <button
              className="btn find__car-btn"
              type="submit"
              onClick={resetErrorShown}
            >
              Seguir
            </button>
          </FormGroup>
        </div>
      </div>
    </Form>
  );
};

export default PresentialQuoteForm;
