import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import {
  getQuotes,
  getQuotesByClient,
  getQuotesBySeller,
} from '../../assets/api/quote';
import { getSucursal, getUsersBySucursal } from '../../assets/api/sucursal.api';
import { urls } from '../../assets/urls/urls';
import UsersTable from '../../components/Dashboard/UI/UsersTable';
import MyQuotesTable from '../../components/Dashboard/UI/MyQuotesTable';

const MyQuotes = () => {
  const cookies = new Cookies();
  const idSucursal = cookies.get('sucursal');
  const rol = cookies.get('rol');
  const id = cookies.get('id');
  const [quotes, setQuotes] = useState([]);

  const getQuoteClient = async () => {
    try {
      const { data } = await getQuotesByClient(id, 'IN_PROGRESS');
      setQuotes(data);
      console.log(data)
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        // Mostrar mensaje de error al usuario o tomar alguna acción según corresponda
        toast.error(data.error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  const getQuoteSeller = async () => {
    try {
      const { data } = await getQuotesBySeller(id, 'IN_PROGRESS');
      setQuotes(data);
      console.log(data);
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        // Mostrar mensaje de error al usuario o tomar alguna acción según corresponda
        toast.error(data.error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  const getQuoteDataByRol = () => {
    if (rol === 'Cliente') {
      getQuoteClient();
    } else {
      getQuoteSeller();
    }
  };

  useEffect(() => {
    getQuoteDataByRol();
  }, []);

  return (
    <div>
      <div className="text-center font-bold text-3xl bg-secondary-100 p-8 rounded-xl mb-8 booking__wrapper">
        <h1>Mis cotizaciones</h1>
      </div>
      <div>
        <MyQuotesTable data={quotes} />
      </div>
      <div className="flex justify-end mt-5">
        <Link to={urls.seeCarsD}>
          <button
            className="bg-primary/80 text-black py-2 px-4 rounded-lg hover:bg-primary transition-colors"
            onClick={() => {}}
          >
            Cotizar
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MyQuotes;
