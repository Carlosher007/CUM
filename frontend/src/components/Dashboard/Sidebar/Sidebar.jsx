import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
// Icons
import {
  RiArrowRightSLine,
  RiBarChart2Line,
  RiCloseLine,
  RiEarthLine,
  RiLogoutCircleRLine,
  RiMenu3Line,
} from 'react-icons/ri';
import Cookies from 'universal-cookie';
import { logout } from '../../../assets/api/login.api';
import { urls } from '../../../assets/urls/urls';

const Sidebar = () => {
  const cookies = new Cookies();
  const userRole = cookies.get('rol');
  const token = cookies.get('token');
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logout(token);
      const { data } = response;
      console.log(data);
      cookies.remove('token');
      cookies.remove('id');
      cookies.remove('rol');
      cookies.remove('email');
      cookies.remove('full_name');
      cookies.remove('address');
      cookies.remove('sucursal');
      cookies.remove('is_superuser');
      navigate(urls.home);
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        console.log(data);
      }
    }
  };

  const [showMenu, setShowMenu] = useState(false);

  const sidebarRef = useRef();
  const buttonRef = useRef();

  const navLinks = [
    // {
    //   path: urls.seeCarsD,
    //   display: 'Ver Carros',
    //   role: ['Gerente', 'Vendedor', 'Cliente'],
    // },
    {
      display: 'Sobre mí',
      role: ['Anyone'],
      sublinks: [
        {
          path: urls.profile,
          display: 'Perfil',
          role: ['Anyone'],
        },
      ],
    },
    {
      display: 'Cotizar',
      role: ['Anyone'],
      sublinks: [
        {
          path: urls.seeCarsD,
          display: 'Ver Carros',
          role: ['Anyone'],
        },
        // {
        //   path: urls.presentialquoteD,
        //   display: 'Cotizar Presencialmente',
        //   role: ['Anyone'],
        // },
        {
          path: urls.myQuotes,
          display: 'Mis cotizaciones ',
          role: ['Anyone'],
        },
        {
          path: urls.allQuotes,
          display: 'Todas las cotizaciones ',
          role: ['Anyone'],
        },
      ],
    },
    {
      display: 'Sucursal',
      role: ['Anyone'],
      sublinks: [
        {
          path: urls.allUsers,
          display: 'Usuarios',
          role: ['Anyone'],
        },
        {
          path: urls.newSucursal,
          display: 'Crear Sucursal',
          role: ['Anyone'],
        },
        {
          path: urls.newUser,
          display: 'Crear Usuario',
          role: ['Anyone'],
        },
      ],
    },
    {
      display: 'Vehiculos',
      role: ['Anyone'],
      sublinks: [
        {
          path: urls.seeCarsD,
          display: 'Ver vehiculos',
          role: ['Anyone'],
        },
        {
          path: urls.newVehicle,
          display: 'Añadir un vehiculo',
          role: ['Anyone'],
        },
        {
          path: urls.myCars,
          display: 'Mis Carros',
          role: ['Anyone'],
        },
      ],
    },
    {
      display: 'Repuestos',
      role: ['Anyone'],
      sublinks: [
        {
          path: urls.seeParts,
          display: 'Ver repuestos',
          role: ['Anyone'],
        },
        {
          path: urls.newPart,
          display: 'Añadir reuestos',
          role: ['Anyone'],
        },
      ],
    },
  ];

  const filteredNavLinks = navLinks.filter((link) => {
    if (link.role.includes(userRole) || link.role.includes('Anyone')) {
      if (link.sublinks) {
        const filteredSublinks = link.sublinks.filter((sublink) => {
          return (
            sublink.role.includes(userRole) || sublink.role.includes('Anyone')
          );
        });
        link.sublinks = filteredSublinks;
      }
      return true;
    }
    return false;
  });

  const [subMenuStates, setSubMenuStates] = useState(
    new Array(filteredNavLinks.length).fill(false)
  );

  const toggleSubMenu = (index) => {
    const newSubMenuStates = [...subMenuStates];
    newSubMenuStates[index] = !newSubMenuStates[index];
    setSubMenuStates(newSubMenuStates);
  };

  useEffect(() => {
    const handleCloseSidebar = () => {
      setShowMenu(false);
      setSubMenuStates(new Array(filteredNavLinks.length).fill(false));
    };

    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        handleCloseSidebar();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        ref={sidebarRef}
        className={`xl:h-[100vh] overflow-y-scroll fixed xl:static w-[80%] md:w-[40%] lg:w-[30%] xl:w-auto h-full top-0 bg-secondary-100 p-4 flex flex-col justify-between z-50 ${
          showMenu ? 'left-0' : '-left-full'
        } transition-all`}
      >
        <div>
          <h1 className="text-center text-2xl font-bold text-white mb-10">
            <Link to={urls.home2}>
              Dashboard<span className="text-primary text-4xl">.</span>
            </Link>
          </h1>
          <ul>
            {filteredNavLinks.map((link, index) => (
              <li key={index}>
                {link.sublinks ? (
                  <>
                    <button
                      onClick={() => toggleSubMenu(index)}
                      className="w-full flex items-center justify-between py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
                    >
                      <span className="flex items-center gap-4">
                        <RiEarthLine className="text-primary" /> {link.display}
                      </span>
                      <RiArrowRightSLine
                        className={`mt-1 ${
                          subMenuStates[index] && 'rotate-90'
                        } transition-all`}
                      />
                    </button>
                    <ul
                      className={`${
                        subMenuStates[index] ? 'h-auto' : 'h-0'
                      } overflow-y-hidden transition-all`}
                    >
                      {link.sublinks.map((sublink, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            to={sublink.path}
                            className="py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white transition-colors"
                          >
                            {sublink.display}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link
                    to={link.path}
                    className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
                  >
                    <RiBarChart2Line className="text-primary" /> {link.display}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
        <nav>
          <Link
            to={urls.home}
            className="flex items-center gap-4 py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors"
            onClick={handleLogout}
          >
            <RiLogoutCircleRLine className="text-primary" /> Cerrar sesión
          </Link>
        </nav>
      </div>
      <button
        ref={buttonRef}
        onClick={(event) => {
          event.stopPropagation();
          setShowMenu(!showMenu);
        }}
        className="xl:hidden fixed bottom-4 right-4 bg-primary text-black p-3 rounded-full z-50"
      >
        {showMenu ? <RiCloseLine /> : <RiMenu3Line />}
      </button>
    </>
  );
};

export default Sidebar;
