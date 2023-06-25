import React, { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import {
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupText,
  Row,
} from 'reactstrap';
import { getCars } from '../../assets/api/cars';
import {
  getCarsBySucursal,
  getSucursalsStaff,
} from '../../assets/api/sucursal.api';
import Helmet from '../../components/Landing/Helmet/Helmet';
import CarItem from '../../components/Landing/UI/CarItem';
import CommonSection from '../../components/Landing/UI/CommonSection';
import '../../styles/pagination.css';

const CarListing = () => {
  const ITEMS_PER_PAGE = 5;

  const [currentPage, setCurrentPage] = useState(0);
  const [dataCars, setDataCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState({
    price: null,
  });
  const [sucursals, setSucursals] = useState([]);
  const [selectedSucursal, setSelectedSucursal] = useState('');

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const sortedCarData = [...dataCars].sort((a, b) => {
    let result = 0;

    if (sortOrder.price === 'low') {
      result = a.price - b.price;
    } else if (sortOrder.price === 'high') {
      result = b.price - a.price;
    }

    return result;
  });

  const offset = currentPage * ITEMS_PER_PAGE;

  const getCarData = async () => {
    try {
      const { data } = await getCars();
      setDataCars(data);
      console.log(data);
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        toast.error(data, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  const getSucursalsData = async () => {
    try {
      const { data } = await getSucursalsStaff();
      setSucursals(data);
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        toast.error(data, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  const getCarDataBySucursal = async () => {
    try {
      const { data } = await getCarsBySucursal(selectedSucursal);
      console.log(data);
      setDataCars(data.map((item) => item.vehicle));
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        toast.error(data, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  const handleSortChange = (event, property) => {
    const newSortOrder = { ...sortOrder };
    newSortOrder[property] = event.target.value;
    setSortOrder(newSortOrder);
  };

  useEffect(() => {
    getCarData();
    getSucursalsData();
  }, []);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
  };

  const paginatedCarData = sortedCarData
    .filter(
      (car) =>
        car.model.toLowerCase().includes(searchTerm) ||
        (car.year && car.year.toString().includes(searchTerm))
    )
    .slice(offset, offset + ITEMS_PER_PAGE);

  useEffect(() => {
    if (selectedSucursal !== '') {
      getCarDataBySucursal(selectedSucursal); // Llama a la función getCarDataBySucursal
    } else {
      getCarData();
    }
  }, [selectedSucursal]);

  return (
    <div className="bg-white">
      <Helmet title="Cars" className="bg-white">
        <CommonSection title="Lista de Carros" />
        <section className="bg-white">
          <Container>
            <Row className="gap-2">
              <Col className="mb-5">
                <div className="flex items-center">
                  <InputGroup>
                    <InputGroupText>
                      <BsSearch />
                    </InputGroupText>
                    <Input
                      type="text"
                      placeholder="Buscar por modelo"
                      onChange={handleSearch}
                      style={{ maxWidth: '180px', minWidth: '180px' }}
                    />
                  </InputGroup>
                </div>
              </Col>
              <Col className="mb-5 ">
                <div className="flex items-center gap-2 text-black">
                  <span className="flex items-center gap-2">
                    <i className="ri-sort-asc"></i> Ordena por precio
                  </span>

                  <Input
                    type="select"
                    onChange={(event) => handleSortChange(event, 'price')}
                    style={{ maxWidth: '160px', minWidth: '160px' }}
                  >
                    <option value="">Seleccione</option>
                    <option value="low">Ascendente</option>
                    <option value="high">Descendente</option>
                  </Input>
                </div>
              </Col>
              <Col className="mb-5 ">
                <div className="flex items-center gap-2 text-black">
                  <span className="flex items-center gap-2">
                    <i className="ri-sort-asc"></i> Filtrar por sucursal
                  </span>

                  <Input
                    type="select"
                    onChange={(event) =>
                      setSelectedSucursal(event.target.value)
                    }
                    style={{ maxWidth: '160px', minWidth: '160px' }}
                  >
                    <option value="">Todas</option>
                    {sucursals.map((office) => (
                      <option value={office.id} key={office.id}>
                        {office.city}
                      </option>
                    ))}
                  </Input>
                </div>
              </Col>
            </Row>
            <Row>
              {paginatedCarData.length > 0 ? (
                paginatedCarData.map((item) => (
                  <CarItem item={item} key={item.id} />
                ))
              ) : (
                <div>
                  No se encontraron resultados o seleccione el numero de pagina
                </div>
              )}
            </Row>
          </Container>
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
              activeClassName={'active-page'}
              pageClassName={'text-black'} // Agrega esta línea para cambiar el color de los números
            />
          </div>
        </section>
      </Helmet>
    </div>
  );
};

export default CarListing;
