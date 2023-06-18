import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, FormGroup, FormText, Input } from 'reactstrap';
import { getSucursals } from '../../../assets/api/sucursal.api';
import { urls } from '../../../assets/urls/urls';
import { virtualQuoteValidation } from '../../../assets/validation/VirtualQuoteValidation';
import { formatPrice } from '../../../assets/general/formatPrice';

const VirtualQuoteFormD = ({ slug, selectedColor, price }) => {
  const [sucursals, setSucursals] = useState([]);

  const [showValueCotization, setShowValueCotization] = useState(false);
  const [lifeSegure, setLifeSegure] = useState('');
  const [valueMensualDue, setValueMensualDue] = useState('');
  const tasa = 0.0185;
  const [valueTotal, setValueTotal] = useState('');

  useEffect(() => {
    formik.setFieldValue('color', selectedColor); // Actualiza el valor en formik cuando selectedColor cambie
  }, [selectedColor]);

  useEffect(() => {
    const getSucursalsData = async () => {
      try {
        const { data } = await getSucursals();
        setSucursals(data);
      } catch (error) {
        if (error) {
          const { data } = error.response;
          toast.error(data.error, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    };
    getSucursalsData();
  }, []);

  const calculateQuote = async (values) => {
    const lendValue = price - values.initial_dues;
    const tasa = 0.0185; // Tasa del 1.85% en forma decimal
    const numeroCuotas = values.number_dues;
    const segureLife = 718000;

    const dueValue =
      (lendValue * tasa) / (1 - Math.pow(1 + tasa, -(numeroCuotas - 1)));
    const roundedDueValue = parseInt(Math.ceil(dueValue));

    console.log(dueValue);
    const totalValue = dueValue + segureLife;
    console.log(totalValue);
    const roundedTotalValue = parseInt(Math.ceil(totalValue));

    console.log(roundedTotalValue);

    setLifeSegure(segureLife);
    setValueMensualDue(roundedDueValue);
    setValueTotal(roundedTotalValue);
    setShowValueCotization(true);
  };

  const formik = useFormik({
    initialValues: {
      initial_dues: '',
      number_dues: '',
      idCar: slug,
      color: selectedColor,
    },
    // validationSchema: virtualQuoteValidation,
    onSubmit: (values) => {
      console.log(values);
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

  
  return (
    <Form
      style={{ backgroundColor: 'transparent' }}
      className="form"
      onSubmit={handleSubmit}
    >
      <div className="mb-6">
        <h3 className="font-bold text-xl mb-2">
          Costo del vehiculo: <span className="text-primary">{formatPrice(price)}</span>
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
              name="initial_dues"
              value={values.initial_dues}
              onChange={handleChange}
              invalid={touched.initial_dues && !!errors.initial_dues}
              disabled={!!showValueCotization}
            />

            {touched.initial_dues &&
              errors.initial_dues &&
              showErrorToast(errors.initial_dues)}
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
              name="number_dues"
              value={values.number_dues}
              onChange={handleChange}
              invalid={touched.number_dues && !!errors.number_dues}
              disabled={!!showValueCotization}
            />
            {touched.number_dues &&
              errors.number_dues &&
              showErrorToast(errors.number_dues)}
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
                Valor de la cutoa mensual:{' '}
                <span className="text-primary/60">{formatPrice(valueMensualDue)}</span>
              </p>
            </div>
            <div>
              <p>
                Valor del seguro de vida:{' '}
                <span className="text-primary/60">{formatPrice(lifeSegure)}</span>
              </p>
            </div>
            <div>
              <p>
                Valor total:{' '}
                <span className="text-primary/60">{formatPrice(valueTotal)}</span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
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
        {!showValueCotization ? (
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-primary/80 text-black py-2 px-4 rounded-lg hover:bg-primary transition-colors"
              onClick={() => {
                resetErrorShown();
                handleSubmit(); // Primera función
              }}
            >
              Cotizar
            </button>
          </div>
        ) : (
          <div className="flex">
            <button
              className="bg-quaternary/80 text-black py-2 px-4 rounded-lg hover:bg-quaternary transition-colors mr-10"
              onClick={() => {
                resetErrorShown();
              }}
            >
              Cancelar
            </button>
            <button
              className="bg-terciary/80 text-black py-2 px-4 rounded-lg hover:bg-terciary transition-colors"
              onClick={() => {
                resetErrorShown();
              }}
            >
              Enviar
            </button>
          </div>
        )}
      </div>
    </Form>
  );
};

export default VirtualQuoteFormD;
