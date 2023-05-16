import React from 'react';
import { Col } from 'reactstrap';
import img01 from '../../assets/all-images/drive.jpg';
import officesData from '../../assets/data/officesData';
import '../../styles/blog-item.css';

const OfficesList = () => {
  return (
    <>
      {officesData.map((item) => (
        <OfficeItem item={item} key={item.id} />
      ))}
    </>
  );
};

const OfficeItem = ({ item }) => {
  const { managerName, workshopChiefName, city, address, phone } = item;

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
              <i class="ri-user-2-line"></i> {managerName}
            </span>

            <div className=" d-flex align-items-center gap-3">
              <span className=" d-flex align-items-center gap-1 section__description">
                <i class="ri-message-3-line"></i> {phone}
              </span>
            </div>
          </div>

          <div className="blog__time pt-3 mt-3 d-flex align-items-center justify-content-between">
            <span className="blog__author">
              <i class="ri-user-settings-line"></i> {workshopChiefName}
            </span>

            <div className=" d-flex align-items-center gap-3">
              <span className=" d-flex align-items-center gap-1 section__description">
                <i class="ri-building-4-line"></i> {address}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default OfficesList;
