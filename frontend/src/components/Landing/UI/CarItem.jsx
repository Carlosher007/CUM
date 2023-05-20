import React from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'reactstrap';
import { urls } from '../../../assets/urls/urls';
import '../../../styles/car-item.css';

const CarItem = (props) => {
  const { imgURL, color, id, modelo, year, rango, tiempoCarga, precio } =
    props.item;

  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="car__item">
        <div className="car__img">
          <img src={imgURL} alt="" className="w-100" />
        </div>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">
            {modelo} - {year}
          </h4>
          <h6 className="rent__price text-center mt-">
            ${precio} <span></span>
          </h6>

          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4 text-black">
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-brush-2-line"></i> {color}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-roadster-line"></i> {rango} km
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-timer-flash-line"></i> {tiempoCarga} hr
            </span>
          </div>

          <div className="text-center">
            <Link to={`${urls.seeCarI}${id}`}>
              <button className=" w-50 car__item-btn car__btn-details justify-content-center text-black">
                Cotizar
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default CarItem;
