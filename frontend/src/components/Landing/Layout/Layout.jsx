import React, { Fragment } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <Fragment>
      <Header />
      <div>
        <Outlet/>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Layout;
