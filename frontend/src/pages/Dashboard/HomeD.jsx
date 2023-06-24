import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import React from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import CardTicket from '../../components/Dashboard/Ticket/CardTicket';
// import { useSelector } from 'react-redux';
import SimpleTable from '../../components/Dashboard/UI/SimpleTable';


const Home = () => {
  // const usuario = useSelector(state => state.app.usuario);
  // const token = useSelector(state => state.app.token);
  // console.log('usuario ',usuario)
  // console.log('token ', token);

  const data = [
    {
      id: 1,
      descripcion: 'Mi computadora no prende',
      estatus: 'Pendiente',
      fecha: '28 octubre 2022',
    },
    // Agrega más objetos de datos según sea necesario
  ];
  return (
    <div>
      <div>
        <SimpleTable data={data} />
      </div>
    </div>
  );
};

export default Home;
