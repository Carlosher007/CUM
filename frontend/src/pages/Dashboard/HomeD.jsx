import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import React, { useEffect, useState } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import CardTicket from '../../components/Dashboard/Ticket/CardTicket';
// import { useSelector } from 'react-redux';
import { Chart } from 'react-google-charts';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import {
  getCarsSoldByClient,
  getCarsSoldBySucursal,
} from '../../assets/api/cars';
import { getQuotesBySucursal } from '../../assets/api/quote';
import MyCarsTable from '../../components/Dashboard/UI/MyCarsTable';
import SimpleTable from '../../components/Dashboard/UI/SimpleTable';
import '../../index.css';

const Home = () => {
  const cookies = new Cookies();
  const nombre = cookies.get('full_name');
  const rol = cookies.get('rol');
  const id = cookies.get('id');
  const sucursal = cookies.get('sucursal');
  const [cars, setCars] = useState([]);
  const [cars2, setCars2] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [carsSold, setCarsSold] = useState([]);

  const getAllQuotes = async () => {
    try {
      const { data } = await getQuotesBySucursal(sucursal, 'ALL');
      console.log(data);
      setQuotes(data);
      const soldCarsList = data
        .filter((obj) => obj.state === 'FINISHED')
        .map((obj) => obj.quotation.vehicle_sucursal);
      console.log(soldCarsList);
      setCarsSold(soldCarsList);
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        if (Array.isArray(data)) {
          data.forEach((errorMessage) => {
            toast.error(errorMessage, {
              position: toast.POSITION.TOP_RIGHT,
            });
          });
        } else {
          if (data.error) {
            toast.error(data.error, {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        }
      }
    }
  };

  const getCarsSold = async () => {
    try {
      const { data } = await getCarsSoldBySucursal(parseInt(sucursal));
      console.log(data);
      setCars(data.slice(0, 4));
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        if (Array.isArray(data)) {
          data.forEach((errorMessage) => {
            toast.error(errorMessage, {
              position: toast.POSITION.TOP_RIGHT,
            });
          });
        } else {
          if (data.error) {
            toast.error(data.error, {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        }
      }
    }
  };

  const getCarsClient = async () => {
    try {
      const { data } = await getCarsSoldByClient(parseInt(id));
      setCars2(data.slice(0, 3));
    } catch (error) {
      const { data } = error.response;
      if (Array.isArray(data)) {
        data.forEach((errorMessage) => {
          toast.error(errorMessage, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
      } else {
        if (data.error) {
          toast.error(data.error, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    }
  };

  useEffect(() => {
    if (rol === 'Gerente' || rol === 'Vendedor') {
      getCarsSold();
      getAllQuotes();
    } else if (rol === 'Cliente') {
      getCarsClient();
    }
  }, []);

  const getQuotesStatusCount = () => {
    const statusCount = {
      CANCELLED: 0,
      ACCEPTED: 0,
      FINISHED: 0,
      IN_PROGRESS: 0,
    };

    quotes.forEach((quote) => {
      if (quote.state === 'CANCELLED') {
        statusCount.CANCELLED++;
      } else if (quote.state === 'ACCEPTED') {
        statusCount.ACCEPTED++;
      } else if (quote.state === 'FINISHED') {
        statusCount.FINISHED++;
      } else if (quote.state === 'IN_PROGRESS') {
        statusCount.IN_PROGRESS++;
      }
    });

    return Object.entries(statusCount);
  };

  const getCarsSoldCount = () => {
    const carsSoldCount = {};

    carsSold.forEach((car) => {
      const vehicleId = car.vehicle;

      if (vehicleId in carsSoldCount) {
        carsSoldCount[vehicleId]++;
      } else {
        carsSoldCount[vehicleId] = 1;
      }
    });

    return Object.entries(carsSoldCount).map(([vehicleId, count]) => [
      `ID del carro ${vehicleId}`,
      count,
    ]);
  };

  const getTopSellers = (count) => {
    const sellersCount = {};

    const finishedQuotes = quotes.filter((obj) => obj.state === 'FINISHED');

    finishedQuotes.forEach((quote) => {
      const { seller } = quote;

      if (seller in sellersCount) {
        sellersCount[seller]++;
      } else {
        sellersCount[seller] = 1;
      }
    });

    const sortedSellers = Object.entries(sellersCount).sort(
      (a, b) => b[1] - a[1]
    );

    return sortedSellers
      .slice(0, count)
      .map(([seller, count]) => [`Vendedor ${seller}`, count]);
  };

  const getTopClients = (count) => {
    const clientsCount = {};

    quotes.forEach((quote) => {
      const { quotation, state } = quote;
      const client = quotation.client

      if (state === 'FINISHED') {
        if (client in clientsCount) {
          clientsCount[client]++;
        } else {
          clientsCount[client] = 1;
        }
      }
    });

    const sortedClients = Object.entries(clientsCount).sort(
      (a, b) => b[1] - a[1]
    );

    return sortedClients
      .slice(0, count)
      .map(([client, count]) => [`Cliente ${client}`, count]);
  };

  return (
    <div>
      <div>
        <h2 className="text-3xl font-bold mb-4">
          Bienvenido al dashboard <span className="text-primary">{nombre}</span>{' '}
        </h2>
      </div>
      {(rol === 'Vendedor' || rol === 'Gerente') && cars.length !== 0 && (
        <>
          <h2 className="text-2xl font-bold mt-10 mb-5">
            Últimas ventas realizadas
          </h2>
          <SimpleTable data={cars} />
        </>
      )}
      {(rol === 'Vendedor' || rol === 'Gerente') && cars.length === 0 && (
        <>
          <h2 className="text-2xl mt-10 mb-5">
            No se han realizado ventas hasta el momento
          </h2>
        </>
      )}
      {rol === 'Cliente' && cars.length !== 0 && (
        <>
          <h2 className="text-2xl font-bold mt-10 mb-5">
            Últimas adquisiciones
          </h2>
          <MyCarsTable data={cars2} />
        </>
      )}
      {rol === 'Cliente' && cars.length === 0 && (
        <>
          <h2 className="text-xl mt-10 mb-5">
            Aún no tienes ningúna adquisición
          </h2>
        </>
      )}
      {rol === 'Gerente' && cars.length === 0 && (
        <>
          <h2 className="text-2xl font-bold mt-10 mb-5">Gráficos</h2>
          <div class="flex flex-wrap">
            <div class="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mb-8">
              <h2 class="text-xl font-bold mt-10 mb-5">
                Proporción de cotizaciones por estado
              </h2>
              <Chart
                width={'500px'}
                height={'300px'}
                chartType="PieChart"
                loader={<div>Cargando gráfico...</div>}
                data={[['Estado', 'Cantidad'], ...getQuotesStatusCount()]}
                className="text-black font-bold bg-secondary-300 rounded-lg"
                options={{
                  title: 'Proporción de cotizaciones por estado',
                  is3D: true,
                  backgroundColor: 'transparent',
                }}
                rootProps={{ 'data-testid': '1' }}
              />
            </div>
            <div class="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mb-8">
              <h2 class="text-xl font-bold mt-10 mb-5">Carros vendidos</h2>
              <Chart
                width={'500px'}
                height={'300px'}
                chartType="PieChart"
                loader={<div>Cargando gráfico...</div>}
                data={[['ID del carro', 'Cantidad'], ...getCarsSoldCount()]}
                className="text-black font-bold bg-secondary-300 rounded-lg"
                options={{
                  title: 'Carros vendidos por ID',
                  is3D: true,
                  backgroundColor: 'transparent',
                }}
              />
            </div>
            <div class="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mb-8">
              <h2 class="text-xl font-bold mt-10 mb-5">
                Vendedores mejores ventas
              </h2>
              <Chart
                width={'500px'}
                height={'300px'}
                chartType="BarChart"
                loader={<div>Cargando gráfico...</div>}
                data={[['Vendedor', 'Cantidad'], ...getTopSellers(3)]}
                className="text-black font-bold bg-secondary-300 rounded-lg"
                options={{
                  title: 'Vendedores con más cotizaciones',
                  hAxis: {
                    title: 'Cantidad',
                    minValue: 0,
                  },
                  vAxis: {
                    title: 'Vendedor',
                  },
                  legend: 'none',
                  backgroundColor: 'transparent',
                }}
              />
            </div>
            <div class="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mb-8">
              <h2 class="text-xl font-bold mt-10 mb-5">
                Clientes con mejores ventas
              </h2>
              <Chart
                width={'500px'}
                height={'300px'}
                chartType="BarChart"
                loader={<div>Cargando gráfico...</div>}
                data={[['Cliente', 'Cantidad'], ...getTopClients(3)]}
                className="text-black font-bold bg-secondary-300 rounded-lg"
                options={{
                  title: 'Clientes con más cotizaciones en estado "FINISHED"',
                  hAxis: {
                    title: 'Cantidad',
                    minValue: 0,
                  },
                  vAxis: {
                    title: 'Cliente',
                  },
                  legend: 'none',
                  backgroundColor: 'transparent',
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
