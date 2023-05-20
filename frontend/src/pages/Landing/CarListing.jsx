import React, { useState } from 'react';
import { Col, Container, Input, Row } from 'reactstrap';
import carData from '../../assets/data/carData';
import Helmet from '../../components/Landing/Helmet/Helmet';
import CarItem from '../../components/Landing/UI/CarItem';
import CommonSection from '../../components/Landing/UI/CommonSection';

const CarListing = () => {
  const [sortOrder, setSortOrder] = useState({
    precio: null,
    tiempoCarga: null,
    rango: null,
  });

  const handleSortChange = (event, property) => {
    const newSortOrder = { ...sortOrder };
    newSortOrder[property] = event.target.value;
    setSortOrder(newSortOrder);
  };

  const sortedCarData = [...carData].sort((a, b) => {
    let result = 0;

    if (sortOrder.precio === 'low') {
      result = a.precio - b.precio;
    } else if (sortOrder.precio === 'high') {
      result = b.precio - a.precio;
    }

    if (sortOrder.tiempoCarga === 'low') {
      result = a.tiempoCarga - b.tiempoCarga;
    } else if (sortOrder.tiempoCarga === 'high') {
      result = b.tiempoCarga - a.tiempoCarga;
    }

    if (sortOrder.rango === 'low') {
      result = a.rango - b.rango;
    } else if (sortOrder.rango === 'high') {
      result = b.rango - a.rango;
    }

    return result;
  });

  return (
    <div className="bg-white">
      <Helmet title="Cars" className="bg-white">
        <CommonSection title="Lista de Carros" />

        <section className="bg-white">
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
                      onChange={(event) => handleSortChange(event, 'precio')}
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
                      <i className="ri-sort-asc"></i> Ordena por Rango
                    </span>

                    <Input
                      type="select"
                      onChange={(event) =>
                        handleSortChange(event, 'tiempoCarga')
                      }
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
                      <i className="ri-sort-asc"></i> Ordena por Capacidad de
                      Carga
                    </span>

                    <Input
                      type="select"
                      onChange={(event) => handleSortChange(event, 'rango')}
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
    </div>
  );
};

export default CarListing;
