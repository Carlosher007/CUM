import React from 'react';

import Helmet from '../../components/Landing/Helmet/Helmet';
import HeroSlider from '../../components/Landing/UI/HeroSlider';

import { Col, Container, Row } from 'reactstrap';
import carData from '../../assets/data/carData';
import AboutSection from '../../components/Landing/UI/AboutSection';
import CarItem from '../../components/Landing/UI/CarItem';
import PresentialQuoteForm from '../../components/Landing/UI/PresentialQuoteForm';
import ServicesList from '../../components/Landing/UI/ServicesList';

const Home = () => {
  return (
    <div className="bg-white">
    
    <Helmet title="Home" >
      {/* ============= hero section =========== */}
      <section className="p-0 hero__slider-section">
        <HeroSlider />

        <div className="hero__form ">
          <Container>
            <Row className="form__row">
              <Col lg="4" md="4">
                <div className="find__cars-left">
                  <h2>Cotice de forma presencial</h2>
                </div>
              </Col>

              <Col lg="8" md="8" sm="12">
                <PresentialQuoteForm />
              </Col>
            </Row>
          </Container>
        </div>
      </section>
      {/* =========== about section ================ */}
      <AboutSection />
      {/* ========== services section ============ */}
      <section className="bg-white">
        <Container >
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h2 className="section__title">Nuestros Servicios</h2>
            </Col>
            <ServicesList />
          </Row>
        </Container>
      </section>
      {/* =========== car offer section ============= */}
      <section className='bg-white'>
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              {/* <h6 className="section__subtitle">Come with</h6> */}
              <h2 className="section__title">Mejores Ofertas</h2>
            </Col>

            {carData.slice(0, 6).map((item) => (
              <CarItem item={item} key={item.id} />
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
    </div>
  );
};

export default Home;
