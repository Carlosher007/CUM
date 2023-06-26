import React, { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';

import {
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupText,
  Row,
} from 'reactstrap';
import {
  getQuotes,
  getQuotesByClient,
  getQuotesBySeller,
  getQuotesBySucursal,
} from '../../assets/api/quote';
import { getSucursal, getUsersBySucursal } from '../../assets/api/sucursal.api';
import { listState } from '../../assets/general/cotizationState';
import { urls } from '../../assets/urls/urls';
import MyQuotesTable from '../../components/Dashboard/UI/MyQuotesTable';
import UsersTable from '../../components/Dashboard/UI/UsersTable';

const AllQuotes = () => {
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const cookies = new Cookies();
  const idSucursal = cookies.get('sucursal');
  const rol = cookies.get('rol');
  const id = cookies.get('id');
  const [quotes, setQuotes] = useState([]);
  const [idStateSelectedValue, setIdStateSelectedValue] = useState('');

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleSelectedState = async (e) => {
    const selectedStateId = e.target.value;
    setIdStateSelectedValue(selectedStateId);
  };

  const offset = currentPage * ITEMS_PER_PAGE;

  const paginatedQuotesData = quotes.slice(offset, offset + ITEMS_PER_PAGE);

  const getQuoteSucursal = async () => {
    try {
      let response;

      if (idStateSelectedValue === '') {
        response = await getQuotesBySucursal(idSucursal, 'ALL');
      } else {
        response = await getQuotesBySucursal(idSucursal, idStateSelectedValue);
      }

      const { data } = response;
      setQuotes(data);
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        Object.values(data).forEach((errorMessages) => {
          errorMessages.forEach((errorMessage) => {
            toast.error(errorMessage, {
              position: toast.POSITION.TOP_RIGHT,
            });
          });
        });
      }
    }
  };

  useEffect(() => {
    getQuoteSucursal();
  }, [idStateSelectedValue]);

  return (
    <div className="bookings">
      <div className="text-center font-bold text-3xl bg-secondary-100 p-8 rounded-xl mb-8 booking__wrapper">
        <h1>Todas las cotizacioens</h1>
      </div>
      <div className="bg-secondary-100 p-8 rounded-xl mb-8">
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
                {listState.map((state) => (
                  <option value={state.value} key={state.value}>
                    {state.return}
                  </option>
                ))}
              </Input>
            </div>
          </div>
        </div>

        <div className="">
          {paginatedQuotesData.length > 0 ? (
            <div>
              <MyQuotesTable data={paginatedQuotesData} />
              <div className="flex justify-center items-center mt-4">
                <ReactPaginate
                  previousLabel={
                    <i className="ri-arrow-left-circle-fill text-blue-500 text-2xl"></i>
                  }
                  nextLabel={
                    <i className="ri-arrow-right-circle-fill text-blue-500 text-2xl"></i>
                  }
                  breakLabel={
                    <i className="ri-arrow-left-right-line text-blue-500 text-2xl"></i>
                  }
                  breakClassName={'break-me'}
                  pageCount={Math.ceil(quotes.length / ITEMS_PER_PAGE)}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageChange}
                  containerClassName={'pagination flex gap-2'}
                  activeClassName={'active'}
                  pageClassName={'text-white'} // Agrega esta línea para cambiar el color de los números
                />
              </div>
            </div>
          ) : (
            <div>No se encontraron resultados.</div>
          )}
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
    </div>
  );
};

export default AllQuotes;
