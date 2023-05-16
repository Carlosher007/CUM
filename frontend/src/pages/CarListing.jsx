import React, { useState} from 'react';
import { Col, Container, Input, Row } from 'reactstrap';
import carData from '../assets/data/carData';
import Helmet from '../components/Helmet/Helmet';
import CarItem from '../components/UI/CarItem';
import CommonSection from '../components/UI/CommonSection';

const CarListing = () => {

  const [sortOrder, setSortOrder] = useState({
    price: null,
    seats: null,
    maxSpeed: null,
  });

  const handleSortChange = (event, property) => {
    const newSortOrder = { ...sortOrder };
    newSortOrder[property] = event.target.value;
    setSortOrder(newSortOrder);
  };

  
  const sortedCarData = [...carData].sort((a, b) => {
    let result = 0;

    if (sortOrder.price === 'low') {
      result = a.price - b.price;
    } else if (sortOrder.price === 'high') {
      result = b.price - a.price;
    }

    if (sortOrder.seats === 'low') {
      result = a.seats - b.seats;
    } else if (sortOrder.seats === 'high') {
      result = b.seats - a.seats;
    }

    if (sortOrder.maxSpeed === 'low') {
      result = a.max_speed - b.max_speed;
    } else if (sortOrder.maxSpeed === 'high') {
      result = b.max_speed - a.max_speed;
    }

    return result;
  });

  return (
    <Helmet title="Cars">
      <CommonSection title="Car Listing" />

      <section>
        <Container>
          <Row>
            <div className="d-flex gap-3">
              <Col lg="4" className="mb-5">
                <div className="d-flex align-items-center gap-2">
                  <span className="d-flex align-items-center gap-2">
                    <i className="ri-sort-asc"></i> Ordena por Precio
                  </span>

                  <Input
                    type="select"
                    onChange={(event) => handleSortChange(event, 'price')}
                    style={{ maxWidth: '200px' }}
                  >
                    <option>Select</option>
                    <option value="low">Ascendente</option>
                    <option value="high">Descendente</option>
                  </Input>
                </div>
              </Col>
              <Col lg="4" className="mb-5">
                <div className="d-flex align-items-center gap-2">
                  <span className="d-flex align-items-center gap-2">
                    <i className="ri-sort-asc"></i> Ordena por Asientos
                  </span>

                  <Input
                    type="select"
                    onChange={(event) => handleSortChange(event, 'seats')}
                    style={{ maxWidth: '200px' }}
                  >
                    <option>Select</option>
                    <option value="low">Ascendente</option>
                    <option value="high">Descendente</option>
                  </Input>
                </div>
              </Col>
              <Col lg="4" className="mb-5">
                <div className="d-flex align-items-center gap-2">
                  <span className="d-flex align-items-center gap-2">
                    <i className="ri-sort-asc"></i> Ordena por Velocidad Maximo
                  </span>

                  <Input
                    type="select"
                    onChange={(event) => handleSortChange(event, 'maxSpeed')}
                    style={{ maxWidth: '200px' }}
                  >
                    <option>Select</option>
                    <option value="low">Ascendente</option>
                    <option value="high">Descendente</option>
                  </Input>
                </div>
              </Col>
            </div>
            {sortedCarData.map((item) => (
              <CarItem item={item} key={item.id} />
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
