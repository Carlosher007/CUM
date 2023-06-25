import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteUser } from '../../../assets/api/user.api';
import { urls } from '../../../assets/urls/urls';

const UsersTable = ({ data, updateUserList }) => {
  function convertToDate(dateString) {
    const parts = dateString.split('/');
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    return new Date(formattedDate);
  }

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      // Aquí puedes actualizar la lista de usuarios llamando a la función que obtiene los usuarios nuevamente
      toast.success('Usuario eliminado con exito', {
        position: toast.POSITION.TOP_RIGHT,
      });
      updateUserList();
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        toast.error(data, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  const renderStatus = (rol) => {
    if (rol === 'Gerente') {
      return (
        <span className="py-1 px-2 bg-yellow-500/10 text-yellow-500 rounded-lg">
          {rol}
        </span>
      );
    } else if (rol === 'Cliente') {
      return (
        <span className="py-1 px-2 bg-blue-500/10 text-blue-500 rounded-lg">
          {rol}
        </span>
      );
    } else if (rol === 'JefeTaller') {
      return (
        <span className="py-1 px-2 bg-red-500/10 text-red-500 rounded-lg">
          {rol}
        </span>
      );
    } else {
      return (
        <span className="py-1 px-2 bg-purple-500/10 text-purple-500 rounded-lg">
          {rol}
        </span>
      );
    }
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const truncateEmail = (email) => {
    if (typeof windowWidth === 'undefined') {
      return email; // Retornar el email sin cambios si windowWidth es undefined
    }
    if (windowWidth >= 768 && windowWidth <= 1040) {
      if (email.length <= 9) {
        return email;
      } else {
        return email.substring(0, 10) + '...';
      }
    } else if (windowWidth >= 1040) {
      if (email.length <= 16) {
        return email;
      } else {
        return email.substring(0, 16) + '...';
      }
    }
    return email;
  };

  return (
    <div>
      <div className="bg-secondary-100 p-6 rounded-xl">
        <div className="hidden md:grid grid-cols-1 md:grid-cols-6 mb-2 p-4">
          <h5>Id</h5>
          <h5>Nombre</h5>
          <h5>Rol</h5>
          <h5>Email</h5>
          <h5>Celular</h5>
          <h5>Direccion</h5>
        </div>
        {data.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-1 md:grid-cols-6 items-center mb-4 bg-secondary-900 p-4 rounded-xl"
          >
            <div>
              <h5 className="md:hidden mt-6 text-white font-bold mb-2">Id</h5>
              {/* <span>{convertToDate(item.last_login)}</span> */}
              <span>{item.id}</span>
            </div>
            <div>
              <h5 className="md:hidden text-white font-bold mb-2">Nombre</h5>
              <span>{item.full_name}</span>
            </div>
            <div>
              <h5 className="md:hidden mt-6 text-white font-bold mb-2">Rol</h5>
              {renderStatus(item.rol)}
            </div>
            <div>
              <h5 className="md:hidden mt-6 text-white font-bold mb-2">
                Email
              </h5>
              <p>{truncateEmail(item.email)}</p>
            </div>
            <div>
              <h5 className="md:hidden mt-6 text-white font-bold mb-2">
                Celular
              </h5>
              <span>{item.cellphone}</span>
            </div>
            <div>
              <div>
                <h5 className="md:hidden mt-6 text-white font-bold mb-2">
                  Acciones
                </h5>
                <Menu
                  menuButton={
                    <MenuButton className="flex items-center gap-x-2 bg-secondary-100 p-2 rounded-lg transition-colors">
                      Acciones
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
                      to={`/dashboard/edit-user/${item.id}`}
                      className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 p-2 flex-1"
                    >
                      Editar usaurio
                    </Link>
                  </MenuItem>
                  <MenuItem className="p-0 hover:bg-transparent">
                    <span
                      className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 p-2 flex-1"
                      onClick={() => handleDeleteUser(item.id)}
                    >
                      Eliminar
                    </span>
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersTable;
