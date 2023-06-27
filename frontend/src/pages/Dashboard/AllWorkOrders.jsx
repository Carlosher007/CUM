import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import { Input } from 'reactstrap';
import Cookies from 'universal-cookie';
import { getSucursal } from '../../assets/api/sucursal.api';
import {
  getWorkOrdersByClient,
  getWorkOrdersBySucursal,
} from '../../assets/api/workOrder';
import {
  listStateWorkOrder,
  renderWOState,
} from '../../assets/general/workOrders';
import WorkOrdersTable from '../../components/Dashboard/UI/WorkOrdersTable';

const AllWorkOrders = () => {
  const cookies = new Cookies();
  const rol = cookies.get('rol');
  const sucursal = cookies.get('sucursal');
  const idUser = cookies.get('id');
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const [workOrders, setWorkOrders] = useState([]);
  const [citySucursal, setCitySucursal] = useState();
  const [idStateSelectedValue, setIdStateSelectedValue] = useState('');

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleSelectedState = async (e) => {
    const selectedStateId = e.target.value;
    setIdStateSelectedValue(selectedStateId);
  };

  const getWorkOrders = async () => {
    try {
      let response;

      if (idStateSelectedValue === '') {
        response = await getWorkOrdersBySucursal(parseInt(sucursal), 'ALL');
      } else {
        response = await getWorkOrdersBySucursal(
          parseInt(sucursal),
          idStateSelectedValue
        );
      }

      const { data } = response;
      setWorkOrders(data.work_orders);
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

  const getWorkOrders2 = async () => {
    try {
      let response;

      if (idStateSelectedValue === '') {
        response = await getWorkOrdersByClient(parseInt(idUser), 'ALL');
      } else {
        response = await getWorkOrdersByClient(
          parseInt(idUser),
          idStateSelectedValue
        );
      }

      const { data } = response;
      setWorkOrders(data.work_orders);
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

  const getSucursalData = async () => {
    try {
      const { data } = await getSucursal(sucursal);
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

  const offset = currentPage * ITEMS_PER_PAGE;

  const paginatedWOData = workOrders.slice(offset, offset + ITEMS_PER_PAGE);

  useEffect(() => {
    if (rol === 'Cliente') {
      getWorkOrders2();
    } else {
      getWorkOrders();
    }
  }, [idStateSelectedValue]);

  useEffect(() => {
    getSucursalData();
  }, []);

  return (
    <div>
      <div className="text-center font-bold text-3xl bg-secondary-100 p-8 rounded-xl mb-8 booking__wrapper">
        {rol === 'Cliente' ? (
          <>
            {' '}
            Mis{' '}
            <span className="text-primary">ordenes de trabajo</span>{' '}
          </>
        ) : (
          <>
            {' '}
            Ordenes de trabajo de la sucursal de:{' '}
            <span className="text-primary">{citySucursal}</span>{' '}
          </>
        )}
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
                {listStateWorkOrder.map((state) => (
                  <option value={state.value} key={state.value}>
                    {state.return}
                  </option>
                ))}
              </Input>
            </div>
          </div>
        </div>

        <div className="">
          {paginatedWOData.length > 0 ? (
            <div>
              <WorkOrdersTable data={paginatedWOData} />
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
                  pageCount={Math.ceil(workOrders.length / ITEMS_PER_PAGE)}
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
    </div>
  );
};

export default AllWorkOrders;
