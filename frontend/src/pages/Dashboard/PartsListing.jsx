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
import { getParts, getPartsInSucursal } from '../../assets/api/parts';
import { getCarsBySucursal, getSucursal } from '../../assets/api/sucursal.api';
import carData from '../../assets/data/carData';
import { formatPrice } from '../../assets/general/formatPrice';
import { urls } from '../../assets/urls/urls';
import CarItemD from '../../components/Dashboard/UI/CarItemD';
import PartsTable from '../../components/Dashboard/UI/PartsTable';

const PartsListing = () => {
  const ITEMS_PER_PAGE = 8;

  const cookies = new Cookies();
  const idSucursal = cookies.get('sucursal');
  const rol = cookies.get('rol');
  const [citySucursal, setCitySucursal] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [dataParts, setDataParts] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [idCarSelectedValue, setIdCarSelectedValue] = useState('');

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleSelectedVehicle = async (e) => {
    const selectedCarId = e.target.value;
    setIdCarSelectedValue(selectedCarId);
  };

  const offset = currentPage * ITEMS_PER_PAGE;

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

    const getPartData = async () => {
      try {
        const { data } = await getPartsInSucursal(idSucursal);
        setDataParts(data);
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
    getPartData();

    const getAllVehicles = async () => {
      try {
        const { data } = await getCarsBySucursal(idSucursal);
        setVehicles(data);
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

    getAllVehicles();
  }, []);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    setCurrentPage(0);
  };

  const paginatedPartData = dataParts
    .filter((part) => part.part.name.toLowerCase().includes(searchTerm))
    .slice(offset, offset + ITEMS_PER_PAGE);
    

  return (
    <div className="bookings">
      <div className="text-center font-bold text-3xl bg-secondary-100 p-8 rounded-xl mb-8 booking__wrapper">
        <h1>
          Repuestos de la sucursal de:{' '}
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
              placeholder="Buscar por nombre"
              onChange={handleSearch}
            />
          </div>
          <div className="flex flex-col items-center md:flex-row gap-3 md:items-center">
            <span className="flex items-center gap-2 md:order-1">
              <i className="ri-sort-asc"></i> Filtrar por vehiculo
            </span>
            <div className="flex-1 md:order-2 md:w-auto">
              <Input
                type="select"
                name="idCarSelected"
                onChange={handleSelectedVehicle} // Usar solo onChange
                className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900 appearance-none"
              >
                <option value="">Seleccione uno</option>
                {vehicles.map((car) => (
                  <option value={car.vehicle.id} key={car.vehicle.id}>
                    {car.vehicle.model} - {car.vehicle.year}
                  </option>
                ))}
              </Input>
            </div>
          </div>
        </div>

        <div className="">
          {paginatedPartData.length > 0 ? (
            <div>
              <PartsTable data={paginatedPartData} />
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
                  pageCount={Math.ceil(dataParts.length / ITEMS_PER_PAGE)}
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

        <div>
          {rol !== 'Cliente' && rol !== 'Vendedor' && (
            <div className="flex justify-end mt-5">
              <Link to={urls.newPart}>
                <button className="bg-primary/80 text-black py-2 px-4 rounded-lg hover:bg-primary transition-colors">
                  Añadir Repuesto
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PartsListing;
