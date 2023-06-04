import React, { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
// import "bootstrap/dist/css/bootstrap.min.css";

const Layout = () => {
  return (
    <Fragment className="container">
      <Helmet>
        {/* Estilos CSS */}
        <style>{`
          /* LANDING PAGE */
          /* ======= base style ====== */
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Source Sans Pro', sans-serif;
          }
          import "bootstrap/dist/css/bootstrap.min.css";

   /* ========= pre-define css ========= */
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            color: #000d6b;
            font-weight: 600;
            margin-bottom: 0;
          }

          h3,
          h4 {
            font-size: 1.6rem;
          }

          h5,
          h6 {
            font-size: 1.2rem;
          }

          a {
            text-decoration: none;
            color: unset;
          }

          a:hover {
            color: unset;
          }

          ul {
            margin: 0;
            list-style: none;
          }

          .section__title {
            color: #000d6b;
            font-weight: 600;
            font-size: 2rem;
          }

          .section__subtitle {
            color: #f9a826;
            font-weight: 600;
            font-size: 1.2rem;
          }

          .section__description {
            color: #7c8a97;
            font-size: 1.05rem;
            line-height: 30px;
          }

          section {
            padding: 50px 0px;
          }

          .btn {
            padding: 7px 15px;
            background: #000d6b;
            color: #fff;
            border: none;
            outline: none;
            border-radius: 5px;
            transition: 0.3s;
          }

          .btn:hover {
            color: #fff !important;
            background: #000c6bd0;
          }

          @media only screen and (max-width: 768px) {
            section {
              padding: 30px 0px;
            }

            .section__title {
              font-size: 1.6rem;
            }

            .section__subtitle {
              font-size: 1.1rem;
            }
        `}</style>
        {/* Fuentes */}
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400;600;700;900&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </Fragment>
  );
};

export default Layout;
