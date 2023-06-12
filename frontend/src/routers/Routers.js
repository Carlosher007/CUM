import React from 'react';
import Cookies from 'universal-cookie';
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
import NewSucursal from '../pages/Dashboard/NewSucursal';
import NewVehicle from '../pages/Dashboard/NewVehicle';

const Routers = () => {
  const cookies = new Cookies();
  const token = cookies.get('token');
  const rol = 'Cliente'//cookies.get('rol');

  /*
  Available roles:
  Gerente
  JefeTaller
  Vendedor
  Cliente
  Anyone
  */

  const FilterPage = ({children, roles}) => {
    if (roles.include(rol)) {
      return <>{children}</>;
    } else return <NotFound />;
  }

// <Offices />
  return (
    <Routes>
      <Route path={urls.login} element={
          <FilterPage
            roles = {[]}
          >
            <Login />
          </FilterPage>}
        />
      <Route path="*" element={<NotFound />} />
      <Route path={urls.forgetPassword} element={
          <FilterPage
            roles = {[]}
          >
            <ForgetPassword />
          </FilterPage>}
        />
      <Route path="/" element={<Navigate to="/landing/home" />} />

      <Route path="/landing" element={<Layout />}>
        <Route path="/landing" element={<Navigate to={urls.home} />} />
        <Route path={urls.home} element={
          <FilterPage
            roles = {[]}
          >
            <Home />
          </FilterPage>}
        />
        <Route path={urls.seeCars} element={
          <FilterPage
            roles = {[]}
          >
            <CarListing />
          </FilterPage>}
        />
        <Route path={urls.seeCar} element={
          <FilterPage
            roles = {[]}
          >
            <CarDetails />
          </FilterPage>}
        />
        <Route path={urls.contact} element={
          <FilterPage
            roles = {[]}
          >
            <Contact />
          </FilterPage>}
        />
        <Route path={urls.presentialquote} element={
          <FilterPage
            roles = {[]}
          >
            <PresentialQuote />
          </FilterPage>}
        />
        <Route path={urls.offices} element={
          <FilterPage
            roles = {[]}
          >
            <Offices />
          </FilterPage>}
        />
      </Route>

      <Route path="/dashboard" element={<LayoutAdmin />}>
        <Route path="/dashboard" element={<Navigate to={urls.home2} />} />
        <Route path={urls.home2} element={
          <FilterPage
            roles = {[]}
          >
            <HomeD />
          </FilterPage>}
        />
        <Route path={urls.profile} element={
          <FilterPage
            roles = {[]}
          >
            <Profile />
          </FilterPage>}
        />
        <Route path={urls.seeCarsD} element={
          <FilterPage
            roles = {[]}
          >
            <CarListingD />
          </FilterPage>}
        />
        <Route path={urls.seeCarD} element={
          <FilterPage
            roles = {[]}
          >
            <CarDetailsD />
          </FilterPage>}
        />
        <Route path={urls.presentialquoteD} element={
          <FilterPage
            roles = {[]}
          >
            <PresentialQuoteD />
          </FilterPage>}
        />
        <Route path={urls.allUsers} element={
          <FilterPage
            roles = {[]}
          >
            <AllUsers />
          </FilterPage>}
        />
        <Route path={urls.editUser} element={
          <FilterPage
            roles = {[]}
          >
            <EditUser />
          </FilterPage>}
        />
        <Route path={urls.newUser} element={
          <FilterPage
            roles = {[]}
          >
            <NewUser />
          </FilterPage>}
        />
        <Route path={urls.newSucursal} element={
          <FilterPage
            roles = {[]}
          >
            <NewSucursal />
          </FilterPage>}
        />
        <Route path={urls.newVehicle} element={
          <FilterPage
            roles = {[]}
          >
            <NewVehicle />
          </FilterPage>}
        />
      </Route>
    </Routes>
  );
};

export default Routers;
