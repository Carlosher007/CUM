import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteUser } from '../../../assets/api/user.api';
import { urls } from '../../../assets/urls/urls';
import { formatPrice } from '../../../assets/general/formatPrice';

const VehiclesWithPartTable = ({ data }) => {


  // return (
  //   <div>
  //     <div className="bg-secondary-100 p-6 rounded-xl">
  //       <div className="hidden md:grid grid-cols-1 md:grid-cols-4 mb-2 p-4">
  //         <h5>Nombre</h5>
  //         <h5>Precio</h5>
  //         <h5>Vehiculo</h5>
  //         <h5>Acciones</h5>
  //       </div>
  //       {data.map((item) => (
  //         <div
  //           key={item.id}
  //           className="grid grid-cols-1 md:grid-cols-4 items-center mb-4 bg-secondary-900 p-4 rounded-xl"
  //         >
  //           <div>
  //             <h5 className="md:hidden mt-6 text-white font-bold mb-2">
  //               Nombre
  //             </h5>
  //             {/* <span>{convertToDate(item.last_login)}</span> */}
  //             <span>{item.name}</span>
  //           </div>
  //           <div>
  //             <h5 className="md:hidden text-white font-bold mb-2">Precio</h5>
  //             <span>{formatPrice(item.price)}</span>
  //           </div>
  //           <div>
  //             <h5 className="md:hidden mt-6 text-white font-bold mb-2">
  //               Vehiculo
  //             </h5>
  //             {/* {modelo} - {year} */}
  //           </div>
  //           <div>
  //             <div>
  //               <h5 className="md:hidden mt-6 text-white font-bold mb-2">
  //                 Acciones
  //               </h5>
  //               <Menu
  //                 menuButton={
  //                   <MenuButton className="flex items-center gap-x-2 bg-secondary-100 p-2 rounded-lg transition-colors">
  //                     Acciones
  //                   </MenuButton>
  //                 }
  //                 align="end"
  //                 arrow
  //                 arrowClassName="bg-secondary-100"
  //                 transition
  //                 menuClassName="bg-secondary-100 p-4"
  //               >
  //                 <MenuItem className="p-0 hover:bg-transparent">
  //                   <Link
  //                     to={`/dashboard/edit-user/${item.id}`}
  //                     className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 p-2 flex-1"
  //                   >
  //                     Editar usaurio
  //                   </Link>
  //                 </MenuItem>
  //               </Menu>
  //             </div>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );
};

export default VehiclesWithPartTable;
