import React, { useEffect, useState } from 'react';
import { CirclePicker } from 'react-color';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import { getCar, getColorsCar } from '../../assets/api/cars';
import { codeToColorName, colorOptions } from '../../assets/color/colorUtils';
import { formatPrice } from '../../assets/general/formatPrice';
import VirtualQuoteFormD from '../../components/Dashboard/UI/VirtualQuoteFormD';

const CarDetailsD = () => {
  const cookies = new Cookies();
  const idSucursal = cookies.get('sucursal');
  const { id } = useParams();

  const [car, setCar] = useState({});
  const [selectedColor, setSelectedColor] = useState('');
  const [availableColors, setAvailableColors] = useState([]);

  const handleColorChange = (color) => {
    setSelectedColor(color.hex.toUpperCase());
  };

  useEffect(() => {
    const getCarData = async () => {
      try {
        const { data } = await getCar(id);
        setCar(data);
      } catch (error) {
        if (error.response) {
          const { data } = error.response;
          // Mostrar mensaje de error al usuario o tomar alguna acción según corresponda
          toast.error(data.error, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    };
    getCarData();

    const getAvailableColors = async () => {
      try {
        console.log(idSucursal+" "+id)
        const { data } = await getColorsCar(idSucursal, id);
        const colors = data.map((obj) => obj.color);
        setAvailableColors(colors);
        setSelectedColor(colors[0])
      } catch (error) {
        if (error.response) {
          const { data } = error.response;
          // Mostrar mensaje de error al usuario o tomar alguna acción según corresponda
          toast.error(data.error, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    };
    getAvailableColors();
  }, []);

  return (
    <div className="">
      <div className="bg-secondary-100 p-8 rounded-xl mb-8">
        <div className="flex items-start">
          <div className="w-1/2 pr-4">
            <img src={car.image} alt="" className="w-full h-auto" />
          </div>
          <div className="w-1/2">
            <h2 className="text-4xl font-bold mb-3">
              {car.model}: {car.year}
            </h2>
            <h2 className="text-2xl font-medium mb-3">
              {selectedColor
                ? codeToColorName(selectedColor).charAt(0).toUpperCase() +
                  codeToColorName(selectedColor).slice(1)
                : 'Sin definir'}
            </h2>
            <h6 className="font-bold text-lg mb-5">{formatPrice(car.price)}</h6>
            <div className="flex items-center gap-5 ">
              <div className="color__options">
                <CirclePicker
                  colors={availableColors}
                  color={selectedColor}
                  onChangeComplete={handleColorChange}
                  circleSize={30}
                  circleSpacing={10}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 text-center">
          <p className="text-white">{car.description}</p>
        </div>
      </div>

      <div>
        <div className="bg-secondary-100 p-8 rounded-xl mb-8">
          <h2 className="text-3xl font-bold mb-4">Detalles del carro</h2>
          <table className="w-full ">
            <tbody>
              <tr className="hover:bg-secondary-200">
                <td className="font-bold pr-4 py-2">Modelo:</td>
                <td className="py-2">{car.model}</td>
              </tr>
              <tr className="hover:bg-secondary-200">
                <td className="font-bold pr-4 py-2">Año:</td>
                <td className="py-2">{car.year}</td>
              </tr>
              <tr className="hover:bg-secondary-200">
                <td className="font-bold pr-4 py-2">Marca:</td>
                <td className="py-2">{car.brand}</td>
              </tr>
              <tr className="hover:bg-secondary-200">
                <td className="font-bold pr-4 py-2">Carrocería:</td>
                <td className="py-2">{car.bodywork}</td>
              </tr>
              <tr className="hover:bg-secondary-200">
                <td className="font-bold pr-4 py-2">Puertas:</td>
                <td className="py-2">{car.doors}</td>
              </tr>
              <tr className="hover:bg-secondary-200">
                <td className="font-bold pr-4 py-2">Motor:</td>
                <td className="py-2">{car.motor}</td>
              </tr>
              <tr className="hover:bg-secondary-200">
                <td className="font-bold pr-4 py-2">Potencia:</td>
                <td className="py-2">{car.potency}</td>
              </tr>
              <tr className="hover:bg-secondary-200">
                <td className="font-bold pr-4 py-2">Autonomía:</td>
                <td className="py-2">{car.range}</td>
              </tr>
              <tr className="hover:bg-secondary-200">
                <td className="font-bold pr-4 py-2">
                  Capacidad de la batería:
                </td>
                <td className="py-2">{car.battery_capacity}</td>
              </tr>
              <tr className="hover:bg-secondary-200">
                <td className="font-bold pr-4 py-2">Tiempo de carga:</td>
                <td className="py-2">{car.charging_time}</td>
              </tr>
              <tr className="hover:bg-secondary-200">
                <td className="font-bold pr-4 py-2">Velocidad maxima:</td>
                <td className="py-2">{car.top_speed}</td>
              </tr>
              <tr className="hover:bg-secondary-200">
                <td className="font-bold pr-4 py-2">Frenos:</td>
                <td className="py-2">{car.brakes}</td>
              </tr>
              <tr className="hover:bg-secondary-200">
                <td className="font-bold pr-4 py-2">Suspension:</td>
                <td className="py-2">{car.suspension}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <div className="bg-secondary-100 p-8 rounded-xl mb-8">
          <h4 className="font-bold text-3xl ">Cotice su vehiculo ahora</h4>
          <VirtualQuoteFormD
            slug={id}
            selectedColor={selectedColor}
            price={car.price}
          />
        </div>
      </div>
    </div>
  );
};

export default CarDetailsD;
