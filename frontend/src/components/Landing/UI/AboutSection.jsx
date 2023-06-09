import React from "react";
import { Container, Row, Col } from "reactstrap";
import '../../../styles/about-section.css';
import aboutImg from '../../../assets/all-images/cars-img/bmw-offer.png';

const AboutSection = ({ aboutClass }) => {
  return (
    <section
      className="about__section bg-white "
      style={
        aboutClass === 'aboutPage'
          ? { marginTop: '0px' }
          : { marginTop: '0px' }
      }
    >
      <Container>
        <Row>
          <Col>
            <div className="about__section-content text-black">
              <h4 className="section__subtitle">Sobre nosotros</h4>
              <h2 className="section__title">Bienvenido a CUM</h2>
              <p className="section__description text-black">
                Somos una empresa de venta y mantenimiento de automóviles
                eléctricos comprometida con el medio ambiente y la movilidad
                sostenible. Ofrecemos soluciones de transporte eléctrico
                adaptadas a las necesidades de cada cliente, junto con servicios
                de mantenimiento y reparación de vehículos eléctricos de alta
                calidad. ¡Únete a la movilidad sostenible con nosotros!
              </p>

              <div className="about__section-item d-flex align-items-center ">
                <p className="section__description d-flex align-items-center gap-2 text-black">
                  <i className="ri-checkbox-circle-line"></i> 10 años de experiencia
                </p>

                <p className="section__description d-flex align-items-center gap-2 text-black">
                  <i className="ri-checkbox-circle-line"></i> Servicio de calidad
                </p>
              </div>

              <div className="about__section-item d-flex align-items-center">
                <p className="section__description d-flex align-items-center gap-2 text-black">
                  <i className="ri-checkbox-circle-line"></i> Amplia selección de
                  modelos
                </p>

                <p className="section__description d-flex align-items-center gap-2 text-black">
                  <i className="ri-checkbox-circle-line"></i> Precios competitivos
                </p>
              </div>
            </div>
          </Col>

          {/* <Col lg="6" md="6">
            <div className="about__img">
              <img src={aboutImg} alt="" className="w-100" />
            </div>
          </Col> */}
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;
