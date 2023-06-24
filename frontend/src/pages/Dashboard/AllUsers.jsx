import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import { getSucursal, getUsersBySucursal } from '../../assets/api/sucursal.api';
import { urls } from '../../assets/urls/urls';
import UsersTable from '../../components/Dashboard/UI/UsersTable';

const AllUsers = () => {
  const cookies = new Cookies();
  const idSucursal = cookies.get('sucursal');
  const [users, setUsers] = useState([]);
  const [citySucursal, setCitySucursal] = useState();

  const updateUserList = async () => {
    try {
      const { data } = await getUsersBySucursal(idSucursal);
      setUsers(data);
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
    const getUsersData = async () => {
      try {
        const { data } = await getUsersBySucursal(idSucursal);
        setUsers(data);
      } catch (error) {
        if (error.response) {
          const { data } = error.response;
          let errorMessage = '';

          // Construir el mensaje de error con los detalles del error
          Object.keys(data).forEach((key) => {
            errorMessage += `${key}: ${data[key][0]}\n`;
          });

          // Mostrar mensaje de error al usuario utilizando toast
          toast.error(errorMessage, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    };
    getUsersData();

    const getSucursalData = async () => {
      try {
        const { data } = await getSucursal(idSucursal);
        setCitySucursal(data.city);
      } catch (error) {
        if (error.response) {
          const { data } = error.response;
          let errorMessage = '';

          // Construir el mensaje de error con los detalles del error
          Object.keys(data).forEach((key) => {
            errorMessage += `${key}: ${data[key][0]}\n`;
          });

          // Mostrar mensaje de error al usuario utilizando toast
          toast.error(errorMessage, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    };
    getSucursalData();
  }, []);

  return (
    <div>
      <div className="text-center font-bold text-3xl bg-secondary-100 p-8 rounded-xl mb-8 booking__wrapper">
        <h1>
          Usuarios de la sucursal de:{' '}
          <span className="text-primary">{citySucursal}</span>{' '}
        </h1>
      </div>
      <div>
        <UsersTable data={users} updateUserList={updateUserList} />
      </div>
      <div className="flex justify-end mt-5">
        <Link to={urls.newUser}>
          <button
            className="bg-primary/80 text-black py-2 px-4 rounded-lg hover:bg-primary transition-colors"
            onClick={() => {}}
          >
            Crear Usuario
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AllUsers;
