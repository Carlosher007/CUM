import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Input } from 'reactstrap';
import Cookies from 'universal-cookie';
import { getSucursal, getUsersBySucursal } from '../../assets/api/sucursal.api';
import { listRols } from '../../assets/general/rols.js';
import { urls } from '../../assets/urls/urls';
import UsersTable from '../../components/Dashboard/UI/UsersTable';

const AllUsers = () => {
  const cookies = new Cookies();
  const idSucursal = cookies.get('sucursal');
  const miId = cookies.get('id');
  const [users, setUsers] = useState([]);
  const [citySucursal, setCitySucursal] = useState();
  const [idStateSelectedValue, setIdStateSelectedValue] = useState('');

  const updateUserList = async () => {
    try {
      const { data } = await getUsersBySucursal(idSucursal);
      setUsers(data.filter((user) => user.id !== miId));
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

  useEffect(() => {
    const getUsersData = async () => {
      try {
        const { data } = await getUsersBySucursal(idSucursal);

        const allUsers = data.filter((user) => user.id !== miId);

        if (idStateSelectedValue === '') {
          setUsers(allUsers);
        } else {
          //Filtramos donde user.rol === isStateSelectedValue
          setUsers(
            allUsers.filter((user) => user.rol === idStateSelectedValue)
          );
        }
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
    getUsersData();

    const getSucursalData = async () => {
      try {
        const { data } = await getSucursal(idSucursal);
        setCitySucursal(data.city);
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
    getSucursalData();
  }, []);

  const handleSelectedState = async (e) => {
    const selectedStateId = e.target.value;
    setIdStateSelectedValue(selectedStateId);
  };

  return (
    <div>
      <div className="text-center font-bold text-3xl bg-secondary-100 p-8 rounded-xl mb-8 booking__wrapper">
        <h1>
          Usuarios de la sucursal de:{' '}
          <span className="text-primary">{citySucursal}</span>{' '}
        </h1>
      </div>
      <div className="flex flex-col md:flex-row items-center md:gap-16">
        <div className="flex flex-col items-center md:flex-row gap-3 md:items-center">
          <span className="flex items-center gap-2 md:order-1">
            <i className="ri-sort-asc"></i> Filtrar por estado
          </span>
          <div className="flex-1 md:order-2 md:w-auto">
            <Input
              type="select"
              name="idCarSelected"
              onChange={handleSelectedState} // Usar solo onChange
              className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900 appearance-none"
            >
              <option value="">Seleccione uno</option>
              {listRols.map((state) => (
                <option value={state.value} key={state.value}>
                  {state.return}
                </option>
              ))}
            </Input>
          </div>
        </div>
      </div>
      <div>
        {users.length > 0 ? (
          <UsersTable data={users} updateUserList={updateUserList} />
        ) : (
          <div className="bg-secondary-100 p-6 rounded-xl">
            <p>Sin usuarios</p>
          </div>
        )}
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
