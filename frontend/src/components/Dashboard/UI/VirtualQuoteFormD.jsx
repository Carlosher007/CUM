import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, FormGroup, FormText, Input } from 'reactstrap';
import Cookies from 'universal-cookie';
import { getCarByColor } from '../../../assets/api/cars';
import { createQuote } from '../../../assets/api/quote';
import { getSucursals } from '../../../assets/api/sucursal.api';
import { formatPrice } from '../../../assets/general/formatPrice';
import { urls } from '../../../assets/urls/urls';
import { virtualQuoteValidation } from '../../../assets/validation/VirtualQuoteValidation';

const VirtualQuoteFormD = ({ slug, selectedColor, price }) => {
  const cookies = new Cookies();
  const idClient = cookies.get('id');
  const idSucursal = cookies.get('sucursal');
  const navigate = useNavigate();

  const [sucursals, setSucursals] = useState([]);
  const [showValueCotization, setShowValueCotization] = useState(false);
  const [lifeSegure, setLifeSegure] = useState('');
  const [valueMensualDue, setValueMensualDue] = useState('');
  const tasa = 0.0185;
  const [valueTotal, setValueTotal] = useState('');
  const [isQuantity, setIsQuantity] = useState(false);

  useEffect(() => {
    const getVehicleByColor = async () => {
      try {
        const colorSinNumeral = selectedColor.slice(1); // Utilizando slice())
        if (colorSinNumeral !== '') {
          const { data } = await getCarByColor(
            idSucursal,
            slug,
            colorSinNumeral
          );
          console.log(data);
          setIsQuantity(data.quantity >= 1);
          formik.setFieldValue('vehicle_sucursal', data.id);
        }
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
    getVehicleByColor();
  }, [selectedColor]);

  useEffect(() => {
    formik.setFieldValue('color', selectedColor); // Actualiza el valor en formik cuando selectedColor cambie
  }, [selectedColor]);

  useEffect(() => {
    const getSucursalsData = async () => {
      try {
        const { data } = await getSucursals();
        setSucursals(data);
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
    getSucursalsData();
  }, []);

  const calculateQuote = async (values) => {
    const lendValue = price - values.initial_fee;
    const tasa = 0.0185; // Tasa del 1.85% en forma decimal
    const numeroCuotas = values.num_installments;
    const segureLife = 71800;

    const dueValue =
      (lendValue * tasa) / (1 - Math.pow(1 + tasa, -numeroCuotas));
    const roundedDueValue = parseInt(Math.ceil(dueValue));

    const totalValue = dueValue + segureLife;
    const roundedTotalValue = parseInt(Math.ceil(totalValue));

    setLifeSegure(segureLife);
    setValueMensualDue(roundedDueValue);
    setValueTotal(roundedTotalValue);
    setShowValueCotization(true);

    formik.setFieldValue('quota_value', roundedTotalValue);
  };

  const formik = useFormik({
    initialValues: {
      initial_fee: '',
      num_installments: '',
      quota_value: '',
      vehicle_sucursal: '',
      color: selectedColor,
      client: idClient,
    },
    validationSchema: virtualQuoteValidation,
    onSubmit: (values) => {
      if (!isQuantity) {
        toast.error(
          'Lo sentimos, el carro actualmente no cuenta con stock en este momento',
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
        return;
      }
      if(values.initial_fee>price){
        toast.error(
          'La cutoa inicial no puede sobrepasar el valor del precio del carro',
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
        return;
      }

      calculateQuote(values);
    },
  });

  const { handleSubmit, handleChange, values, touched, errors } = formik;

  const [errorShown, setErrorShown] = useState(false);

  const showErrorToast = (message) => {
    if (!errorShown) {
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setErrorShown(true);
    }
  };

  const resetErrorShown = () => {
    setErrorShown(false);
  };

  const handleCancel = () => {
    setShowValueCotization(false);
  };

  const handleQuote = () => {
    const sendQuote = async () => {
      try {
        console.log(values);
        const { data } = await createQuote(values);
        toast.success('Se agrego la cotizacion del carro', {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate(urls.seeCarsD);
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
    sendQuote();
  };

  return (
    <Form
      style={{ backgroundColor: 'transparent' }}
      className="form"
      onSubmit={handleSubmit}
    >
      <div className="mb-6">
        <h3 className="font-bold text-xl mb-2">
          Costo del vehiculo:{' '}
          <span className="text-primary">{formatPrice(price)}</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <FormGroup>
            <div>
              <p>
                Cuota Inicial <span className="text-red-500">*</span>
              </p>
            </div>
            <Input
              className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
              type="text"
              placeholder="Valor cuota inicial"
              name="initial_fee"
              value={values.initial_fee}
              onChange={handleChange}
              invalid={touched.initial_fee && !!errors.initial_fee}
              disabled={!!showValueCotization}
            />

            {touched.initial_fee &&
              errors.initial_fee &&
              showErrorToast(errors.initial_fee)}
          </FormGroup>
        </div>
        <div>
          <FormGroup>
            <div>
              <p>
                Numero de cuotas <span className="text-red-500">*</span>
              </p>
            </div>
            <Input
              className="w-full py-2 px-4 outline-none rounded-lg bg-secondary-900"
              type="text"
              placeholder="Numero de cuotas a pagar"
              name="num_installments"
              value={values.num_installments}
              onChange={handleChange}
              invalid={touched.num_installments && !!errors.num_installments}
              disabled={!!showValueCotization}
            />
            {touched.num_installments &&
              errors.num_installments &&
              showErrorToast(errors.num_installments)}
          </FormGroup>
        </div>
      </div>

      {showValueCotization ? (
        <div>
          <h3 className="font-bold text-xl mb-4 mt-10">
            Información de la cotización a realizar
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 text-lg">
            <div>
              <p>
                Valor de la cuota inicial:{' '}
                <span className="text-primary/60">
                  {formatPrice(values.initial_fee)}
                </span>
              </p>
            </div>
            <div>
              <p>
                Valor de la cutoa mensual:{' '}
                <span className="text-primary/60">
                  {formatPrice(valueMensualDue)}
                </span>
              </p>
            </div>
            <div>
              <p>
                Valor del seguro de vida:{' '}
                <span className="text-primary/60">
                  {formatPrice(lifeSegure)}
                </span>
              </p>
            </div>
            <div>
              <p>
                Valor total de la cuota:{' '}
                <span className="text-primary/60">
                  {formatPrice(values.quota_value)}
                </span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}

      {!showValueCotization ? (
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-primary/80 text-black py-2 px-4 rounded-lg hover:bg-primary transition-colors"
            onClick={resetErrorShown}
          >
            Cotizar
          </button>
        </div>
      ) : (
        <div className="flex justify-end mt-5">
          <p
            className="bg-quaternary/80 text-black py-2 px-4 rounded-lg hover:bg-quaternary transition-colors mr-10"
            onClick={handleCancel}
            type="button"
          >
            Cancelar
          </p>
          <p
            className="bg-terciary/80 text-black py-2 px-4 rounded-lg hover:bg-terciary transition-colors"
            onClick={handleQuote}
            type="button"
          >
            Enviar
          </p>
        </div>
      )}

      <hr className="my-8 border-gray-500/30" />
      <div className="flex justify-between">
        <div className="flex justify-start">
          <Link
            className="bg-primary/80 text-black py-2 px-4 rounded-lg hover:bg-primary transition-colors"
            to={urls.seeCarsD}
          >
            <i className="ri-arrow-left-line"></i> Volver
          </Link>
        </div>
      </div>
    </Form>
  );
};

export default VirtualQuoteFormD;
