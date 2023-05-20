import React, { useRef, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import { companyData } from '../../../assets/data/companyData';
import { urls } from '../../../assets/urls/urls';
import { cambiarModo } from '../../../assets/Context/ModeContext';
import '../../../styles/header.css';

const navLinks = [
  {
    path: urls.home,
    display: 'Inicio',
  },
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

const Header = () => {
  const menuRef = useRef(null);

  const toggleMenu = () => menuRef.current.classList.toggle('menu__active');

  return (
    <header className="header bg-white">
      {/* ============ header top ============ */}
      <div className="header__top ">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <div className="header__top__left">
                <span>Necesitas Ayuda?</span>
                <span className="header__top__help">
                  <i class="ri-customer-service-2-line"></i> {companyData.phone}
                </span>
              </div>
            </Col>

            <Col lg="6" md="6" sm="6">
              <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
                {/* <Link to="#" className=" d-flex align-items-center gap-1">
                  <i class="ri-login-circle-line"></i> Login
                </Link> */}

                <Link
                  to={urls.home2}
                  className=" d-flex align-items-center gap-1"  onClick={cambiarModo('dashboard')}
                >
                  <i class="ri-user-line"></i> Ingresar
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* =============== header middle =========== */}
      <div className="header__middle">
        <Container>
          <Row>
            <Col lg="4" md="3" sm="4">
              <div className="logo">
                <h1>
                  <Link to="/home" className=" d-flex align-items-center gap-2">
                    <i class="ri-car-line"></i>
                    <span>
                      Car Universal
                      <br /> Manager
                    </span>
                  </Link>
                </h1>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i class="ri-earth-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Colombia</h4>
                  <h6>Multiples sedes en el país</h6>
                </div>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i class="ri-time-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>
                    {companyData.diaInicio} a {companyData.diaFinal}
                  </h4>
                  <h6>
                    {companyData.horaInicio} - {companyData.horaFinal}
                  </h6>
                </div>
              </div>
            </Col>

            <Col
              lg="2"
              md="3"
              sm="0"
              className=" d-flex align-items-center justify-content-end "
            >
              <Link
                className="header__btn btn"
                to="/contact"
                style={{ color: 'white' }}
              >
                <i className="ri-phone-line"></i> Contactanos
              </Link>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ========== main navigation =========== */}

      <div className="main__navbar">
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <span className="mobile__menu">
              <i class="ri-menu-line" onClick={toggleMenu}></i>
            </span>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu">
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? 'nav__active nav__item' : 'nav__item'
                    }
                    key={index}
                  >
                    {item.display}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
