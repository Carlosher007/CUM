import React from 'react';
import PresentialQuoteFormD from '../../components/Dashboard/UI/PresentialQuoteFormD';

const PresentialQuoteD = () => {
  return (
    <>
      <div className="bg-secondary-100 p-8 rounded-xl mb-8">
        <h5 className="text-3xl font-bold">
          Registra tus datos para la cotización presencial
        </h5>
        <PresentialQuoteFormD />
      </div>
    </>
  );
};

export default PresentialQuoteD;
