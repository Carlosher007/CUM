import { useState } from 'react';
import { Link } from 'react-router-dom';
// Componente de Notificación
const NotificationItem = ({ notification }) => {
  const { tipo, titulo, fecha, comentario } = notification;

  let imagen;
  switch (tipo) {
    case 'envio_cotizacion':
      imagen =
        'https://cdn-icons-png.flaticon.com/512/1248/1248375.png?w=740&t=st=1686270127~exp=1686270727~hmac=ffbf957514bc7884948732a0f49c37f18801397970e86bde447620f104aa537a';
      break;
    case 'informe_cotizacion':
      imagen =
        'https://cdn-icons-png.flaticon.com/512/1250/1250218.png?w=740&t=st=1686270143~exp=1686270743~hmac=a41164ccdf7c62ad1a38e9e43fefcba50ff047075958dff9ef107953c56391af';
      break;
    case 'compra':
      imagen =
        'https://cdn-icons-png.flaticon.com/512/1250/1250162.png?w=740&t=st=1686270057~exp=1686270657~hmac=f35fd5b8c2743ae10ae346440e8c2828ce805ca401a018eae4232748b6136b01';
      break;
    case 'envio_taller':
      imagen = 'https://cdn-icons-png.flaticon.com/512/950/950435.png?w=740&t=st=1686270082~exp=1686270682~hmac=b1e6c6e7b886d3ccf039e2bf57b5c463b79cf6aee66484e2481de222cd227cf0';
      break;
    case 'listo_taller':
      imagen =
        'https://cdn-icons-png.flaticon.com/512/809/809985.png?w=740&t=st=1686270185~exp=1686270785~hmac=c9cb9b06f98e2e0c8c80c858448c95bd2ae3aa4a11b107e071e6ac129df480d2';
      break;
    default:
      imagen = '';
  }

  return (
    <Link
      to="/"
      className="text-gray-300 flex flex-1 items-center gap-4 py-2 px-4 hover:bg-secondary-900 transition-colors rounded-lg"
    >
      {imagen && (
        <img src={imagen} className="w-8 h-8 object-cover rounded-full" />
      )}
      <div className="text-sm flex flex-col">
        <div className="flex items-center justify-between gap-4">
          <span>{titulo}</span> <span className="text-[8px]">{fecha}</span>
        </div>
        <p className="text-gray-500 text-xs">{comentario}</p>
      </div>
    </Link>
  );
};

export default NotificationItem;
