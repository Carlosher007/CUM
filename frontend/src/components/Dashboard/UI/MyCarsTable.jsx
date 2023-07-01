import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteUser } from '../../../assets/api/user.api';
import { urls } from '../../../assets/urls/urls';
import { formatPrice } from '../../../assets/general/formatPrice';

const MyCarsTable = ({ data}) => {

  console.log(data)

  return (
    <div>
      <div className="bg-secondary-100 p-6 rounded-xl">
        <div className="hidden md:grid grid-cols-1 md:grid-cols-6 mb-2 p-4">
          <h5>Id Vehiculo</h5>
          <h5>Color</h5>
          <h5>Cuota Inicial</h5>
          <h5>Numero de cutoas</h5>
          <h5>Valor de cutoas</h5>
          <h5>Acciones</h5>
        </div>
        {data.map((item) => (
          <div
            key={item.quotation.id}
            className="grid grid-cols-1 md:grid-cols-6 items-center mb-4 bg-secondary-900 p-4 rounded-xl"
          >
            <div>
              <h5 className="md:hidden mt-6 text-white font-bold mb-2">
                ID Vehiculo
              </h5>
              <span>{item.quotation.vehicle_sucursal.id}</span>
              <span></span>
            </div>
            <div>
              <h5 className="md:hidden text-white font-bold mb-2">Color</h5>
              <span>{item.quotation.vehicle_sucursal.color}</span>
            </div>
            <div>
              <h5 className="md:hidden mt-6 text-white font-bold mb-2">
                Cuota Inicial
              </h5>
              <span>{formatPrice(item.quotation.initial_fee)}</span>
            </div>
            <div>
              <h5 className="md:hidden mt-6 text-white font-bold mb-2">
                # Cuotas
              </h5>
              <p>{item.quotation.num_installments}</p>
            </div>
            <div>
              <h5 className="md:hidden mt-6 text-white font-bold mb-2">
                Valor de cutoas
              </h5>
              <span>{formatPrice(item.quotation.quota_value)}</span>
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
                      to={`/dashboard/myCar/${item.quotation.vehicle_sucursal.vehicle}/${(item.quotation.vehicle_sucursal.color).slice(1)}`}
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

export default MyCarsTable;
