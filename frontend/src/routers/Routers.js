import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { urls } from '../assets/urls/urls';
import LayoutAdmin from '../components/Dashboard/Layout/LayoutAdmin.jsx';
import EditUser from '../components/Dashboard/UI/EditUser';
import Layout from '../components/Landing/Layout/Layout.jsx';
import ForgetPassword from '../pages/Auth/ForgetPassword';
import Login from '../pages/Auth/Login';
import AllUsers from '../pages/Dashboard/AllUsers';
import CarDetailsD from '../pages/Dashboard/CarDetailsD';
import CarListingD from '../pages/Dashboard/CarListingD';
import EditVehicle from '../pages/Dashboard/EditVehicle';
import HomeD from '../pages/Dashboard/HomeD';
import NewSucursal from '../pages/Dashboard/NewSucursal';
import NewUser from '../pages/Dashboard/NewUser';
import NewVehicle from '../pages/Dashboard/NewVehicle';
import NewPart from '../pages/Dashboard/NewPart';
import PartsListing from '../pages/Dashboard/PartsListing';
import PresentialQuoteD from '../pages/Dashboard/PresentialQuoteD';
import Profile from '../pages/Dashboard/Profile';
import CarDetails from '../pages/Landing/CarDetails';
import CarListing from '../pages/Landing/CarListing';
import Contact from '../pages/Landing/Contact';
import Home from '../pages/Landing/Home';
import NotFound from '../pages/Landing/NotFound';
import Offices from '../pages/Landing/Offices';
import PresentialQuote from '../pages/Landing/PresentialQuote';
import EditPart from '../pages/Dashboard/EditPart';
import MyQuotes from '../pages/Dashboard/MyQuotes';
import DetailsQuote from '../pages/Dashboard/DetailsQuote';
import AllQuotes from '../pages/Dashboard/AllQuotes';
import MyCars from '../pages/Dashboard/MyCars';
import MyCar from '../pages/Dashboard/MyCar';
import AllWorkOrders from '../pages/Dashboard/AllWorkOrders';
import WorkOrderDetails from '../pages/Dashboard/WorkOrderDetails';

const Routers = () => {
  const cookies = new Cookies();
  const token = cookies.get('token');
  const rol = cookies.get('rol');
  /*
  Available roles:
  Gerente
  JefeTaller
  Vendedor
  Cliente
  Anyone
  */

  const FilterPage = ({ children, roles }) => {
    if (roles.includes(rol) || roles.length === 0) {
      return <>{children}</>;
    } else {
      return <NotFound />;
    }
  };

  // <Offices />
  return (
    <Routes>
      <Route
        path={urls.login}
        element={
          <FilterPage roles={[]}>
            <Login />
          </FilterPage>
        }
      />
      <Route path="*" element={<NotFound />} />
      <Route
        path={urls.forgetPassword}
        element={
          <FilterPage roles={[]}>
            <ForgetPassword />
          </FilterPage>
        }
      />

      {token !== null && !isNaN(token) ? (
        <Route path="/" element={<Navigate to={urls.home} />} />
      ) : (
        <Route path="/" element={<Navigate to={urls.home2} />} />
      )}

      <Route path="/landing" element={<Layout />}>
        <Route path="/landing" element={<Navigate to={urls.home} />} />
        <Route
          path={urls.home}
          element={
            <FilterPage roles={[]}>
              <Home />
            </FilterPage>
          }
        />
        <Route
          path={urls.seeCars}
          element={
            <FilterPage roles={[]}>
              <CarListing />
            </FilterPage>
          }
        />
        <Route
          path={urls.seeCar}
          element={
            <FilterPage roles={[]}>
              <CarDetails />
            </FilterPage>
          }
        />
        <Route
          path={urls.contact}
          element={
            <FilterPage roles={[]}>
              <Contact />
            </FilterPage>
          }
        />
        <Route
          path={urls.presentialquote}
          element={
            <FilterPage roles={[]}>
              <PresentialQuote />
            </FilterPage>
          }
        />
        <Route
          path={urls.offices}
          element={
            <FilterPage roles={[]}>
              <Offices />
            </FilterPage>
          }
        />
      </Route>

      <Route path="/dashboard" element={<LayoutAdmin />}>
        <Route path="/dashboard" element={<Navigate to={urls.home2} />} />
        <Route
          path={urls.home2}
          element={
            <FilterPage roles={[]}>
              <HomeD />
            </FilterPage>
          }
        />
        <Route
          path={urls.profile}
          element={
            <FilterPage roles={[]}>
              <Profile />
            </FilterPage>
          }
        />
        <Route
          path={urls.seeCarsD}
          element={
            <FilterPage roles={[]}>
              <CarListingD />
            </FilterPage>
          }
        />
        <Route
          path={urls.seeCarD}
          element={
            <FilterPage roles={[]}>
              <CarDetailsD />
            </FilterPage>
          }
        />
        <Route
          path={urls.presentialquoteD}
          element={
            <FilterPage roles={['Cliente']}>
              <PresentialQuoteD />
            </FilterPage>
          }
        />
        <Route
          path={urls.allUsers}
          element={
            <FilterPage roles={['Gerente']}>
              <AllUsers />
            </FilterPage>
          }
        />
        <Route
          path={urls.editUser}
          element={
            <FilterPage roles={[]}>
              <EditUser />
            </FilterPage>
          }
        />
        <Route
          path={urls.newUser}
          element={
            <FilterPage roles={['Gerente']}>
              <NewUser />
            </FilterPage>
          }
        />
        <Route
          path={urls.newSucursal}
          element={
            <FilterPage roles={['Gerente']}>
              <NewSucursal />
            </FilterPage>
          }
        />
        <Route
          path={urls.newVehicle}
          element={
            <FilterPage roles={['Gerente']}>
              <NewVehicle />
            </FilterPage>
          }
        />
        <Route
          path={urls.editVehicle}
          element={
            <FilterPage roles={[]}>
              <EditVehicle />
            </FilterPage>
          }
        />
        <Route
          path={urls.seeParts}
          element={
            <FilterPage roles={['Gerente','JefeTaller']}>
              <PartsListing />
            </FilterPage>
          }
        />
        <Route
          path={urls.newPart}
          element={
            <FilterPage roles={['Gerente','JefeTaller']}>
              <NewPart />
            </FilterPage>
          }
        />
        <Route
          path={urls.editPart}
          element={
            <FilterPage roles={[]}>
              <EditPart />
            </FilterPage>
          }
        />
        <Route
          path={urls.myQuotes}
          element={
            <FilterPage roles={['Cliente', 'Vendedor']}>
              <MyQuotes />
            </FilterPage>
          }
        />
        <Route
          path={urls.seeQuote}
          element={
            <FilterPage roles={[]}>
              <DetailsQuote />
            </FilterPage>
          }
        />
        <Route
          path={urls.allQuotes}
          element={
            <FilterPage roles={['Gerente']}>
              <AllQuotes />
            </FilterPage>
          }
        />
        <Route
          path={urls.myCars}
          element={
            <FilterPage roles={['Cliente']}>
              <MyCars />
            </FilterPage>
          }
        />
        <Route
          path={urls.myCar}
          element={
            <FilterPage roles={[]}>
              <MyCar />
            </FilterPage>
          }
        />
        <Route
          path={urls.allWorkOrders}
          element={
            <FilterPage roles={['Gerente','JefeTaller',]}>
              <AllWorkOrders />
            </FilterPage>
          }
        />
        <Route
          path={urls.seeWorkOrder}
          element={
            <FilterPage roles={[]}>
              <WorkOrderDetails />
            </FilterPage>
          }
        />
      </Route>
    </Routes>
  );
};

export default Routers;
