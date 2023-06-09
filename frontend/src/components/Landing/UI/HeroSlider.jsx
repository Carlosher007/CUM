import React from 'react';

import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { Container } from 'reactstrap';
import { urls } from '../../../assets/urls/urls';
import '../../../styles/hero-slider.css';

const HeroSlider = () => {
  const settings = {
    fade: true,
    speed: 2000,
    autoplaySpeed: 3000,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
  };
  return (
    <Slider {...settings} className="hero__slider">
      <div className="slider__item slider__item-01 mt0">
        <Container>
          <div className="slider__content ">
            <h4 className="text-light mb-3">
              Los mejores carros electricos del mercado
            </h4>
            <h1 className="text-light mb-4">No pierdas la oportunidad</h1>

            <Link to={urls.seeCars} className="btn reserve__btn mt-4">
              Cotize ahora
            </Link>
          </div>
        </Container>
      </div>

      <div className="slider__item slider__item-02 mt0">
        <Container>
          <div className="slider__content ">
            <h4 className="text-light mb-3">
              Los mejores carros electricos del mercado
            </h4>
            <h1 className="text-light mb-4">No pierdas la oportunidad</h1>

            <Link to={urls.seeCars} className="btn reserve__btn mt-4">
              Cotize ahora
            </Link>
          </div>
        </Container>
      </div>

      <div className="slider__item slider__item-03 mt0">
        <Container>
          <div className="slider__content ">
            <h4 className="text-light mb-3">
              Los mejores carros electricos del mercado
            </h4>
            <h1 className="text-light mb-4">No pierdas la oportunidad</h1>

            <Link to={urls.seeCars} className="btn reserve__btn mt-4">
              Cotize ahora
            </Link>
          </div>
        </Container>
      </div>
    </Slider>
  );
};

export default HeroSlider;
