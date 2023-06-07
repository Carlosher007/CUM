import React from 'react';
import { FaCarBattery, GiBatteryPack } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Col } from 'reactstrap';
import { urls } from '../../../assets/urls/urls';
import '../../../styles/car-item.css';

const CarItem = (props) => {
  const {
    model,
    year,
    baterry_capacity,
    charging_time,
    top_speed,
    img_url,
    price,
    sucursal,
    id,
  } = props.item;

  console.log(id);

  //Sacar el length de sucursal el cual es una lista
  const sucursal_length = sucursal.length;

  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="car__item">
        <div className="car__img">
          <img src={img_url} alt="" className="w-100" />
        </div>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">
            {model} - {year}
          </h4>
          <h6 className="rent__price text-center mt-">
            ${price} <span></span>
          </h6>

          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4 text-black">
            <div>
              <span className=" d-flex align-items-center gap-1">
                <i>
                  <FaCarBattery />
                </i>
                {baterry_capacity} kWh
              </span>
              <span className=" d-flex align-items-center gap-1">
                <i class="ri-battery-2-charge-fill"></i> {charging_time} hr
              </span>
            </div>
            <div>
              <span className=" d-flex align-items-center gap-1">
                <i class="ri-speed-fill"></i> {top_speed} km/h
              </span>
              <span className=" d-flex align-items-center gap-1">
                <i class="ri-hotel-fill"></i> {sucursal_length}
              </span>
            </div>
          </div>

          <div className="text-center">
            <Link to={`/landing/cars/${id}`}>
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
