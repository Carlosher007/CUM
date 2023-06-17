import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUser } from '../../../assets/api/user.api';
import Perfil from './Perfil';

const EditUser = () => {
  const { id } = useParams();
  // const id = '1005945875';
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await getUser(id);
        setUser(data);
      } catch (error) {
        const { data } = error.response;
        // Mostrar mensaje de error al usuario o tomar alguna acción según corresponda
        toast.error(data.error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };
    getUserData();

    const getSucursalsData = async () => {};
    getSucursalsData();
  }, []);

  return <>{user && <Perfil user={user} />}</>;
};

export default EditUser;
