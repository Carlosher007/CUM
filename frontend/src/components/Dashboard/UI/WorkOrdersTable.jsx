import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteUser } from '../../../assets/api/user.api';
import { urls } from '../../../assets/urls/urls';
import { formatPrice } from '../../../assets/general/formatPrice';
import { renderWOState } from '../../../assets/general/workOrders';

const WorkOrdersTable = ({ data }) => {
  console.log(data);

  const renderStatus = (state) => {
    if (state === 'SENT') {
      return (
        <span className="py-1 px-2 bg-yellow-500/10 text-yellow-500 rounded-lg">
          {renderWOState(state)}
        </span>
      );
    } else if (state === 'CANCELLED') {
      return (
        <span className="py-1 px-2 bg-red-500/10 text-red-500 rounded-lg">
          {renderWOState(state)}
        </span>
      );
      //FINISHED
    } else {
      return (
        <span className="py-1 px-2 bg-green-500/10 text-green-500 rounded-lg">
          {renderWOState(state)}
        </span>
      );
    }
  };

  return (
    <div>
      <div className="bg-secondary-100 p-6 rounded-xl">
        <div className="hidden md:grid grid-cols-1 md:grid-cols-6 mb-2 p-4">
          <h5>Estado</h5>
          <h5>Fecha</h5>
          <h5>Vehiculo</h5>
          <h5>#Partes</h5>
          <h5>Precio total</h5>
          <h5>Acciones</h5>
        </div>
        {data.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-1 md:grid-cols-6 items-center mb-4 bg-secondary-900 p-4 rounded-xl"
          >
            <div>
              <h5 className="md:hidden mt-6 text-white font-bold mb-2">
                Estado
              </h5>
              <span>{renderStatus(item.state)}</span>
            </div>
            <div>
              <h5 className="md:hidden text-white font-bold mb-2">Fecha</h5>
              <span>{item.date}</span>
            </div>
            <div>
              <h5 className="md:hidden mt-6 text-white font-bold mb-2">
                Vehiculo
              </h5>
              {item.client_vehicle.quotation.vehicle_sucursal.vehicle.model} -{' '}
              {item.client_vehicle.quotation.vehicle_sucursal.vehicle.year}
            </div>
            <div>
              <h5 className="md:hidden mt-6 text-white font-bold mb-2">
                # Partes
              </h5>
              <p>
                {item.parts.length === 0 ? 'Sin partes' : item.parts.length}
              </p>
            </div>
            <div>
              <h5 className="md:hidden mt-6 text-white font-bold mb-2">
                Precio Total
              </h5>
              <span>{formatPrice(item.total_price)}</span>
            </div>
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
                      to={`/dashboard/workOrder/${item.id}`}
                      className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 p-2 flex-1"
                    >
                      Ver detalladamente
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

export default WorkOrdersTable;
