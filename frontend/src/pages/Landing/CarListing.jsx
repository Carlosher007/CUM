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
import { getCars } from '../../assets/api/infoCars';
import carData from '../../assets/data/carData';
import Helmet from '../../components/Landing/Helmet/Helmet';
import CarItem from '../../components/Landing/UI/CarItem';
import CommonSection from '../../components/Landing/UI/CommonSection';

const CarListing = () => {
  const ITEMS_PER_PAGE = 5;

  const [currentPage, setCurrentPage] = useState(0);
  const [dataCars, setDataCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState({
    precio: null,
    tiempoCarga: null,
    rango: null,
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
    const getCarData = async () => {
      try {
        const { data } = await getCars();
        setDataCars(data);
        console.log(data);
      } catch (error) {
        const { data } = error.response;
        // Mostrar mensaje de error al usuario o tomar alguna acción según corresponda
        console.log(data.error);
        toast.error(data.error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };
    getCarData();
  }, []);

  const sortedCarData = [...carData].sort((a, b) => {
    let result = 0;

    if (sortOrder.precio === 'low') {
      result = a.precio - b.precio;
    } else if (sortOrder.precio === 'high') {
      result = b.precio - a.precio;
    }

    if (sortOrder.tiempoCarga === 'low') {
      result = a.tiempoCarga - b.tiempoCarga;
    } else if (sortOrder.tiempoCarga === 'high') {
      result = b.tiempoCarga - a.tiempoCarga;
    }

    if (sortOrder.rango === 'low') {
      result = a.rango - b.rango;
    } else if (sortOrder.rango === 'high') {
      result = b.rango - a.rango;
    }

    return result;
  });

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    setCurrentPage(0);
  };

  const paginatedCarData = sortedCarData
    .filter((car) => car.modelo.toLowerCase().includes(searchTerm))
    .slice(offset, offset + ITEMS_PER_PAGE);

  return (
    <div className="bg-white">
      <Helmet title="Cars" className="bg-white">
        <CommonSection title="Lista de Carros" />

        <section className="bg-white">
          <Container>
            <Row>
              <Col lg="4" className="mb-5">
                <div className="flex items-center gap-2">
                  <InputGroup>
                    <InputGroupText>
                      <BsSearch />
                    </InputGroupText>
                    <Input
                      type="text"
                      placeholder="Buscar por modelo"
                      onChange={handleSearch}
                    />
                  </InputGroup>
                </div>
              </Col>
            </Row>
            <Row>
              <div className="flex gap-3 text-black">
                <Col lg="4" className="mb-5 ">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-2">
                      <i className="ri-sort-asc"></i> Ordena por Precio
                    </span>

                    <Input
                      type="select"
                      onChange={(event) => handleSortChange(event, 'precio')}
                      style={{ maxWidth: '200px' }}
                    >
                      <option>Select</option>
                      <option value="low">Ascendente</option>
                      <option value="high">Descendente</option>
                    </Input>
                  </div>
                </Col>
                <Col lg="4" className="mb-5">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-2">
                      <i className="ri-sort-asc"></i> Ordena por Rango
                    </span>

                    <Input
                      type="select"
                      onChange={(event) =>
                        handleSortChange(event, 'tiempoCarga')
                      }
                      style={{ maxWidth: '200px' }}
                    >
                      <option>Select</option>
                      <option value="low">Ascendente</option>
                      <option value="high">Descendente</option>
                    </Input>
                  </div>
                </Col>
                <Col lg="4" className="mb-5">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-2">
                      <i className="ri-sort-asc"></i> Ordena por Capacidad de
                      Carga
                    </span>

                    <Input
                      type="select"
                      onChange={(event) => handleSortChange(event, 'rango')}
                      style={{ maxWidth: '200px' }}
                    >
                      <option>Select</option>
                      <option value="low">Ascendente</option>
                      <option value="high">Descendente</option>
                    </Input>
                  </div>
                </Col>
              </div>
              {paginatedCarData.length > 0 ? (
                paginatedCarData.map((item) => (
                  <CarItem item={item} key={item.modelo} />
                ))
              ) : (
                <div>No se encontraron resultados.</div>
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
              activeClassName={'active'}
              pageClassName={'text-black'} // Agrega esta línea para cambiar el color de los números
            />
          </div>
        </section>
      </Helmet>
    </div>
  );
};

export default CarListing;
