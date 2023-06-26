import React, { useEffect, useState } from 'react';
import { CirclePicker } from 'react-color';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Col, Container, Row } from 'reactstrap';
import { getCar } from '../../assets/api/cars';
import { getCarsWithSucursal } from '../../assets/api/sucursal.api';
import { codeToColorName, colorOptions } from '../../assets/color/colorUtils';
import Helmet from '../../components/Landing/Helmet/Helmet';
import VirtualQuoteForm from '../../components/Landing/UI/VirtualQuoteForm';

const CarDetails = () => {
  const { id } = useParams();

  const [car, setCar] = useState({});
  const [avalaibleSucursals, setAvalaibleSucursals] = useState([]);
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState('');

  const handleColorChange = (color) => {
    setSelectedColor(color.hex.toUpperCase());
  };

  const getAvailableColors = async () => {
    try {
      const { data } = await getCarsWithSucursal();
      const allColors = [
        ...new Set(
          data
            .filter((item) => item.vehicle === parseInt(id))
            .map((item) => item.color)
        ),
      ];
      setColors(allColors);
      setSelectedColor(allColors[0]);
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        toast.error(data.error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  const getAvailableSucursals = async () => {
    try {
      const { data } = await getCarsWithSucursal();
      const allSucursals = [
        ...new Set(
          data
            .filter(
              (item) =>
                item.vehicle === parseInt(id) && item.color === selectedColor
            )
            .map((item) => item.sucursal)
        ),
      ];
      setAvalaibleSucursals(allSucursals);
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        toast.error(data.error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  const getCarData = async () => {
    try {
      const { data } = await getCar(id);
      setCar(data);
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        toast.error(data.error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  useEffect(() => {
    getCarData();
    getAvailableColors();
  }, []);

  useEffect(() => {
    if (selectedColor !== '') {
      getAvailableSucursals();
    }
  }, [selectedColor]);

  return (
    <div className="bg-white">
      <Helmet>
        <section>
          <Container>
            <Row>
              <Col col="lg-6">
                <img src={car.image} alt="" className="w-100" />
              </Col>
              <Col col="lg-6">
                <div className="car__info">
                  <h2 className="section__title">
                    {car.model}: {car.year}
                  </h2>
                  <h2 className="mt-3">
                    {selectedColor
                      ? codeToColorName(selectedColor).charAt(0).toUpperCase() +
                        codeToColorName(selectedColor).slice(1)
                      : 'Sin definir'}
                  </h2>

                  <div className="d-flex items-center gap-5 mb-4 mt-3">
                    <h6 className="rent__price font-bold text-lg">
                      ${car.price}
                    </h6>
                  </div>
                  <div>
                    <div className="my-4">
                      <div className="color__options">
                        <CirclePicker
                          colors={colors}
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

            <Row>
              {/* Description */}
              <div className="mt-4">
                <p className="section__description">{car.description}</p>
              </div>
            </Row>

            <Row>
              <div className="bg-gray-100 w-full max-w-2xl p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Detalles del carro</h2>
                <table className="w-full text-black">
                  <tbody>
                    <tr className="hover:bg-gray-200">
                      <td className="font-bold pr-4 py-2">Modelo:</td>
                      <td className="py-2">{car.model}</td>
                    </tr>
                    <tr className="hover:bg-gray-200">
                      <td className="font-bold pr-4 py-2">Año:</td>
                      <td className="py-2">{car.year}</td>
                    </tr>
                    <tr className="hover:bg-gray-200">
                      <td className="font-bold pr-4 py-2">Marca:</td>
                      <td className="py-2">{car.brand}</td>
                    </tr>
                    <tr className="hover:bg-gray-200">
                      <td className="font-bold pr-4 py-2">Carrocería:</td>
                      <td className="py-2">{car.bodywork}</td>
                    </tr>
                    <tr className="hover:bg-gray-200">
                      <td className="font-bold pr-4 py-2">Puertas:</td>
                      <td className="py-2">{car.doors}</td>
                    </tr>
                    <tr className="hover:bg-gray-200">
                      <td className="font-bold pr-4 py-2">Motor:</td>
                      <td className="py-2">{car.motor}</td>
                    </tr>
                    <tr className="hover:bg-gray-200">
                      <td className="font-bold pr-4 py-2">Potencia:</td>
                      <td className="py-2">{car.potency}</td>
                    </tr>
                    <tr className="hover:bg-gray-200">
                      <td className="font-bold pr-4 py-2">Autonomía:</td>
                      <td className="py-2">{car.range}</td>
                    </tr>
                    <tr className="hover:bg-gray-200">
                      <td className="font-bold pr-4 py-2">
                        Capacidad de la batería:
                      </td>
                      <td className="py-2">{car.battery_capacity}</td>
                    </tr>
                    <tr className="hover:bg-gray-200">
                      <td className="font-bold pr-4 py-2">Tiempo de carga:</td>
                      <td className="py-2">{car.charging_time}</td>
                    </tr>
                    <tr className="hover:bg-gray-200">
                      <td className="font-bold pr-4 py-2">Velocidad maxima:</td>
                      <td className="py-2">{car.top_speed}</td>
                    </tr>
                    <tr className="hover:bg-gray-200">
                      <td className="font-bold pr-4 py-2">Frenos:</td>
                      <td className="py-2">{car.brakes}</td>
                    </tr>
                    <tr className="hover:bg-gray-200">
                      <td className="font-bold pr-4 py-2">Suspension:</td>
                      <td className="py-2">{car.suspension}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Row>

            <Row>
              <div className="bg-gray-100 w-full max-w-2xl rounded-lg shadow-md mt-5">
                <div className="booking-info mt-5">
                  <h4 className=" font-bold">Cotice su vehiculo ahora</h4>
                  <VirtualQuoteForm
                    slug={id}
                    selectedColor={selectedColor}
                    price={car.price}
                    sucursalsAvalaible={avalaibleSucursals}
                  />
                </div>
              </div>
            </Row>
          </Container>
        </section>
      </Helmet>
    </div>
  );
};

export default CarDetails;
