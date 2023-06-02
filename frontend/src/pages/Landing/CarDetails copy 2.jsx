import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { CirclePicker } from 'react-color';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Col,
  Container,
  Form,
  FormGroup,
  FormText,
  Input,
  Row,
} from 'reactstrap';
import { getCar } from '../../assets/api/infoCars';
import {
  codeToColorName,
  colorNameToCode,
} from '../../assets/color/colorUtils';
import carData from '../../assets/data/carData';
import officesData from '../../assets/data/officesData';
import { virtualQuoteValidation } from '../../assets/validation/VirtualQuoteValidation';
import Helmet from '../../components/Landing/Helmet/Helmet';
import '../../styles/find-car-form.css';

const CarDetails = () => {
  const { slug } = useParams();

  const [car, setCar] = useState({});
  const colorOptions = ['#FF0000', '#0000FF', '#BF930D', '#000000', '#FFFF00'];
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);

  const handleColorChange = (color) => {
    setSelectedColor(color.hex.toUpperCase());
    console.log(selectedColor);
  };

  useEffect(() => {
    formik.setFieldValue('color', selectedColor); // Actualiza el valor en formik cuando selectedColor cambie
  }, [selectedColor]);

  useEffect(() => {
    const getCarData = async () => {
      try {
        const { data } = await getCar(slug);
        setCar(data);
      } catch (error) {
        const { data } = error.response;
        // Mostrar mensaje de error al usuario o tomar alguna acción según corresponda
        console.log(data.error);
        toast.error(data.error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };
    getCarData();
    setCar(carData.find((item) => item.id.toString() === slug));
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
    // validationSchema: virtualQuoteValidation,
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
    <div className="bg-white">
      <Helmet title={car.carName}>
        <section>
          <Container>
            <Row>
              <Col lg="6">
                <img src={car.imgURL} alt="" className="w-100" />
              </Col>
              <Col lg="6">
                <div className="car__info">
                  <h2 className="section__title">
                    {car.modelo}: {car.year} -{' '}
                    {selectedColor
                      ? codeToColorName(selectedColor).charAt(0).toUpperCase() +
                        codeToColorName(selectedColor).slice(1)
                      : 'Sin definir'}
                  </h2>

                  <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                    <h6 className="rent__price fw-bold fs-4">${car.precio}</h6>
                  </div>
                  <p className="section__description">{car.descripcion}</p>
                  <div>
                    <div className="my-4">
                      <div className="color__options">
                        <CirclePicker
                          colors={colorOptions}
                          color={selectedColor}
                          onChangeComplete={handleColorChange}
                          circleSize={30}
                          circleSpacing={10}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>

            <Row className="justify-center">
              <Col lg="6">
                <div className="car__info">
                  <div className=" d-flex  mt-3 justify-evenly">
                    <span className=" d-flex align-items-center gap-1 section__description">
                      <h7 style={{ color: '#f9a826' }}>Motor:</h7>
                      {car.motor}
                    </span>
                    <span className=" d-flex align-items-center gap-1 section__description">
                      <h7 style={{ color: '#f9a826' }}>Suspension:</h7>
                      {car.suspension}
                    </span>
                  </div>

                  <div className=" d-flex  mt-3 justify-evenly">
                    <span className=" d-flex align-items-center gap-1 section__description">
                      <h7 style={{ color: '#f9a826' }}>Carroceria:</h7>
                      {car.carroceria}
                    </span>

                    <span className=" d-flex align-items-center gap-1 section__description">
                      <h7 style={{ color: '#f9a826' }}>Puertas:</h7>
                      {car.puertas}
                    </span>

                    <span className=" d-flex align-items-center gap-1 section__description">
                      <h7 style={{ color: '#f9a826' }}>Potencia:</h7>
                      {car.potencia}
                    </span>
                  </div>

                  <div className=" d-flex  mt-3 justify-evenly">
                    <span className=" d-flex align-items-center gap-1 section__description">
                      <h7 style={{ color: '#f9a826' }}>Rango:</h7>
                      {car.rango}
                    </span>

                    <span className=" d-flex align-items-center gap-1 section__description">
                      <h7 style={{ color: '#f9a826' }}>
                        Capacidad de bateria:
                      </h7>
                      {car.capacidad_bateria}
                    </span>

                    <span className=" d-flex align-items-center gap-1 section__description">
                      <h7 style={{ color: '#f9a826' }}>Tiempo de Carga:</h7>
                      {car.tiempo_carga}
                    </span>
                  </div>

                  <div className=" d-flex  mt-3 justify-evenly">
                    <span className=" d-flex align-items-center gap-1 section__description">
                      <h7 style={{ color: '#f9a826' }}>Velocidad Maxima:</h7>
                      {car.velocidad_maxima}
                    </span>

                    <span className=" d-flex align-items-center gap-1 section__description">
                      <h7 style={{ color: '#f9a826' }}>Frenos:</h7>
                      {car.frenos}
                    </span>
                  </div>
                </div>
              </Col>
            </Row>

            <Row>
              <Col className="mt-5">
                <div className="booking-info mt-5">
                  <h4 className="mb-4 fw-bold ">Cotice su vehiculo ahora</h4>
                  <Form className="form" onSubmit={handleSubmit}>
                    <div>
                      <h6 className="fw-bold text-black">
                        Información Personal
                      </h6>
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
                          {touched.name &&
                            errors.name &&
                            showErrorToast(errors.name)}
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
                          {touched.phone &&
                            errors.phone &&
                            showErrorToast(errors.phone)}
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
                          {touched.cc && errors.cc && showErrorToast(errors.cc)}
                        </FormGroup>
                      </div>
                      <h6 className="mt-4 fw-bold text-black">
                        Acceso a la Plataforma
                      </h6>
                      <div className="d-flex align-items-center justify-content-between flex-wrap">
                        <FormGroup className="form__group ">
                          <FormText>Email</FormText>
                          <Input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            invalid={touched.email && !!errors.email}
                          />
                          {touched.email &&
                            errors.email &&
                            showErrorToast(errors.email)}
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
                          {touched.city &&
                            errors.city &&
                            showErrorToast(errors.city)}
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
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Helmet>
    </div>
  );
};

export default CarDetails;
