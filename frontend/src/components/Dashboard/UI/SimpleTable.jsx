import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCar } from '../../../assets/api/cars';
import { formatPrice } from '../../../assets/general/formatPrice';
import { codeToColorName } from '../../../assets/color/colorUtils';

const SimpleTable = ({ data }) => {
  return (
    <div>
      <div className="bg-secondary-100 p-8 rounded-xl">
        <div className="hidden md:grid grid-cols-1 md:grid-cols-6 gap-4 mb-10 p-4">
          <h5>ID Vehiculo</h5>
          <h5>Color</h5>
          <h5>ID Cliente</h5>
          <h5>ID Vendedor</h5>
          <h5># Cuotas</h5>
          <h5>Valor de cuotas</h5>
        </div>
        {data.map((item) => (
          <div
            key={item.quotation.id}
            className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center mb-4 bg-secondary-900 p-4 rounded-xl"
          >
            <div>
              <h5 className="md:hidden text-white font-bold mb-2">
                ID del Vehiculo
              </h5>
              <span>{item.quotation.vehicle_sucursal.vehicle}</span>
            </div>
            <div>
              <h5 className="md:hidden text-white font-bold mb-2">Color</h5>
              <p>{codeToColorName(item.quotation.vehicle_sucursal.color)}</p>
            </div>
            <div>
              <h5 className="md:hidden text-white font-bold mb-2">
                ID CLiente
              </h5>
              <p>{item.quotation.client}</p>
            </div>
            <div>
              <h5 className="md:hidden text-white font-bold mb-2">
                ID Vendedor
              </h5>
              <span>{item.seller}</span>
            </div>
            <div>
              <h5 className="md:hidden text-white font-bold mb-2">
                Numero de cutoas
              </h5>
              <span>{item.quotation.num_installments}</span>
            </div>
            <div>
              <h5 className="md:hidden text-white font-bold mb-2">
                Valord de cuotas
              </h5>
              <span>{formatPrice(item.quotation.quota_value)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleTable;
