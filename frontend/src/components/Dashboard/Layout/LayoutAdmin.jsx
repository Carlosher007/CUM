import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Outlet, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { urls } from '../../../assets/urls/urls';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import 'tailwindcss/tailwind.css';

const LayoutAdmin = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const token = cookies.get('token');

  useEffect(() => {
    console.log(token)
    if (token === undefined) {
      navigate(urls.home);
    }
  }, [navigate, token]);

  return (
    <div className="min-h-screen grid grid-cols-1 xl:grid-cols-6">
      <Helmet>
        {/* Estilos CSS */}
        <style>{`
          /* DASHBOARD */
        `}</style>
        {/* Fuentes */}
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <Sidebar />
      <div className="xl:col-span-5">
        <Header />
        <div className="h-[90vh] overflow-y-scroll p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
