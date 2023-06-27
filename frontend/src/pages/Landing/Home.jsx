import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Col, Container, Row } from 'reactstrap';
import { getCars } from '../../assets/api/cars';
import carData from '../../assets/data/carData';
import Helmet from '../../components/Landing/Helmet/Helmet';
import AboutSection from '../../components/Landing/UI/AboutSection';
import CarItem from '../../components/Landing/UI/CarItem';
import HeroSlider from '../../components/Landing/UI/HeroSlider';
import PresentialQuoteForm from '../../components/Landing/UI/PresentialQuoteForm';
import ServicesList from '../../components/Landing/UI/ServicesList';
// import '../../styles/landing.css';

const Home = () => {
  const [dataCars, setDataCars] = useState([]);

  useEffect(() => {
    const getCarData = async () => {
      try {
        const { data } = await getCars();
        setDataCars(data);
      } catch (error) {
        if (error.response) {
          const { data } = error.response;
          toast.error(data.error, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    };
    getCarData();
  }, []);

  return (
    <div className="bg-white">
      <Helmet title="Home">
        {/* ============= hero section =========== */}
        <section className="p-0 hero__slider-section">
          <HeroSlider />
          {/* <div className="hero__form ">
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
          </div> */}
        </section>
        {/* =========== about section ================ */}
        <AboutSection />
        {/* ========== services section ============ */}
        <section className="bg-white">
          <Container>
            <Row>
              <Col lg="12" className="mb-5 text-center">
                <h2 className="font-bold">Nuestros Servicios</h2>
              </Col>
              <ServicesList />
            </Row>
          </Container>
        </section>
        {/* =========== car offer section ============= */}
        <section className="bg-white">
          <Container>
            <Row>
              <Col lg="12" className="text-center mb-5">
                {/* <h6 className="section__subtitle">Come with</h6> */}
                <h2 className="font-bold">Ultimos lanzamientos</h2>
              </Col>

              {dataCars.slice(0, 3).map((item) => (
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
