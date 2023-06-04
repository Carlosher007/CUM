import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, ListGroup, ListGroupItem, Row } from 'reactstrap';
import { companyData } from '../../../assets/data/companyData';
import { urls } from '../../../assets/urls/urls';

const quickLinks = [
  {
    path: urls.seeCars,
    display: 'Carros',
  },
  {
    path: urls.contact,
    display: 'Contacto',
  },
  {
    path: urls.offices,
    display: 'Sucursales',
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
                <Link to="/home" className="flex items-center gap-2">
                  <i className="ri-car-line"></i>
                  <span>
                    Compra y Mantenimiento
                    <br /> de Carros
                  </span>
                </Link>
              </h1>
            </div>
            <p className="footer__logo-content">{companyData.description}</p>
          </Col>

          <Col lg="2" md="4" sm="6">
            <div className="mb-4">
              <h5 className="footer__link-title">Links Rápidos</h5>
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
              <p className="office__info">Teléfono: {companyData.phone}</p>
              <p className="office__info">Email: {companyData.email}</p>
            </div>
          </Col>

          {/* <Col lg="3" md="4" sm="12">
            <div className="mb-4">
              <h5 className="footer__link-title">¡No te pierdas de nada!</h5>
              <p className="section__description">Suscríbete</p>
              <div className="newsletter">
                <input type="email" placeholder="Email" />
                <span>
                  <i className="ri-send-plane-line"></i>
                </span>
              </div>
            </div>
          </Col> */}

          <Col lg="12">
            <div className="footer__bottom">
              <p className="section__description flex items-center justify-center gap-1 pt-4">
                {year}, Desarrollado por CBJD
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
