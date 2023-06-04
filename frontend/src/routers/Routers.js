import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { urls } from '../assets/urls/urls';
import LayoutAdmin from '../components/Dashboard/Layout/LayoutAdmin.jsx';
import Layout from '../components/Landing/Layout/Layout.jsx';
import ForgetPassword from '../pages/Auth/ForgetPassword';
import Login from '../pages/Auth/Login';
import Chat from '../pages/Dashboard/Chat';
import HomeD from '../pages/Dashboard/HomeD';
import Profile from '../pages/Dashboard/Profile';
import Tickets from '../pages/Dashboard/Tickets';
import CarDetails from '../pages/Landing/CarDetails';
import CarListing from '../pages/Landing/CarListing';
import Contact from '../pages/Landing/Contact';
import Home from '../pages/Landing/Home';
import NotFound from '../pages/Landing/NotFound';
import Offices from '../pages/Landing/Offices';
import PresentialQuote from '../pages/Landing/PresentialQuote';


const Routers = () => {
  return (
    <Routes>
      <Route path={urls.login} element={<Login />} />
      <Route path="*" element={<NotFound />} />
      <Route path={urls.forgetPassword} element={<ForgetPassword />} />
      <Route path="/" element={<Navigate to="/landing/home" />} />

      <Route path="/landing" element={<Layout />}>
        <Route path="/landing" element={<Navigate to={urls.home} />} />
        <Route path={urls.home} element={<Home />} />
        <Route path={urls.seeCars} element={<CarListing />} />
        <Route path={urls.seeCar} element={<CarDetails />} />
        <Route path={urls.contact} element={<Contact />} />
        <Route path={urls.presentialquote} element={<PresentialQuote />} />
        <Route path={urls.offices} element={<Offices />} />
      </Route>

      <Route path="/dashboard" element={<LayoutAdmin />}>
        <Route path="/dashboard" element={<Navigate to={urls.home2} />} />
        <Route path={urls.home2} element={<HomeD />} />
        <Route path={urls.profile} element={<Profile />} />
        <Route path={urls.chat} element={<Chat />} />
        <Route path={urls.tickets} element={<Tickets />} />
      </Route>
    </Routes>
  );
};

export default Routers;
