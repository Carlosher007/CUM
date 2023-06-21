import React, { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupText,
  Row,
} from 'reactstrap';
import Cookies from 'universal-cookie';
import { getCars } from '../../assets/api/cars';
import { getCarsBySucursal, getSucursal } from '../../assets/api/sucursal.api';
import carData from '../../assets/data/carData';
import { urls } from '../../assets/urls/urls';
import CarItemD from '../../components/Dashboard/UI/CarItemD';
import { formatPrice } from '../../assets/general/formatPrice';

const CarListingD = () => {
  const ITEMS_PER_PAGE = 4;

  const cookies = new Cookies();
  const idSucursal = cookies.get('sucursal');
  const rol = cookies.get('rol')
  const [citySucursal, setCitySucursal] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [dataCars, setDataCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState({
    price: null,
  });

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * ITEMS_PER_PAGE;

  const handleSortChange = (event, property) => {
    const newSortOrder = { ...sortOrder };
    newSortOrder[property] = event.target.value;
    setSortOrder(newSortOrder);
  };

  useEffect(() => {
    const getSucursalData = async () => {
      try {
        const { data } = await getSucursal(idSucursal);
        setCitySucursal(data.city);
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
    getSucursalData();

    const getCarData = async () => {
      try {
        const { data } = await getCarsBySucursal(idSucursal);
        setDataCars(data);
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
    getCarData();
  }, []);

  const sortedCarData = [...dataCars].sort((a, b) => {
    let result = 0;

    if (sortOrder.price === 'low') {
      result = a.vehicle.price - b.vehicle.price;
    } else if (sortOrder.price === 'high') {
      result = b.vehicle.price - a.vehicle.precio;
    }

    return result;
  });

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    setCurrentPage(0);
  };
  

  const paginatedCarData = sortedCarData
    .filter(
      (car) =>
        car.vehicle.model.toLowerCase().includes(searchTerm) ||
        (car.vehicle.year && car.vehicle.year.toString().includes(searchTerm))
    )
    .slice(offset, offset + ITEMS_PER_PAGE);

  return (
    <div className="bookings">
      <div className="text-center font-bold text-3xl bg-secondary-100 p-8 rounded-xl mb-8 booking__wrapper">
        <h1>
          Carros de la sucursal de:{' '}
          <span className="text-primary">{citySucursal}</span>{' '}
        </h1>
      </div>
      <div className="bg-secondary-100 p-8 rounded-xl mb-8">
        <div className="flex flex-col md:flex-row items-center md:gap-16">
          <div className="flex items-center gap-5 mb-5 md:mb-0">
            <BsSearch />
            <Input
              type="text"
              className="py-2 px-4 outline-none rounded-lg bg-secondary-900"
              placeholder="Buscar por modelo o año"
              onChange={handleSearch}
            />
          </div>
          <div className="flex flex-col items-center md:flex-row gap-3 md:items-center">
            <span className="flex items-center gap-2 md:order-1">
              <i className="ri-sort-asc"></i> Ordena por precio
            </span>
            <div className="flex-1 md:order-2 md:w-auto">
              <Input
                type="select"
                onChange={(event) => handleSortChange(event, 'price')}
                className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900 appearance-none"
              >
                <option>Select</option>
                <option value="low">Ascendente</option>
                <option value="high">Descendente</option>
              </Input>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="flex flex-wrap">
            {paginatedCarData.length > 0 ? (
              paginatedCarData.map((item) => (
                <CarItemD item={item} key={item.vehicle.id} />
              ))
            ) : (
              <div>No se encontraron resultados.</div>
            )}
          </div>
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
              pageCount={Math.ceil(sortedCarData.length / ITEMS_PER_PAGE)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              containerClassName={'pagination flex gap-2'}
              activeClassName={'active'}
              pageClassName={'text-white'} // Agrega esta línea para cambiar el color de los números
            />
          </div>
        </div>
        {rol !== 'Cliente' && rol !== 'Jefe_Taller' && (
          <div className="flex justify-end mt-5">
            <Link to={urls.newVehicle}>
              <button className="bg-primary/80 text-black py-2 px-4 rounded-lg hover:bg-primary transition-colors">
                Añadir Vehiculo
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarListingD;
