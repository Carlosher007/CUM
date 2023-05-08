import React from 'react';

import { Link } from 'react-router-dom';
import { Col, Container, ListGroup, ListGroupItem, Row } from 'reactstrap';
import '../../styles/footer.css';

const quickLinks = [
  // {
  //   path: "/about",
  //   display: "About",
  // },

  {
    path: '#',
    display: 'Privacy Policy',
  },

  {
    path: '/cars',
    display: 'Car Listing',
  },
  // {
  //   path: "/blogs",
  //   display: "Blog",
  // },

  {
    path: '/contact',
    display: 'Contact',
  },
];

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="6" md="4" sm="12">
            <div className="logo footer__logo">
              <h1>
                <Link to="/home" className=" d-flex align-items-center gap-2">
                  <i class="ri-car-line"></i>
                  <span>
                    Compra y Mantenimiento
                    <br /> de Carros
                  </span>
                </Link>
              </h1>
            </div>
            <p className="footer__logo-content">
              ¡Gracias por elegirnos! Somos su tienda de confianza para la
              compra y mantenimiento de vehículos eléctricos de alta calidad y
              tecnología. Nuestro equipo está aquí para brindarle la mejor
              experiencia en el cuidado de su automóvil eléctrico.
            </p>
          </Col>

          <Col lg="2" md="4" sm="6">
            <div className="mb-4">
              <h5 className="footer__link-title">Links Rapidos</h5>
              <ListGroup>
                {quickLinks.map((item, index) => (
                  <ListGroupItem key={index} className="p-0 mt-3 quick__link">
                    <Link to={item.path}>{item.display}</Link>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </div>
          </Col>

          <Col lg="3" md="4" sm="6">
            <div className="mb-4">
              <h5 className="footer__link-title mb-4">Información</h5>
              <p className="office__info">Colombia</p>
              <p className="office__info">Telefono: 3013666180</p>

              <p className="office__info">
                Email: customuniversalmanager@gmail.com
              </p>

              <p className="office__info">Tiempo: 8am - 7pm</p>
            </div>
          </Col>

          {/* <Col lg="3" md="4" sm="12">
            <div className="mb-4">
              <h5 className="footer__link-title">¡No te pierdas de nada!</h5>
              <p className="section__description">Subscribete</p>
              <div className="newsletter">
                <input type="email" placeholder="Email" />
                <span>
                  <i class="ri-send-plane-line"></i>
                </span>
              </div>
            </div>
          </Col> */}

          <Col lg="12">
            <div className="footer__bottom">
              <p className="section__description d-flex align-items-center justify-content-center gap-1 pt-4">
                <i class="ri-copyright-line"></i>Copyright {year}, Desarrollado por CBJD
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
