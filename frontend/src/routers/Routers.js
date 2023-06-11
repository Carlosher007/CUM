import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { urls } from '../assets/urls/urls';
import LayoutAdmin from '../components/Dashboard/Layout/LayoutAdmin.jsx';
import Layout from '../components/Landing/Layout/Layout.jsx';
import ForgetPassword from '../pages/Auth/ForgetPassword';
import Login from '../pages/Auth/Login';
import HomeD from '../pages/Dashboard/HomeD';
import Profile from '../pages/Dashboard/Profile';
import CarDetails from '../pages/Landing/CarDetails';
import CarListing from '../pages/Landing/CarListing';
import Contact from '../pages/Landing/Contact';
import Home from '../pages/Landing/Home';
import NotFound from '../pages/Landing/NotFound';
import Offices from '../pages/Landing/Offices';
import PresentialQuote from '../pages/Landing/PresentialQuote';
import CarListingD from '../pages/Dashboard/CarListingD';
import CarDetailsD from '../pages/Dashboard/CarDetailsD';
import PresentialQuoteD from '../pages/Dashboard/PresentialQuoteD';
import AllUsers from '../pages/Dashboard/AllUsers';
import EditUser from '../components/Dashboard/UI/EditUser';
import NewUser from '../pages/Dashboard/NewUser';
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
        <Route path={urls.seeCarsD} element={<CarListingD />} />
        <Route path={urls.seeCarD} element={<CarDetailsD />} />
        <Route path={urls.presentialquoteD} element={<PresentialQuoteD />} />
        <Route path={urls.allUsers} element={<AllUsers />} />
        <Route path={urls.editUser} element={<EditUser />} />
        <Route path={urls.newUser} element={<NewUser />} />
      </Route>
    </Routes>
  );
};

export default Routers;
