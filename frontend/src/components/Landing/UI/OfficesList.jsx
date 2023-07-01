import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Col } from 'reactstrap';
import img01 from '../../../assets/all-images/drive.jpg';
import { getSucursalsStaff } from '../../../assets/api/sucursal.api';
import officesData from '../../../assets/data/officesData';
import '../../../styles/blog-item.css';

const OfficesList = () => {
  const [sucursals, setSucursals] = useState([]);

  useEffect(() => {
    const getSucursalsData = async () => {
      try {
        const { data } = await getSucursalsStaff();
        setSucursals(data);
      } catch (error) {
        if (error.response) {
          const { data } = error.response;
          console.log(data);
        }
      }
    };
    getSucursalsData();
  }, []);
  return (
    <>
      {sucursals.map((item) => (
        <OfficeItem item={item} key={item.id} />
      ))}
    </>
  );
};

const OfficeItem = ({ item }) => {
  const { city, address, cellphone, parts, staff } = item;

  const lengthVehicles = parts.length;
  const lengthStaff = staff.length;

  return (
    <Col lg="4" md="6" sm="6" className="mb-5">
      <div className="blog__item">
        <img src={img01} alt="" className="w-100" />
        <div className="blog__info p-3">
          {/* Hacemos que se alinea en el centro con boostrap las clases */}
          <h4 className="blog__title text-center">Sucursal de {city}</h4>
          {/* <p className="section__description mt-3"> */}
          {/* </p> */}

          <div className="blog__time pt-3 mt-3 d-flex align-items-center justify-content-between">
            <span className="blog__author">
              <i className="ri-user-2-line"></i> # Personal: {lengthStaff}
            </span>

            <div className=" d-flex align-items-center gap-3">
              <span className=" blog__author">
                <i className="ri-message-3-line"></i> {cellphone}
              </span>
            </div>
          </div>

          <div className="blog__time pt-3 mt-3 d-flex align-items-center justify-content-between">
            <span className="blog__author">
              <i className="ri-user-settings-line"></i> # Vehiculos:{' '}
              {lengthVehicles}
            </span>

            <div className=" d-flex align-items-center gap-3">
              <span className="blog__author">
                <i className="ri-building-4-line"></i> {address}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default OfficesList;
