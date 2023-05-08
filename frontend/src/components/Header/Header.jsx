import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import '../../styles/header.css';

const LOGIN_URL = '/login';

const navLinks = [
  {
    path: '/home',
    display: 'Inicio',
  },
  // {
  //   path: "/about",
  //   display: "About",
  // },
  {
    path: '/cars',
    display: 'Carros',
  },
  //
  //   {
  //     path: "/blogs",
  //     display: "Blog",
  //   },
  {
    path: '/contact',
    display: 'Contacto',
  },
];

const Header = () => {
  const menuRef = useRef(null);

  const [searchValue, setSearchValue] = useState('');
  const [displaySearchBox, setDisplaySearchBox] = useState(false);

  const toggleMenu = () => menuRef.current.classList.toggle('menu__active');

  const handleNavItemClick = (item) => {
    if (item.display === 'Cars') {
      setDisplaySearchBox(true);
    } else {
      setDisplaySearchBox(false);
    }
  };

  return (
    <header className="header">
      {/* ============ header top ============ */}
      <div className="header__top">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <div className="header__top__left">
                <span>Necesitas Ayuda?</span>
                <span className="header__top__help">
                  <i class="ri-customer-service-2-line"></i> 3013666180
                </span>
              </div>
            </Col>

            <Col lg="6" md="6" sm="6">
              <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
                {/* <Link to="#" className=" d-flex align-items-center gap-1">
                  <i class="ri-login-circle-line"></i> Login
                </Link> */}

                <Link
                  to={LOGIN_URL}
                  className=" d-flex align-items-center gap-1"
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
                      Car Universal<br /> Manager
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
                  <h4>Sabado a Domingo</h4>
                  <h6>8am - 7pm</h6>
                </div>
              </div>
            </Col>

            <Col
              lg="2"
              md="3"
              sm="0"
              className=" d-flex align-items-center justify-content-end "
            >
              <button className="header__btn btn ">
                <Link to="/contact">
                  <i class="ri-phone-line"></i> Contactanos
                </Link>
              </button>
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
                    onClick={() => handleNavItemClick(item)}
                  >
                    {item.display}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* {displaySearchBox && (
              <div className="nav__right">
                <div className="search__box">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                  />
                  <span>
                    <Link to={`/carsff/${searchValue}`}>
                      <i class="ri-search-line"></i>
                    </Link>
                  </span>
                </div>
              </div>
            )} */}
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
