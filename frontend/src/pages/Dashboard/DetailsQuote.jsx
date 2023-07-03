import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import { getCar } from '../../assets/api/cars';
import {
  acceptQuote,
  cancelQuote,
  finishQuote,
  getQuote,
  getQuotesByClient,
  getQuotesBySeller,
} from '../../assets/api/quote';
import { getUser } from '../../assets/api/user.api';
import { renderCState } from '../../assets/general/cotizationState';
import { formatPrice } from '../../assets/general/formatPrice';
import { urls } from '../../assets/urls/urls';
import { quoteValidation } from '../../assets/validation/QuoteValidation';

const DetailsQuote = () => {
  const cookies = new Cookies();
  const { idQuote, estado } = useParams();
  const rol = cookies.get('rol');
  const id = cookies.get('id');
  const [seller, setSeller] = useState({});
  const [client, setClient] = useState({});
  const [car, setCar] = useState({});
  const [isPagar, setIsPagar] = useState(false);
  const [dateExpectedCC, setDateExpectedCC] = useState('');
  const typesOfPay = ['CreditCard', 'Efecty', 'Bank'];
  const bankCount = '91838282';
  const effectyCount = '2836342';

  const [quote, setQuote] = useState([]);
  const [errorShown, setErrorShown] = useState(false);

  const finishQuoteData = async () => {
    try {
      const regex = /^(0[1-9]|1[0-2])-(\d{4})$/; // Expresión regular para verificar el formato "mes-año"

      if (values.wayPay === typesOfPay[0]) {
        if (!regex.test(dateExpectedCC)) {
          toast.error('Ponga un formato de fecha correcto', {
            position: toast.POSITION.TOP_RIGHT,
          });
          return;
        }
        if(values.numberCC===''){
            toast.error('Ponga el numero de tarjeta', {
              position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }
        if (values.segurityCodeCC === '') {
          toast.error('Ponga el codigo de seguridad', {
            position: toast.POSITION.TOP_RIGHT,
          });
          return;
        }
      }

      await finishQuote(idQuote);
      toast.success('Cotización finalizada', {
        position: toast.POSITION.TOP_RIGHT,
      });
      await getQuoteDataByRol();
      setIsPagar(false);
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

  const formik = useFormik({
    initialValues: {
      wayPay: typesOfPay[0],
      numberCC: '',
      dateExpectedCC: '',
      segurityCodeCC: '',
    },
    // validationSchema: quoteValidation,
    onSubmit: (values) => {
      finishQuoteData();
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

  const getUserData = async (idSeller, idClient) => {
    try {
      const usel = await getUser(parseInt(idSeller));
      setSeller(usel.data);

      const ucli = await getUser(parseInt(idClient));
      setClient(ucli.data);
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

  const getQuoteGerente = async () => {
    try {
      const { data } = await getQuote(idQuote);
      setQuote(data);
    } catch (error) {
      const { data } = error.response;
      Object.values(data).forEach((errorMessages) => {
        errorMessages.forEach((errorMessage) => {
          toast.error(errorMessage, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
      });
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

  const getQuoteSeller = async () => {
    try {
      const { data } = await getQuotesBySeller(id, 'ALL');
      const quoteP = data.find(
        (item) => item.quotation.id === parseInt(idQuote)
      );
      setQuote(quoteP);
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

  const getQuoteDataByRol = async () => {
    if (rol === 'Cliente') {
      await getQuoteClient();
    } else if (rol === 'Vendedor') {
      await getQuoteSeller();
    } else {
      await getQuoteGerente();
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

  const acceptQuoteData = async () => {
    try {
      await acceptQuote(idQuote);
      toast.success('Cotización aceptada', {
        position: toast.POSITION.TOP_RIGHT,
      });
      await getQuoteDataByRol();
    } catch (error) {
      const { data } = error.response;
      Object.values(data).forEach((errorMessages) => {
        errorMessages.forEach((errorMessage) => {
          toast.error(errorMessage, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
      });
    }
  };

  const declineQuote = async () => {
    try {
      await cancelQuote(idQuote);
      toast.success('Cotización rechazada', {
        position: toast.POSITION.TOP_RIGHT,
      });
      await getQuoteDataByRol();
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

  const showErrorToast = (message) => {
    if (!errorShown) {
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setErrorShown(true);
    }
  };

  const handleChangeDate = (e) => {
    const inputValue = e.target.value;
    setDateExpectedCC(inputValue);
  };

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
            <hr className="my-8 border-gray-500/30" />
            {rol !== 'Cliente' && quote.state === 'IN_PROGRESS' && (
              <div>
                <div className="flex justify-center space-x-4">
                  <button
                    className="bg-terciary/80 text-black py-2 px-4 rounded-lg hover:bg-terciary transition-colors"
                    onClick={() => {
                      acceptQuoteData();
                    }}
                  >
                    Aceptar Cotización
                  </button>
                  <button
                    className="bg-quaternary/80 text-black py-2 px-4 rounded-lg hover:bg-quaternary transition-colors"
                    onClick={() => {
                      declineQuote();
                    }}
                  >
                    Rechazar Cotización
                  </button>
                </div>
              </div>
            )}
            {rol === 'Cliente' && quote.state === 'IN_PROGRESS' && (
              <div>
                <div className="flex justify-center space-x-4">
                  <p className="text-primary/80 text-[20px] py-2 px-4 rounded-lg hover:text-primary/80 transition-colors">
                    A la espera de que el vendedor decida
                  </p>
                </div>
              </div>
            )}
            {quote.state === 'CANCELLED' && (
              <div>
                <div className="flex justify-center space-x-4">
                  <p className="text-primary/80 text-[20px] py-2 px-4 rounded-lg hover:text-primary/80 transition-colors">
                    La cotizacion ha sido cancelada por parte del vendedor
                  </p>
                </div>
              </div>
            )}
            {rol !== 'Cliente' && quote.state === 'ACCEPTED' && (
              <div>
                <div className="flex justify-center space-x-4">
                  <p className="text-primary/80 text-[20px] py-2 px-4 rounded-lg hover:text-primary/80 transition-colors">
                    La cotizacion ha sido aceptada y aun no se ha pagado
                  </p>
                </div>
              </div>
            )}
            {quote.state === 'FINISHED' && (
              <div>
                <div className="flex justify-center space-x-4">
                  <p className="text-primary/80 text-[20px] py-2 px-4 rounded-lg hover:text-primary/80 transition-colors">
                    El vehiculo se ha comprado
                  </p>
                </div>
              </div>
            )}
            {rol === 'Cliente' && !isPagar && quote.state === 'ACCEPTED' && (
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
                        name="wayPay"
                        value={values.wayPay}
                        onChange={handleChange}
                      >
                        {/* <option value="">Seleccione un rol</option> */}
                        {typesOfPay.map((way) => (
                          <option value={way} key={way}>
                            {way}
                          </option>
                        ))}
                      </select>
                      {touched.wayPay &&
                        errors.wayPay &&
                        showErrorToast(errors.wayPay)}
                    </div>
                  </div>

                  {values.wayPay === 'CreditCard' && (
                    <>
                      <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
                        <div className="w-full md:w-1/4">
                          <p>Numero de la tarjeta</p>
                        </div>
                        <div className="flex-1">
                          <input
                            type="text"
                            className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                            placeholder="Numero de la tarjeta"
                            name="numberCC"
                            value={values.numberCC}
                            onChange={handleChange}
                            maxLength={16}
                          />
                          {touched.numberCC &&
                            errors.numberCC &&
                            showErrorToast(errors.numberCC)}
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
                        <div className="w-full md:w-1/4">
                          <p>Fecha de expedicion</p>
                        </div>
                        <div className="flex-1">
                          <input
                            type="text"
                            className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                            placeholder="MM-AAAA"
                            name="dateExpectedCC"
                            value={dateExpectedCC}
                            onChange={handleChangeDate}
                            maxLength={7}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
                        <div className="w-full md:w-1/4">
                          <p>Codigo de seguridad</p>
                        </div>
                        <div className="flex-1">
                          <input
                            type="text"
                            className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                            placeholder="Codigo de seguridad"
                            name="segurityCodeCC"
                            value={values.segurityCodeCC}
                            onChange={handleChange}
                            maxLength={4}
                          />
                          {touched.segurityCodeCC &&
                            errors.segurityCodeCC &&
                            showErrorToast(errors.segurityCodeCC)}
                        </div>
                      </div>
                    </>
                  )}

                  {values.wayPay === 'Efecty' && (
                    <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
                      <div className="w-full md:w-1/4">
                        <p>Numero de Cuenta a consignar</p>
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                          value={effectyCount}
                          disabled={true}
                        />
                      </div>
                    </div>
                  )}

                  {values.wayPay === 'Bank' && (
                    <div className="flex flex-col md:flex-row md:items-center gap-y-2 mb-8">
                      <div className="w-full md:w-1/4">
                        <p>Numero de Cuenta a consignar</p>
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
                          value={bankCount}
                          disabled={true}
                        />
                      </div>
                    </div>
                  )}

                  {rol === 'Cliente' &&
                    isPagar &&
                    quote.state === 'ACCEPTED' && (
                      <div>
                        <div className="flex justify-center space-x-4">
                          <button
                            type="submit"
                            className="bg-primary/80 text-black py-2 px-4 rounded-lg hover:bg-primary transition-colors"
                            onClick={(event) => {
                              event.preventDefault(); // Evita el comportamiento predeterminado del botón
                              handleSubmit(); // Ejecuta la función handleSubmit
                            }}
                          >
                            Proceder con el pago
                          </button>
                        </div>
                      </div>
                    )}
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

      {estado === '1' ? (
        <div className="flex justify-start">
          <Link
            className="bg-primary/80 text-black py-2 px-4 rounded-lg hover:bg-primary transition-colors"
            to={urls.home2}
          >
            <i className="ri-arrow-left-line"></i> Volver
          </Link>
        </div>
      ) : (
        <div className="flex justify-start">
          <Link
            className="bg-primary/80 text-black py-2 px-4 rounded-lg hover:bg-primary transition-colors"
            to={urls.allQuotes}
          >
            <i className="ri-arrow-left-line"></i> Volver
          </Link>
        </div>
      )}
    </div>
  );
};

export default DetailsQuote;
