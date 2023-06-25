import React, { useEffect, useState } from 'react';
import { CirclePicker } from 'react-color';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Input } from 'reactstrap';
import Cookies from 'universal-cookie';
import { getCar, getColorsCar } from '../../assets/api/cars';
import {
  getPartsByCarInSucursal,
  getPartsInSucursal,
} from '../../assets/api/parts';
import { getCarsWithSucursal } from '../../assets/api/sucursal.api';
import {
  cancelWorkOrder,
  createWorkOrder,
  getStateWorkOrder,
} from '../../assets/api/workOrder';
import { codeToColorName, colorOptions } from '../../assets/color/colorUtils';
import { formatPrice } from '../../assets/general/formatPrice';
import { urls } from '../../assets/urls/urls';
import VirtualQuoteFormD from '../../components/Dashboard/UI/VirtualQuoteFormD';

const MyCar = () => {
  const cookies = new Cookies();
  const idSucursal = cookies.get('sucursal');
  const { id, color, idQ } = useParams();
  let colorN = '#' + color;
  const rol = cookies.get('rol');

  const [car, setCar] = useState({});
  const [parts, setParts] = useState([]);
  const [selectedParts, setSelectedParts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedPartID, setSelectedPartID] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [state, setState] = useState(false);

  const getState = async () => {
    try {
      const { data } = await getStateWorkOrder(idQ);
      setState(data.response);
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        console.log(data);
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
        console.log(data);
      }
    }
  };

  const getPartsData = async () => {
    try {
      const { data } = await getPartsByCarInSucursal(idSucursal, id);
      setParts(data);
      console.log(data);
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        console.log(data);
      }
    }
  };

  useEffect(() => {
    if (Object.keys(car).length !== 0) {
      getPartsData();
    }
  }, [car]);

  useEffect(() => {
    getCarData();
    getState();
  }, []);

  const handleSelectedPart = (e) => {
    const selectedPartID_ = e.target.value;
    console.log(selectedPartID_);
    setSelectedPartID(parseInt(selectedPartID_));
  };

  const handleDate = (e) => {
    const date_ = e.target.value;
    setDate(date_);
  };

  const handleTextArea = (e) => {
    const description_ = e.target.value;
    setDescription(description_);
  };

  const handleAddPart = () => {
    if (selectedPartID === '' || isNaN(selectedPartID)) {
      toast.error('Debes elegir un repuesto', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    const selectedPart = parts.find((part) => part.part.id === selectedPartID);
    setSelectedParts([...selectedParts, selectedPart]);
    setTotalPrice(totalPrice + selectedPart.part.price);

    // Eliminar el repuesto seleccionado de la lista 'parts'
    const updatedParts = parts.filter(
      (part) => part.part.id !== selectedPartID
    );
    setParts(updatedParts);

    setSelectedPartID('');
  };

  const handleCancel = async () => {
    try {
      await cancelWorkOrder(parseInt(idQ));
      toast.success('La orden ha sido cancelada', {
        position: toast.POSITION.TOP_RIGHT,
      });
      await getState();
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        console.log(data);
      }
    }
  };

  const handleSendWorkShop = async () => {
    if (date === '' || date === null) {
      toast.error('Debes elegir una fecha', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    const selectedDate = new Date(date);
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      toast.error('La fecha debe ser posterior a la fecha actual', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    try {
      const partIDs = selectedParts.map((part) => part.part.id);
      const body = {
        date: date,
        total_price: totalPrice,
        parts: partIDs,
        client_vehicle: idQ,
        description: description,
      };
      console.log(body);
      await createWorkOrder(body);
      toast.success('Orden realizada satisfactoriamente', {
        position: toast.POSITION.TOP_RIGHT,
      });
      setSelectedParts([]);
      getPartsData();
      await getState();
      // setParts(data);
      // console.log(data);
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        console.log(data);
      }
    }
  };

  return (
    <div className="">
      <div className="bg-secondary-100 p-8 rounded-xl mb-8">
        <div className="flex items-center">
          <div className="w-1/2 pr-4">
            <img src={car.image} alt="" className="w-[20rem] h-auto" />
          </div>
          <div className="w-1/2">
            <h2 className="text-4xl font-bold mb-3">
              {car.model}: {car.year}
            </h2>
            <h2 className="text-2xl font-medium mb-3">
              {codeToColorName(colorN)}
            </h2>
          </div>
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
          <h2 className="text-3xl font-bold mb-4">Llevar a mantenimiento</h2>
          {state && (
            <>
              {parts.length === 0 ? (
                selectedParts.length === 0 ? (
                  <p>
                    Lo siento, por el momento no tenemos repuestos de este carro
                  </p>
                ) : (
                  <p>Ya no hay mas repuestos</p>
                )
              ) : (
                <>
                  <p>
                    Elige los repuestos que deseas para llevar a mantenimiento
                  </p>
                  <div className="flex flex-col items-center md:flex-row gap-3 md:items-center mt-6">
                    <div className="flex-1 md:order-2 md:w-auto flex items-center">
                      <Input
                        type="select"
                        name="idCarSelected"
                        onChange={handleSelectedPart}
                        className=" py-2 px-4 outline-none rounded-lg bg-secondary-900 appearance-none"
                      >
                        <option value="">Elije uno</option>
                        {parts.map((part) => (
                          <option value={part.part.id} key={part.part.id}>
                            {part.part.name} - {formatPrice(part.part.price)}
                          </option>
                        ))}
                      </Input>
                      <button onClick={handleAddPart}>
                        <i className="ri-add-circle-fill ml-10 text-2xl text-primary"></i>
                      </button>
                    </div>
                  </div>
                </>
              )}
              {selectedParts.length !== 0 && (
                <>
                  <div className="bg-secondary-100 rounded-xl mt-20">
                    <h2 className="text-3xl font-bold mb-4">
                      Lista de repuestos para el mantenimiento
                    </h2>
                    <h2 className="text-[18px] font-bold mb-6 mt-4">
                      Precio:{' '}
                      <span className="text-primary">
                        {formatPrice(totalPrice)}
                      </span>{' '}
                    </h2>
                    <Input
                      type="date"
                      className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900 mb-4"
                      placeholder="Fecha"
                      name="date"
                      value={date}
                      onChange={handleDate}
                    />
                    <Input
                      type="textarea"
                      className="w-full py-2 px-4 outline-none mb-4 rounded-lg bg-secondary-900"
                      placeholder="Descripcion"
                      name="description"
                      value={description}
                      onChange={handleTextArea}
                    />
                    <table className="w-full ">
                      <tbody>
                        {selectedParts.map((part) => (
                          <tr
                            key={part.part.id}
                            className="hover:bg-secondary-200"
                          >
                            <td className="py-2">{part.part.name}</td>
                            <td className="py-2">
                              {formatPrice(part.part.price)}
                            </td>
                            <td className="py-2">
                              <button
                                onClick={() => {
                                  // Agregar la parte eliminada a la lista 'parts'
                                  setParts([...parts, part]);

                                  // Restar el precio de la parte eliminada de 'totalPrice'
                                  setTotalPrice(totalPrice - part.part.price);

                                  // Eliminar la parte seleccionada de la lista 'selectedParts'
                                  const updatedSelectedParts =
                                    selectedParts.filter(
                                      (selectedPart) =>
                                        selectedPart.part.id !== part.part.id
                                    );
                                  setSelectedParts(updatedSelectedParts);
                                }}
                              >
                                <i className="ri-close-circle-fill ml-10 text-2xl text-primary"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="flex justify-end mt-10">
                      <button
                        className="bg-terciary/70 text-black py-2 px-4 rounded-lg hover:bg-terciary transition-colors"
                        onClick={handleSendWorkShop}
                      >
                        Aceptar
                      </button>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
          {!state && (
            <>
              <p className="text-[18px]">
                El carro ya esta en mantenimiento, debe cancelar o esperar a que
                el Jefe de taller termine
              </p>
              {/* <div className="flex justify-end mt-10">
                <button
                  className="bg-quaternary/70 text-black py-2 px-4 rounded-lg hover:bg-quaternary transition-colors"
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
              </div> */}
            </>
          )}
        </div>
      </div>

      <div className="flex justify-start">
        <Link
          className="bg-primary/80 text-black py-2 px-4 rounded-lg hover:bg-primary transition-colors"
          to={urls.myCars}
        >
          <i className="ri-arrow-left-line"></i> Volver
        </Link>
      </div>
    </div>
  );
};

export default MyCar;
