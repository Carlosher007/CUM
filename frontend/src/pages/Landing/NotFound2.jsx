import React from 'react';
import '../../styles/error.css';

const NotFound2 = () => {
  return (
    <div className=" flex flex-col items-center justify-center">
      <div className="text-center font-bold text-3xl bg-secondary-100 p-8 rounded-xl mb-8 booking__wrapper">
        <h1>
          Parece que ingresaste a una página a la que:{' '}
          <span className="text-primary">no tienes acceso</span>{' '}
        </h1>
      </div>
    </div>
  );
};

export default NotFound2;
