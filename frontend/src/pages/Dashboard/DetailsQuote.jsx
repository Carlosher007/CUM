import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import { getCar } from '../../assets/api/cars';
import { getQuotesByClient, getQuotesBySeller } from '../../assets/api/quote';
import { getUser } from '../../assets/api/user.api';
import { renderCState } from '../../assets/general/cotizationState';
import { formatPrice } from '../../assets/general/formatPrice';
import { urls } from '../../assets/urls/urls';

const DetailsQuote = () => {
  const cookies = new Cookies();
  const { idQuote } = useParams();
  const rol = cookies.get('rol');
  const id = cookies.get('id');
  const [seller, setSeller] = useState({});
  const [client, setClient] = useState({});
  const [car, setCar] = useState({});
  const [isPagar, setIsPagar] = useState(false);
  const typesOfPay = ['Tarjeta de Credito', 'Efecty', 'Banco'];
  const bankCount = '91838282'
  const effectyCount = '2836342';

  
  const [quote, setQuote] = useState([]);

  const formik = useFormik({
    initialValues: {
      wayPay:'',
      numberCC:'',
      dateExpectedCC:'',
      segurityCodeCC:'',
    },
    // validationSchema: createProfileValidation,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const { handleSubmit, handleChange, values, touched, errors } = formik;

  const getCarData = async (idCar) => {
    try {
      const { data } = await getCar(parseInt(idCar));
      setCar(data);
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        // Mostrar mensaje de error al usuario o tomar alguna acción según corresponda
        toast.error(data.error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  const getUserData = async (idSeller, idClient) => {
    try {
      const usel = await getUser(parseInt(idSeller));
      setSeller(usel.data);

      const ucli = await getUser(parseInt(idClient));
      setClient(ucli.data);
      console.log(ucli.data);
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        // Mostrar mensaje de error al usuario o tomar alguna acción según corresponda
        toast.error(data.error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  const getQuoteClient = async () => {
    try {
      const { data } = await getQuotesByClient(id, 'ALL');
      const quoteP = data.find(
        (item) => item.quotation.id === parseInt(idQuote)
      );
      setQuote(quoteP);
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        // Mostrar mensaje de error al usuario o tomar alguna acción según corresponda
        toast.error(data.error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  const getQuoteSeller = async () => {
    try {
      const { data } = await getQuotesBySeller(id, 'IN_PROGRESS');
      const quoteP = data.find(
        (item) => item.quotation.id === parseInt(idQuote)
      );
      setQuote(quoteP);
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        // Mostrar mensaje de error al usuario o tomar alguna acción según corresponda
        toast.error(data.error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  const getQuoteDataByRol = () => {
    if (rol === 'Cliente') {
      getQuoteClient();
    } else {
      getQuoteSeller();
    }
  };

  useEffect(() => {
    getQuoteDataByRol();
  }, []);

  useEffect(() => {
    if (quote && Object.keys(quote).length !== 0) {
      getUserData(quote.seller, quote.quotation.client);
      getCarData(quote.quotation.vehicle_sucursal.vehicle);
    }
  }, [quote]);

  if (!quote || Object.keys(quote).length === 0) {
    return null;
  }

  const acceptQuote = async () => {};

  const declineQuote = async () => {};

  return (
    <div>
      <div>
        <div className="bg-secondary-100 p-8 rounded-xl mb-8">
          <h2 className="text-3xl font-bold mb-4">Detalles de la cotizacion</h2>
          <table className="w-full ">
            <tbody>
              <tr className="hover:bg-secondary-200">
                <td className="font-bold pr-4 py-2">Estado:</td>
                <td className="py-2 text-right text-primary">
                  {renderCState(quote.state)}
                </td>
              </tr>
              {rol === 'Cliente' ? (
                <tr className="hover:bg-secondary-200">
                  <td className="font-bold pr-4 py-2">Nombre del vendedor:</td>
                  <td className="py-2 text-right">
                    {seller.full_name} - {seller.email}{' '}
                  </td>
                </tr>
              ) : (
                <tr className="hover:bg-secondary-200">
                  <td className="font-bold pr-4 py-2">Nombre del cliente:</td>
                  <td className="py-2 text-right">
                    {client.full_name} - {client.email}{' '}
                  </td>
                </tr>
              )}
              <tr className="hover:bg-secondary-200">
                <td className="font-bold pr-4 py-2">
                  Valor de la cuota inicial:
                </td>
                <td className="py-2 text-right">
                  {formatPrice(quote.quotation.num_installments)}
                </td>
              </tr>
              <tr className="hover:bg-secondary-200">
                <td className="font-bold pr-4 py-2">Numero de Cuotas:</td>
                <td className="py-2 text-right">
                  {quote.quotation.num_installments}
                </td>
              </tr>
              <tr className="hover:bg-secondary-200">
                <td className="font-bold pr-4 py-2">Valor de las cuotas:</td>
                <td className="py-2 text-right">
                  {formatPrice(quote.quotation.quota_value)}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="mt-6">
            {/* {rol !== 'Cliente' && quote.state === 'IN_PROGRESS' && (
              <div>
                <div className="flex justify-center space-x-4">
                  <button
                    className="bg-terciary/80 text-black py-2 px-4 rounded-lg hover:bg-terciary transition-colors"
                    onClick={acceptQuote}
                  >
                    Aceptar Cotización
                  </button>
                  <button
                    className="bg-quaternary/80 text-black py-2 px-4 rounded-lg hover:bg-quaternary transition-colors"
                    onClick={declineQuote}
                  >
                    Rechazar Cotización
                  </button>
                </div>
              </div>
            )} */}
            {/* {rol === 'Cliente' && quote.state === 'IN_PROGRESS' && (
              <div>
                <div className="flex justify-center space-x-4">
                  <p
                    className="text-primary/80 text-[20px] py-2 px-4 rounded-lg hover:text-primary/80 transition-colors"
                  >
                    A la espera de que el vendedor decida
                  </p>
                </div>
              </div>
            )} */}
            {/* {quote.state === 'CANCELLED' && (
              <div>
                <div className="flex justify-center space-x-4">
                  <p
                    className="text-primary/80 text-[20px] py-2 px-4 rounded-lg hover:text-primary/80 transition-colors"
                  >
                    La cotizacion ha sido cancelada por parte del vendedor
                  </p>
                </div>
              </div>
            )} */}
            {/* {rol!=='Cliente' && quote.state === 'ACCEPTED' && (
              <div>
                <div className="flex justify-center space-x-4">
                  <p
                    className="text-primary/80 text-[20px] py-2 px-4 rounded-lg hover:text-primary/80 transition-colors"
                  >
                    La cotizacion ha sido aceptada y aun no se ha pagado
                  </p>
                </div>
              </div>
            )}  */}
            {rol !== 'Cliente' && quote.state === 'IN_PROGRESS' && (
              <div>
                <div className="flex justify-center space-x-4">
                  <button
                    className="bg-terciary/80 text-black py-2 px-4 rounded-lg hover:bg-terciary transition-colors"
                    onClick={() => setIsPagar(true)}
                  >
                    Pagar
                  </button>
                </div>
              </div>
            )}
            {isPagar && (
              <div>
                <form>
                  {/* Type of Pay */}
                  <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
                    <div className="w-full md:w-1/4">
                      <p>
                        Forma de Pago <span className="text-red-500">*</span>
                      </p>
                    </div>
                    <div className="flex-1">
                      <select
                        className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                        value={values.rol}
                        onChange={handleChange}
                      >
                        <option value="">Seleccione un rol</option>
                        {rols.map((rol) => (
                          <option value={rol} key={rol}>
                            {rol}
                          </option>
                        ))}
                      </select>
                      {touched.rol && errors.rol && showErrorToast(errors.rol)}
                    </div>
                  </div>
                  {/* CC */}
                  <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
                    <div className="w-full md:w-1/4">
                      <p>Cedula</p>
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                        placeholder="Cedula"
                        name="id"
                        value={values.id}
                        onChange={handleChange}
                      />
                      {touched.id && errors.id && showErrorToast(errors.id)}
                    </div>
                  </div>
                  {/* FULL NAME */}
                  <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
                    <div className="w-full md:w-1/4">
                      <p>Nombre Completo</p>
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                        placeholder="Nombre(s)"
                        name="full_name"
                        value={values.full_name}
                        onChange={handleChange}
                      />
                      {touched.full_name &&
                        errors.full_name &&
                        showErrorToast(errors.full_name)}
                    </div>
                  </div>
                  {/* EMAIL */}
                  <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
                    <div className="w-full md:w-1/4">
                      <p>
                        Email <span className="text-red-500">*</span>
                      </p>
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                        placeholder="Email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                      />
                      {touched.email &&
                        errors.email &&
                        showErrorToast(errors.email)}
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <div className="bg-secondary-100 p-8 rounded-xl mb-8">
          <h2 className="text-3xl font-bold mb-4">Detalles del carro</h2>
          <table className="w-full ">
            <tbody>
              <tr className="hover:bg-secondary-200">
                <td className="font-bold pr-4 py-2">Modelo:</td>
                <td className="py-2">{car.model}</td>
              </tr>
              <tr className="hover:bg-secondary-200">
                <td className="font-bold pr-4 py-2">Año:</td>
                <td className="py-2">{car.year}</td>
              </tr>
              <tr className="hover:bg-secondary-200">
                <td className="font-bold pr-4 py-2">Marca:</td>
                <td className="py-2">{car.brand}</td>
              </tr>
              <tr className="hover:bg-secondary-200">
                <td className="font-bold pr-4 py-2">Carrocería:</td>
                <td className="py-2">{car.bodywork}</td>
              </tr>
              <tr className="hover:bg-secondary-200">
                <td className="font-bold pr-4 py-2">Puertas:</td>
                <td className="py-2">{car.doors}</td>
              </tr>
              <tr className="hover:bg-secondary-200">
                <td className="font-bold pr-4 py-2">Motor:</td>
                <td className="py-2">{car.motor}</td>
              </tr>
              <tr className="hover:bg-secondary-200">
                <td className="font-bold pr-4 py-2">Potencia:</td>
                <td className="py-2">{car.potency}</td>
              </tr>
              <tr className="hover:bg-secondary-200">
                <td className="font-bold pr-4 py-2">Autonomía:</td>
                <td className="py-2">{car.range}</td>
              </tr>
              <tr className="hover:bg-secondary-200">
                <td className="font-bold pr-4 py-2">
                  Capacidad de la batería:
                </td>
                <td className="py-2">{car.battery_capacity}</td>
              </tr>
              <tr className="hover:bg-secondary-200">
                <td className="font-bold pr-4 py-2">Tiempo de carga:</td>
                <td className="py-2">{car.charging_time}</td>
              </tr>
              <tr className="hover:bg-secondary-200">
                <td className="font-bold pr-4 py-2">Velocidad maxima:</td>
                <td className="py-2">{car.top_speed}</td>
              </tr>
              <tr className="hover:bg-secondary-200">
                <td className="font-bold pr-4 py-2">Frenos:</td>
                <td className="py-2">{car.brakes}</td>
              </tr>
              <tr className="hover:bg-secondary-200">
                <td className="font-bold pr-4 py-2">Suspension:</td>
                <td className="py-2">{car.suspension}</td>
              </tr>
            </tbody>
          </table>
          <div className="flex-1 flex justify-center items-center mt-10">
            <img
              src={car.image}
              className="w-[30rem] h-[15rem] object-cover rounded-lg"
              alt="Imagen subida"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-start">
        <Link
          className="bg-primary/80 text-black py-2 px-4 rounded-lg hover:bg-primary transition-colors"
          to={urls.myQuotes}
        >
          <i class="ri-arrow-left-line"></i> Volver
        </Link>
      </div>
    </div>
  );
};

export default DetailsQuote;
