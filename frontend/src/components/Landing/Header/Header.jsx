import React, { useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import { companyData } from '../../../assets/data/companyData';
import { urls } from '../../../assets/urls/urls';
import '../../../styles/header.css';

import Cookies from 'universal-cookie';

const Header = () => {
  const menuRef = useRef(null);
  const cookies = new Cookies();
  const token = cookies.get('token');

  const urlCars = !token ? urls.seeCars : urls.seeCarsD;

  const navLinks = [
    {
      path: urls.home,
      display: 'Inicio',
    },
    {
      path: urlCars,
      display: 'Carros',
    },
    {
      path: urls.offices,
      display: 'Sucursales',
    },
  ];

  const toggleMenu = () => menuRef.current.classList.toggle('menu__active');

  return (
    <header className="header bg-white">
      {/* ============ header top ============ */}
      <div className="header__top">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <div className="header__top__left">
                <span>Necesitas Ayuda?</span>
                <span className="header__top__help">
                  <i className="ri-customer-service-2-line"></i>{' '}
                  {companyData.phone}
                </span>
              </div>
            </Col>

            <Col lg="6" md="6" sm="6">
              <div className="header__top__right flex items-center justify-end gap-3">
                {/* <Link to="#" className="flex items-center gap-1">
                  <i className="ri-login-circle-line"></i> Login
                </Link> */}

                {!token ? (
                  <Link to={urls.login} className="flex items-center gap-1">
                    <i className="ri-user-line"></i> Ingresar
                  </Link>
                ) : (
                  <Link to={urls.home2} className="flex items-center gap-1">
                    <i className="ri-user-line"></i> Ir a Dashboard
                  </Link>
                )}
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
                  <Link to={urls.home} className="flex items-center gap-2">
                    <i className="ri-car-line"></i>
                    <span>
                      Car Universal
                      <br /> Manager
                    </span>
                  </Link>
                </h1>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location flex items-center gap-2">
                <span>
                  <i className="ri-earth-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Colombia</h4>
                  <h6>Múltiples sedes en el país</h6>
                </div>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location flex items-center gap-2">
                <span>
                  <i className="ri-time-line"></i>
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

            {/* <Col lg="2" md="3" sm="0" className="flex items-center justify-end">
              <Link
                className="header__btn btn"
                to={urls.contact}
                style={{ color: 'white' }}
              >
                <i className="ri-phone-line"></i> Contactanos
              </Link>
            </Col> */}
          </Row>
        </Container>
      </div>

      {/* ========== main navigation =========== */}

      <div className="main__navbar">
        <Container>
          <div className="navigation__wrapper flex items-center justify-between">
            <span className="mobile__menu">
              <i className="ri-menu-line" onClick={toggleMenu}></i>
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
