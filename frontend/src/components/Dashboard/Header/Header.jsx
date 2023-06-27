import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { all } from 'axios';
import React from 'react';
import {
  RiArrowDownSLine,
  RiChat3Line,
  RiLogoutCircleRLine,
  RiNotification3Line,
  RiSettings3Line,
  RiThumbUpLine,
} from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import { logout } from '../../../assets/api/login.api';
import notificationsData from '../../../assets/data/notificationsData';
import { urls } from '../../../assets/urls/urls';
import NotificationItem from '../UI/NotificationItem';

const Header = () => {
  const cookies = new Cookies();
  const full_name = cookies.get('full_name');
  const email = cookies.get('email');
  const rol = cookies.get('rol');
  const token = cookies.get('token');
  const navigate = useNavigate();


  const deleteCookies = () => {
    Object.keys(cookies.getAll()).forEach((cookieName) => {
      cookies.remove(cookieName, { path: '/' });
    });
  };

  const handleLogout = async () => {
    try {
      const { data } = await logout(token);
      console.log(data);
      await new Promise((resolve) => {
        deleteCookies();
        resolve();
      });

      navigate(urls.home);
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        console.log(data);
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

  function convertToDate(dateString) {
    const parts = dateString.split('/');
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    return new Date(formattedDate);
  }

  return (
    <header className="h-[7vh] md:h-[10vh] border-b border-secondary-100 p-8 flex items-center justify-end">
      <nav className="flex items-center gap-2">
        <Menu
          menuButton={
            <MenuButton className="flex items-center gap-x-2 hover:bg-secondary-100 p-2 rounded-lg transition-colors">
              <img
                src="https://img.freepik.com/foto-gratis/feliz-optimista-guapo-gerente-ventas-latina-apuntando-lado-mirando-camara_1262-12679.jpg"
                className="w-6 h-6 object-cover rounded-full"
              />
              <span>
                {full_name}: <strong>{rol} </strong>{' '}
              </span>
              <RiArrowDownSLine />
            </MenuButton>
          }
          align="end"
          arrow
          arrowClassName="bg-secondary-100"
          transition
          menuClassName="bg-secondary-100 p-4"
        >
          <MenuItem className="p-0 hover:bg-transparent">
            <Link
              to="/perfil"
              className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 py-2 px-6 flex-1"
            >
              <img
                src="https://img.freepik.com/foto-gratis/feliz-optimista-guapo-gerente-ventas-latina-apuntando-lado-mirando-camara_1262-12679.jpg"
                className="w-8 h-8 object-cover rounded-full"
              />
              <div className="flex flex-col text-sm">
                <span className="text-sm">{full_name}</span>
                <span className="text-xs text-gray-500">{email}</span>
              </div>
            </Link>
          </MenuItem>
          <hr className="my-4 border-gray-500" />
          <MenuItem className="p-0 hover:bg-transparent">
            <Link
              to={urls.profile}
              className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 py-2 px-6 flex-1"
            >
              <RiSettings3Line /> Mi Perfil
            </Link>
          </MenuItem>
          <MenuItem className="p-0 hover:bg-transparent">
            <Link
              to={urls.home}
              className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 py-2 px-6 flex-1"
              onClick={() => {
                handleLogout();
              }}
            >
              <RiLogoutCircleRLine /> Cerrar sesión
            </Link>
          </MenuItem>
        </Menu>
      </nav>
    </header>
  );
};

export default Header;
