import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { urls } from '../assets/urls/urls';
import CarDetails from '../pages/CarDetails';
import CarListing from '../pages/CarListing';
import Contact from '../pages/Contact';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import PresentialQuote from '../pages/PresentialQuote';

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path={urls.home} element={<Home />} />
      <Route path={urls.seeCars} element={<CarListing />} />
      <Route path={urls.seeCar} element={<CarDetails />} />
      <Route path={urls.contact} element={<Contact />} />
      <Route path="*" element={<NotFound />} />
      <Route path={urls.presentialquote} element={<PresentialQuote />} />
    </Routes>
  );
};

export default Routers;
