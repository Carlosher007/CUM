import React from 'react';
import { Container, Row } from 'reactstrap';
import Helmet from '../../components/Landing/Helmet/Helmet';
import PresentialQuoteFormExtend from '../../components/Landing/UI/PresentialQuoteFormExtend';

const PresentialQuote = () => {
  return (
    <div className="bg-white">
      <Helmet>
        <section>
          <Container>
            <Row>
              <div className="booking-info mt-5">
                <h5 className="mb-4 fw-bold ">
                  Registra tus datos para la cotización presencial
                </h5>
                <PresentialQuoteFormExtend />
              </div>
            </Row>
          </Container>
        </section>
      </Helmet>
    </div>
  );
};

export default PresentialQuote;
