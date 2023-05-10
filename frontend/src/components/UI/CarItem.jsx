import React from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'reactstrap';
import '../../styles/car-item.css';

const CarItem = (props) => {
  const { imgUrl, color, id, name, seats, max_speed, price } = props.item;

  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="car__item">
        <div className="car__img">
          <img src={imgUrl} alt="" className="w-100" />
        </div>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">{name}</h4>
          <h6 className="rent__price text-center mt-">
            ${price}.00 <span></span>
          </h6>

          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-brush-2-line"></i> {color}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-roadster-line"></i> {seats}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-timer-flash-line"></i> {max_speed}
            </span>
          </div>

          <div className="text-center">
            <Link to={`/cars/${id}`}>
              <button className=" w-50 car__item-btn car__btn-details justify-content-center">
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
