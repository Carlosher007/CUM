import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import React, { useEffect, useState } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import CardTicket from '../../components/Dashboard/Ticket/CardTicket';
// import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import { getCarsSoldBySucursal } from '../../assets/api/cars';
import SimpleTable from '../../components/Dashboard/UI/SimpleTable';

const Home = () => {
  const cookies = new Cookies();
  const nombre = cookies.get("full_name")
  const rol = cookies.get('rol');
  const sucursal = cookies.get('sucursal');
  const [cars,setCars] = useState([])

  const getCarsSold = async () => {
    console.log(sucursal)
    try {
      const { data } = await getCarsSoldBySucursal(parseInt(sucursal));
      console.log(data)
      setCars(data)
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        console.log(data);
      }
    }
  }

  useEffect(() => {
    getCarsSold()
  },[])

  return (
    <div>
      <div>
        <h2 className="text-3xl font-bold mb-4">Bienvenido al dashboard <span className="text-primary">{nombre}</span> </h2>
      </div>
      <h2 className='text-2xl font-bold mt-10 mb-5'>Últimas ventas realizadas</h2>
      {rol!=='Cliente' && cars.length!==0  &&(
        <>
        <SimpleTable data={cars}/>
        </>
      )}
    </div>
  );
};

export default Home;
