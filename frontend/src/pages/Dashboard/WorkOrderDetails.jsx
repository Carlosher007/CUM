import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import { getCar } from '../../assets/api/cars';
import { getPart } from '../../assets/api/parts';
import { getQuote } from '../../assets/api/quote';
import {
  cancelWorkOrder,
  finishWorkOrder,
  getWorkOrder,
} from '../../assets/api/workOrder';
import { formatPrice } from '../../assets/general/formatPrice';
import { renderWOState } from '../../assets/general/workOrders';
import { urls } from '../../assets/urls/urls';

const WorkOrderDetails = () => {
  const cookies = new Cookies();
  const { id } = useParams();
  const rol = cookies.get('rol');
  const [workOrder, setWorkOrder] = useState({});
  const [quote, setQuote] = useState({});
  const [parts, setParts] = useState(new Set());
  const [car, setCar] = useState({});
  const [isDone, setIsDone] = useState(false);

  const getWorkOrderData = async () => {
    try {
      const { data } = await getWorkOrder(id);
      setWorkOrder(data);
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        console.log(data);
      }
    }
  };

  const getQuoteData = async () => {
    try {
      const { data } = await getQuote(workOrder.client_vehicle);
      setQuote(data);
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        console.log(data);
      }
    }
  };

  const getPartData = async (partId) => {
    try {
      const { data } = await getPart(partId);
      setParts((prevParts) => new Set([...prevParts, data]));
      setIsDone(true);
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        console.log(data);
      }
    }
  };

  const getCarData = async () => {
    try {
      const { data } = await getCar(quote.quotation.vehicle_sucursal.vehicle);
      setCar(data);
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        console.log(data);
      }
    }
  };

  useEffect(() => {
    getWorkOrderData();
  }, []);

  useEffect(() => {
    if (!isDone) {
      if (Object.keys(workOrder).length !== 0) {
        getQuoteData();
        workOrder.parts.forEach((partId) => {
          // Consultar la información de cada parte
          getPartData(partId);
        });
      }
    }
  }, [workOrder]);

  useEffect(() => {
    if (Object.keys(quote).length !== 0) {
      getCarData();
    }
  }, [quote]);

  const handleCancel = async () => {
    try {
      await cancelWorkOrder(id);
      toast.success('La orden ha sido cancelada', {
        position: toast.POSITION.TOP_RIGHT,
      });
      await getWorkOrderData();
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        console.log(data);
      }
    }
  };

  const handleFinish = async () => {
    try {
      await finishWorkOrder(id);
      toast.success('La orden ha sido finalizada', {
        position: toast.POSITION.TOP_RIGHT,
      });
      await getWorkOrderData();
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        console.log(data);
      }
    }
  };

  return (
    <div>
      <div className="bg-secondary-100 p-8 rounded-xl mb-8">
        <h2 className="text-3xl font-bold mb-4">
          Detalles de la Orden de trabjo
        </h2>
        <h2 className="text-xl ">
          Estado:{' '}
          <span className="text-primary">
            {' '}
            {renderWOState(workOrder.state)}{' '}
          </span>
        </h2>

        <h2 className="text-xl mt-5">
          Fecha para la orden de labor:{' '}
          <span className="text-right"> {workOrder.date} </span>
        </h2>
        <h2 className="text-xl mt-5">
          Precio:{' '}
          <span className="text-right">
            {' '}
            {formatPrice(workOrder.total_price)}{' '}
          </span>
        </h2>
        {workOrder.description !== '' && workOrder.description !== null && (
          <h2 className="text-xl mt-5">
            Descripción:
            <span className="text-right"> {workOrder.description} </span>
          </h2>
        )}

        {workOrder.state === 'SENT' && (
          <div className="flex justify-center space-x-4 mt-10">
            <button
              type="button"
              className="bg-quaternary/80 text-black py-2 px-4 rounded-lg hover:bg-quaternary transition-colors"
              onClick={() => handleCancel()}
            >
              Cancelar
            </button>
            {rol !== 'Cliente' && (
              <button
                type="button"
                className="bg-terciary/80 text-black py-2 px-4 rounded-lg hover:bg-terciary transition-colors"
                onClick={() => handleFinish()}
              >
                Finalizar
              </button>
            )}
          </div>
        )}
      </div>

      <div className="bg-secondary-100 p-8 rounded-xl mb-8">
        <h2 className="text-3xl font-bold mb-4">Repuestos a utilizar</h2>
        {parts.size !== 0 ? (
          <>
            <table className="w-full ">
              <tbody>
                {[...parts].map((part, index) => (
                  <tr key={index} className="hover:bg-secondary-200">
                    <td className="font-bold pr-4 py-2">Nombre:</td>
                    <td className="py-2">{part.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <p>No se especificaron los repuestos</p>
        )}
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
    </div>
  );
};

export default WorkOrderDetails;
