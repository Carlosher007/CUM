import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import { getCarsSoldByClient } from '../../assets/api/cars';
import MyCarsTable from '../../components/Dashboard/UI/MyCarsTable';

const MyCars = () => {
  const cookies = new Cookies();
  const id = cookies.get('id');
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const [cars, setCars] = useState([]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * ITEMS_PER_PAGE;

  const paginatedCarsData = cars.slice(offset, offset + ITEMS_PER_PAGE);

  const getCars = async () => {
    try {
      const { data } = await getCarsSoldByClient(parseInt(id));
      setCars(data);
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
    getCars();
  }, []);

  return (
    <div>
      <div className="text-center font-bold text-3xl bg-secondary-100 p-8 rounded-xl mb-8 booking__wrapper">
        <h1>Mis Carros Comprados</h1>
      </div>
      <div className="">
        {paginatedCarsData.length > 0 ? (
          <div>
            <MyCarsTable data={paginatedCarsData} />
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
                pageCount={Math.ceil(cars.length / ITEMS_PER_PAGE)}
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
    </div>
  );
};

// <MyQuotesTable data={paginatedQuotesData} />;

export default MyCars;
