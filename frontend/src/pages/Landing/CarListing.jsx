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
import Helmet from '../../components/Landing/Helmet/Helmet';
import CarItem from '../../components/Landing/UI/CarItem';
import CommonSection from '../../components/Landing/UI/CommonSection';

const CarListing = () => {
  const ITEMS_PER_PAGE = 5;

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
    const getCarData = async () => {
      try {
        const { data } = await getCars();
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
      result = a.price - b.price;
    } else if (sortOrder.price === 'high') {
      result = b.price - a.precio;
    }

    return result;
  });

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    setCurrentPage(0);
  };

  const paginatedCarData = sortedCarData
    .filter((car) => car.model.toLowerCase().includes(searchTerm))
    .slice(offset, offset + ITEMS_PER_PAGE);

  return (
    <div className="bg-white">
      <Helmet title="Cars" className="bg-white">
        <CommonSection title="Lista de Carros" />
        <section className="bg-white">
          <Container>
            <Row className="gap-20">
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
              <Col lg="4" className="mb-5 ">
                <div className="flex items-center gap-2 text-black">
                  <span className="flex items-center gap-2">
                    <i className="ri-sort-asc"></i> Ordena por precio
                  </span>

                  <Input
                    type="select"
                    onChange={(event) => handleSortChange(event, 'price')}
                    style={{ maxWidth: '200px' }}
                  >
                    <option>Select</option>
                    <option value="low">Ascendente</option>
                    <option value="high">Descendente</option>
                  </Input>
                </div>
              </Col>
            </Row>
            <Row>
              {paginatedCarData.length > 0 ? (
                paginatedCarData.map((item) => (
                  <CarItem item={item} key={item.model} />
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
