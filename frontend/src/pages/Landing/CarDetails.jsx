import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Col, Container, Row } from 'reactstrap';
import { getCar } from '../../assets/api/infoCars';
import carData from '../../assets/data/carData';
import Helmet from '../../components/Landing/Helmet/Helmet';
import VirtualQuoteForm from '../../components/Landing/UI/VirtualQuoteForm';

const CarDetails = () => {
  const { slug } = useParams();

  const [car, setCar] = useState({});

  useEffect(() => {
    const getCarData = async () => {
      try {
        console.log(slug);
        const { data } = await getCar(slug);
        setCar(data);
        console.log(data);
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
  }, []);

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
                    {car.color
                      ? car.color.charAt(0).toUpperCase() + car.color.slice(1)
                      : 'Sin definir'}
                  </h2>

                  <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                    <h6 className="rent__price fw-bold fs-4">${car.precio}</h6>
                  </div>

                  <p className="section__description">{car.descripcion}</p>

                  <div
                    className=" d-flex align-items-center mt-3"
                    style={{ columnGap: '0rem' }}
                  >
                    <span className=" d-flex align-items-center gap-1 section__description">
                      <h7 style={{ color: '#f9a826' }}>Motor:</h7>
                      {car.motor}
                    </span>
                  </div>

                  <div
                    className=" d-flex align-items-center mt-3"
                    style={{ columnGap: '4rem' }}
                  >
                    <span className=" d-flex align-items-center gap-1 section__description">
                      <h7 style={{ color: '#f9a826' }}>Suspension:</h7>
                      {car.suspension}
                    </span>
                  </div>

                  <div
                    className=" d-flex align-items-center mt-3"
                    style={{ columnGap: '3rem' }}
                  >
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

                  <div
                    className=" d-flex align-items-center mt-3"
                    style={{ columnGap: '3rem' }}
                  >
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

                  <div
                    className=" d-flex align-items-center mt-3"
                    style={{ columnGap: '3rem' }}
                  >
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

              <Col className="mt-5">
                <div className="booking-info mt-5">
                  <h4 className="mb-4 fw-bold ">Cotice su vehiculo ahora</h4>
                  <VirtualQuoteForm />
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
