import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import { getCar } from '../../../assets/api/cars';
import { getCarsBySucursal } from '../../../assets/api/sucursal.api';
import { deleteUser, getUser } from '../../../assets/api/user.api';
import {
  renderCState,
  renderState,
} from '../../../assets/general/cotizationState';
import { formatPrice } from '../../../assets/general/formatPrice';
import { urls } from '../../../assets/urls/urls';
const MyQuotesTable = ({ data }) => {
  const cookies = new Cookies();
  const rol = cookies.get('rol');

  const renderState = (rol) => {
    if (rol === 'IN_PROGRESS') {
      return (
        <span className="py-1 px-2 bg-yellow-500/10 text-yellow-500 rounded-lg">
          {renderCState(rol)}
        </span>
      );
    } else if (rol === 'CANCELLED') {
      return (
        <span className="py-1 px-2 bg-red-500/10 text-red-500 rounded-lg">
          {renderCState(rol)}
        </span>
      );
    } else if (rol === 'ACCEPTED') {
      return (
        <span className="py-1 px-2 bg-green-500/10 text-green-500 rounded-lg">
          {renderCState(rol)}
        </span>
      );
    } else {
      return (
        <span className="py-1 px-2 bg-blue-500/10 text-blue-500 rounded-lg">
          {renderCState(rol)}
        </span>
      );
    }
  };

  return (
    <div>
      <div className="bg-secondary-100 p-6 rounded-xl">
        <div className="hidden md:grid grid-cols-1 md:grid-cols-6 mb-2 p-4">
          <h5>Estado</h5>
          <h5>Numero Cuotas</h5>
          {rol !== 'Gerente' && <h5>Valor Cutoa</h5>}
          <h5>ID Vehiculo</h5>
          {rol !== 'Gerente' &&
            (rol === 'Cliente' ? <h5>ID Vendedor</h5> : <h5>ID Cliente</h5>)}
          {rol === 'Gerente' && (
            <>
              <h5>ID Vendedor</h5> <h5>ID Cliente</h5>
            </>
          )}
          <h5>Acciones</h5>
        </div>
        {data.map((item) => (
          <div
            key={item.quotation.id}
            className="grid grid-cols-1 md:grid-cols-6 items-center mb-4 bg-secondary-900 p-4 rounded-xl"
          >
            <div>
              <h5 className="md:hidden mt-6 text-white font-bold mb-2">
                Estado
              </h5>
              {/* <span>{convertToDate(item.last_login)}</span> */}
              <span>{renderState(item.state)}</span>
            </div>
            <div>
              <h5 className="md:hidden text-white font-bold mb-2">
                Numero de quotas
              </h5>
              <span>{item.quotation.num_installments}</span>
            </div>
            {rol !== 'Gerente' && (
              <div>
                <h5 className="md:hidden mt-6 text-white font-bold mb-2">
                  Valor de cuotas
                </h5>
                <span>{formatPrice(item.quotation.quota_value)}</span>
              </div>
            )}
            <div>
              <h5 className="md:hidden mt-6 text-white font-bold mb-2">
                Vehiculo
              </h5>
              <span>{item.quotation.vehicle_sucursal.vehicle}</span>
            </div>
            {rol === 'Cliente' ? (
              <div>
                <h5 className="md:hidden mt-6 text-white font-bold mb-2">
                  Vendedor
                </h5>
                <span>{item.seller}</span>
              </div>
            ) : (
              rol === 'Vendedor' && (
                <div>
                  <h5 className="md:hidden mt-6 text-white font-bold mb-2">
                    Cliente
                  </h5>
                  <span>{item.quotation.client}</span>
                </div>
              )
            )}
            {rol === 'Gerente' && (
              <>
                {' '}
                <div>
                  <h5 className="md:hidden mt-6 text-white font-bold mb-2">
                    Vendedor
                  </h5>
                  <span>{item.seller}</span>
                </div>
                <div>
                  <h5 className="md:hidden mt-6 text-white font-bold mb-2">
                    Cliente
                  </h5>
                  <span>{item.quotation.client}</span>
                </div>
              </>
            )}

            <div>
              <div>
                <h5 className="md:hidden mt-6 text-white font-bold mb-2">
                  Acciones
                </h5>
                <Menu
                  menuButton={
                    <MenuButton className="flex items-center gap-x-2 bg-secondary-100 p-2 rounded-lg transition-colors">
                      Acciones
                    </MenuButton>
                  }
                  align="end"
                  arrow
                  arrowClassName="bg-secondary-100"
                  transition
                  menuClassName="bg-secondary-100 p-4"
                >
                  <MenuItem className="p-0 hover:bg-transparent">
                    <Link
                      to={`/dashboard/see-quote/${item.quotation.id}/${0}`}
                      className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 p-2 flex-1"
                    >
                      Ver Detalladamente
                    </Link>
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyQuotesTable;
