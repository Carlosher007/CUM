import React, { useEffect } from 'react';
import { Col, Container, Row } from 'reactstrap';
import Helmet from '../components/Helmet/Helmet';
import BookingForm from '../components/UI/BookingForm';
import PresentialQuoteFormExtend from '../components/UI/PresentialQuoteFormExtend'

const PresentialQuote = () => {
  return (
    <Helmet >
      <section>
        <Container>
          <Row>
              <div className="booking-info mt-5">
                <h5 className="mb-4 fw-bold ">Registra tus datos para la cotización presencial</h5>
                <PresentialQuoteFormExtend />
              </div>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default PresentialQuote;
