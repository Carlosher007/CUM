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

  const deleteCookies = () => {
    cookies.set('token', undefined, {
      path: '/',
      sameSite: 'None',
      secure: true,
    });
    cookies.set('id', undefined, {
      path: '/',
      sameSite: 'None',
      secure: true,
    });
    cookies.set('rol', undefined, {
      path: '/',
      sameSite: 'None',
      secure: true,
    });
    cookies.set('email', undefined, {
      path: '/',
      sameSite: 'None',
      secure: true,
    });
    cookies.set('full_name', undefined, {
      path: '/',
      sameSite: 'None',
      secure: true,
    });
    cookies.set('sucursal', undefined, {
      path: '/',
      sameSite: 'None',
      secure: true,
    });
  };

  const handleLogout = async () => {
    try {
      const response = await logout(token);
      const { data } = response;
      await new Promise((resolve) => {
        deleteCookies();
        resolve();
      });

      navigate(urls.home);
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        if (Array.isArray(data)) {
          data.forEach((errorMessage) => {
            toast.error(errorMessage, {
              position: toast.POSITION.TOP_RIGHT,
            });
          });
        } else {
          if (data.error) {
            toast.error(data.error, {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        }
      }
    }
  };

  const [showMenu, setShowMenu] = useState(false);

  const sidebarRef = useRef();
  const buttonRef = useRef();

  const navLinks = [
    {
      display: 'Sobre mí',
      role: ['Anyone'],
      sublinks: [
        {
          path: urls.profile,
          display: 'Perfil',
          role: ['Anyone'],
        },
        {
          path: urls.myQuotes,
          display: 'Mis cotizaciones ',
          role: ['Cliente'],
        },
        {
          path: urls.myCars,
          display: 'Mis Carros',
          role: ['Cliente'],
        },
        {
          path: urls.allWorkOrders,
          display: 'Ordenes de Trabajo',
          role: ['Cliente'],
        },
      ],
    },
    {
      display: 'Cotizaciones',
      role: ['Cliente', 'Vendedor', 'Gerente'],
      sublinks: [
        {
          path: urls.seeCarsD,
          display: 'Cotizar carros',
          role: ['Cliente'],
        },
        {
          path: urls.allQuotes,
          display: 'Todas las cotizaciones ',
          role: ['Gerente'],
        },
        {
          path: urls.myQuotes,
          display: 'Cotizaciones asignada ',
          role: ['Vendedor'],
        },
      ],
    },
    {
      display: 'Mi Sucursal',
      role: ['Gerente'],
      sublinks: [
        {
          path: urls.allUsers,
          display: 'Ver Usuarios',
          role: ['Gerente'],
        },
        {
          path: urls.newSucursal,
          display: 'Crear Sucursal',
          role: ['Gerente'],
        },
        {
          path: urls.newUser,
          display: 'Crear Usuario',
          role: ['Gerente'],
        },
      ],
    },
    {
      display: 'Vehiculos',
      role: ['Gerente', 'JefeTaller', 'Vendedor'],
      sublinks: [
        {
          path: urls.seeCarsD,
          display: 'Ver vehiculos',
          role: ['Gerente', 'JefeTaller', 'Vendedor'],
        },
        {
          path: urls.newVehicle,
          display: 'Añadir un vehiculo',
          role: ['Gerente'],
        },
      ],
    },
    {
      display: 'Repuestos',
      role: ['Gerente', 'JefeTaller'],
      sublinks: [
        {
          path: urls.seeParts,
          display: 'Ver repuestos',
          role: ['Gerente', 'JefeTaller'],
        },
        {
          path: urls.newPart,
          display: 'Añadir reuestos',
          role: ['Gerente', 'JefeTaller'],
        },
      ],
    },
    {
      display: 'Ordenes T.',
      role: ['Gerente', 'JefeTaller'],
      sublinks: [
        {
          path: urls.allWorkOrders,
          display: 'Ver Ordenes de Trabajo',
          role: ['Gerente', 'JefeTaller'],
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
