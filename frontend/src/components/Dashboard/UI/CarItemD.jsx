import React from 'react';
import { FaCarBattery, GiBatteryPack } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Col } from 'reactstrap';
import { urls } from '../../../assets/urls/urls';

const CarItemD = (props) => {
  const {
    model,
    year,
    battery_capacity,
    charging_time,
    top_speed,
    img_url,
    price,
    doors,
    id,
  } = props.item;

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2">
      <div className="border border-gray-400 p-4 rounded-lg">
        <div className="car__img">
          <img src={img_url} alt="" className="w-full" />
        </div>

        <div className="mt-4">
          <h4 className="text-center text-xl font-semibold">
            {model} - {year}
          </h4>
          <h6 className="text-center mt-1 text-lg font-semibold">
            ${price} <span></span>
          </h6>

          <div className="flex items-center justify-between mt-3 mb-4 text-white">
            <div>
              <span className="flex items-center gap-1">
                <FaCarBattery className="text-primary" />
                {battery_capacity} kWh
              </span>
              <span className="flex items-center gap-1">
                <i className="ri-battery-2-charge-fill text-primary"></i>{' '}
                {charging_time} hr
              </span>
            </div>
            <div>
              <span className="flex items-center gap-1">
                <i className="ri-speed-fill text-primary"></i> {top_speed} km/h
              </span>
              <span className="flex items-center gap-1">
                <i className="ri-door-fill text-primary"></i> {doors}
              </span>
            </div>
          </div>

          <div className="text-center">
            <Link to={`/dashboard/cars/${id}`}>
              <button className="w-2/3 sm:w-full bg-primary text-black rounded-full py-2 px-4 font-semibold">
                Cotizar
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarItemD;
