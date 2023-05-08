import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import carData from '../assets/data/carData';
import Helmet from '../components/Helmet/Helmet';
import BookingForm from '../components/UI/BookingForm';
import PaymentMethod from '../components/UI/PaymentMethod';

const CarDetails = () => {
  const { slug } = useParams();

  const singleCarItem = carData.find((item) => item.id.toString() === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [singleCarItem]);

  return (
    <Helmet title={singleCarItem.carName}>
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <img src={singleCarItem.imgUrl} alt="" className="w-100" />
            </Col>

            <Col lg="6">
              <div className="car__info">
                <h2 className="section__title">
                  {singleCarItem.name} :{' '}
                  {singleCarItem.color.charAt(0).toUpperCase() +
                    singleCarItem.color.slice(1)}
                </h2>

                <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                  <h6 className="rent__price fw-bold fs-4">
                    ${singleCarItem.price}.00
                  </h6>
                </div>

                <p className="section__description">
                  {singleCarItem.description}
                </p>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: '4rem' }}
                >
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <h7 style={{ color: '#f9a826' }}>Velocidad Maxima:</h7>
                    {singleCarItem.max_speed}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <h7 style={{ color: '#f9a826' }}>Con ABS:</h7>
                    {singleCarItem.abs ? 'Si' : 'No'}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <h7 style={{ color: '#f9a826' }}>Asientos:</h7>
                    {singleCarItem.seats}
                  </span>
                </div>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: '2.8rem' }}
                >
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <h7 style={{ color: '#f9a826' }}>Potencia:</h7>
                    {singleCarItem.power}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <h7 style={{ color: '#f9a826' }}>Velocidades:</h7>
                    {singleCarItem.speeds}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <h7 style={{ color: '#f9a826' }}>Peso:</h7>
                    {singleCarItem.weight}
                  </span>
                </div>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: '2.8rem' }}
                >
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <h7 style={{ color: '#f9a826' }}>Alto:</h7>
                    {singleCarItem.height}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <h7 style={{ color: '#f9a826' }}>Ancho:</h7>
                    {singleCarItem.width}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <h7 style={{ color: '#f9a826' }}>Largo:</h7>
                    {singleCarItem.length}
                  </span>
                </div>
              </div>
            </Col>

            <Col  className="mt-5">
              <div className="booking-info mt-5">
                <h5 className="mb-4 fw-bold ">Información de Registro</h5>
                <BookingForm />
              </div>
            </Col>

            {/* <Col lg="5" className="mt-5">
              <div className="payment__info mt-5">
                <h5 className="mb-4 fw-bold ">Payment Information</h5>
                <PaymentMethod />
              </div>
            </Col> */}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarDetails;
