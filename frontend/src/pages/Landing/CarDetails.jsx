import React, { useEffect, useState } from 'react';
import { CirclePicker } from 'react-color';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Col, Container, Row } from 'reactstrap';
import { getCar } from '../../assets/api/infoCars';
import {
  codeToColorName,
  colorNameToCode,
} from '../../assets/color/colorUtils';
import carData from '../../assets/data/carData';
import Helmet from '../../components/Landing/Helmet/Helmet';
import VirtualQuoteForm from '../../components/Landing/UI/VirtualQuoteForm';

const CarDetails = () => {
  const { slug } = useParams();

  const [car, setCar] = useState({});
  const colorOptions = ['#FF0000', '#0000FF', '#BF930D', '#000000', '#FFFF00'];
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [quoteFormColor, setQuoteFormColor] = useState(selectedColor);

  const handleColorChange = (color) => {
    setSelectedColor(color.hex.toUpperCase());
  };

  useEffect(() => {
    const getCarData = async () => {
      try {
        const { data } = await getCar(slug);
        setCar(data);
      } catch (error) {
        const { data } = error.response;
        // Mostrar mensaje de error al usuario o tomar alguna acción según corresponda
        console.log(data.error);
        toast.error(data.error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };
    getCarData();
    setCar(carData.find((item) => item.id.toString() === slug));
  }, []);

  return (
    <div className="bg-white">
      <Helmet title={car.carName}>
        <section>
          <Container>
            <Row>
              <Col col="lg-6">
                <img src={car.imgURL} alt="" className="w-100" />
              </Col>
              <Col col="lg-6">
                <div className="car__info">
                  <h2 className="section__title">
                    {car.modelo}: {car.year} -{' '}
                    {selectedColor
                      ? codeToColorName(selectedColor).charAt(0).toUpperCase() +
                        codeToColorName(selectedColor).slice(1)
                      : 'Sin definir'}
                  </h2>

                  <div className="d-flex items-center gap-5 mb-4 mt-3">
                    <h6 className="rent__price font-bold text-lg">
                      ${car.precio}
                    </h6>
                  </div>
                  <p className="section__description">{car.descripcion}</p>
                  <div>
                    <div className="my-4">
                      <div className="color__options">
                        <CirclePicker
                          colors={colorOptions}
                          color={selectedColor}
                          onChangeComplete={handleColorChange}
                          circleSize={30}
                          circleSpacing={10}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>

            <Row className="justify-center">
              <Col col="lg-6">
                <div className="car__info">
                  <div className="d-flex mt-3 justify-between">
                    <span className="d-flex items-center gap-1 section__description">
                      <h7 className="text-orange-500">Motor:</h7>
                      {car.motor}
                    </span>
                    <span className="d-flex items-center gap-1 section__description">
                      <h7 className="text-orange-500">Suspension:</h7>
                      {car.suspension}
                    </span>
                  </div>

                  <div className="d-flex mt-3 justify-between">
                    <span className="d-flex items-center gap-1 section__description">
                      <h7 className="text-orange-500">Carroceria:</h7>
                      {car.carroceria}
                    </span>

                    <span className="d-flex items-center gap-1 section__description">
                      <h7 className="text-orange-500">Puertas:</h7>
                      {car.puertas}
                    </span>

                    <span className="d-flex items-center gap-1 section__description">
                      <h7 className="text-orange-500">Potencia:</h7>
                      {car.potencia}
                    </span>
                  </div>

                  <div className="d-flex mt-3 justify-between">
                    <span className="d-flex items-center gap-1 section__description">
                      <h7 className="text-orange-500">Rango:</h7>
                      {car.rango}
                    </span>

                    <span className="d-flex items-center gap-1 section__description">
                      <h7 className="text-orange-500">Capacidad de bateria:</h7>
                      {car.capacidad_bateria}
                    </span>

                    <span className="d-flex items-center gap-1 section__description">
                      <h7 className="text-orange-500">Tiempo de Carga:</h7>
                      {car.tiempo_carga}
                    </span>
                  </div>

                  <div className="d-flex mt-3 justify-between">
                    <span className="d-flex items-center gap-1 section__description">
                      <h7 className="text-orange-500">Velocidad Maxima:</h7>
                      {car.velocidad_maxima}
                    </span>

                    <span className="d-flex items-center gap-1 section__description">
                      <h7 className="text-orange-500">Frenos:</h7>
                      {car.frenos}
                    </span>
                  </div>
                </div>
              </Col>
            </Row>

            <Row>
              <Col className="mt-5">
                <div className="booking-info mt-5">
                  <h4 className="mb-4 font-bold">Cotice su vehiculo ahora</h4>
                  <VirtualQuoteForm slug={slug} selectedColor={selectedColor} />
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Helmet>
    </div>
  );
};

export default CarDetails;
