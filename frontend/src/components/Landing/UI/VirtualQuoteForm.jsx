import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, FormGroup, FormText, Input } from 'reactstrap';
import { getCarByColor } from '../../../assets/api/cars';
import { createQuote } from '../../../assets/api/quote';
import { getSucursals } from '../../../assets/api/sucursal.api';
import { newUser } from '../../../assets/api/user.api';
import { formatPrice } from '../../../assets/general/formatPrice';
import { urls } from '../../../assets/urls/urls';
import { virtualQuoteValidation } from '../../../assets/validation/VirtualQuoteValidation';
import '../../../styles/find-car-form.css';

const VirtualQuoteForm = ({
  slug,
  selectedColor,
  price,
  sucursalsAvalaible,
}) => {
  const [isQuote, setIsQuote] = useState(false);
  const [lifeSegure, setLifeSegure] = useState('');
  const [valueMensualDue, setValueMensualDue] = useState('');
  const tasa = 0.0185;
  const [valueTotal, setValueTotal] = useState('');
  const [isQuantity, setIsQuantity] = useState(false);
  const navigate = useNavigate();

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

    formik.setFieldValue('quota_value', roundedTotalValue);

    setIsQuote(true);
  };

  const [isSucursalsDataLoaded, setIsSucursalsDataLoaded] = useState(false);

  const handleCancel = () => {
    setIsQuote(false);
  };

  const createUser = async () => {
    try {
      const { data } = await newUser(values);
      console.log(data);
      return data.id;
    } catch (error) {
      if (error.response) {
        const { data } = error.response;

        if (Array.isArray(data)) {
          data.forEach((errorMessage) => {
            toast.error(errorMessage, {
              position: toast.POSITION.TOP_RIGHT,
            });
          });
        } else if (typeof data === 'object') {
          Object.values(data).forEach((errorMessages) => {
            if (Array.isArray(errorMessages)) {
              errorMessages.forEach((errorMessage) => {
                toast.error(errorMessage, {
                  position: toast.POSITION.TOP_RIGHT,
                });
              });
            } else {
              toast.error(errorMessages, {
                position: toast.POSITION.TOP_RIGHT,
              });
            }
          });
        } else if (typeof data === 'string') {
          toast.error(data, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error('An error occurred', {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    }
  };

  const handleQuote = async (values) => {
    console.log(values);
    try {
      const colorSinNumeral = selectedColor.slice(1); // Utilizando slice())
      let idCarSucursal = null;
      let quantity_ = null;
      if (colorSinNumeral !== '') {
        const { data } = await getCarByColor(
          values.sucursal,
          slug,
          colorSinNumeral
        );
        idCarSucursal = data.id;
        quantity_ = data.quantity_;
      }

      console.log(quantity_);

      if (quantity_ === null || quantity_ <= 0) {
        toast.error(
          'Lo sentimos, el carro actualmente no cuenta con stock en este momento',
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
        return;
      }

      const body = {
        num_installments: parseInt(values.num_installments),
        initial_fee: parseInt(values.initial_fee),
        quota_value: parseInt(values.quota_value),
        client: parseInt(values.id),
        vehicle_sucursal: idCarSucursal,
      };

      // Verificar num_installments mayor a cero y menor a 22
      const Regex = /^\d+$/;

      if (parseInt(body.num_installments) >= 23) {
        toast.error(
          'Por favor, ingrese un número numero de cuotas menor a 22',
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
        return;
      }

      // // Verificar cellphone como número
      // const phoneRegex = /^\d+$/;
      // if (!phoneRegex.test(values.cellphone)) {
      //   toast.error(
      //     'Por favor, ingrese un número válido para el campo de Teléfono',
      //     {
      //       position: toast.POSITION.TOP_RIGHT,
      //     }
      //   );
      //   return;
      // }

      const { data } = await createQuote(body);
      console.log(data);
      toast.success(
        'Se agrego la cotizacion del carro y se le registro a la plataforma',
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
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

  const [sucursals, setSucursals] = useState([]);

  const getSucursalsData = async () => {
    try {
      const { data } = await getSucursals();
      const filteredSucursals = data.filter((item) =>
        sucursalsAvalaible.includes(item.id)
      );
      setSucursals(filteredSucursals);
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

  const getVehicleByColor = async (sucursal) => {
    try {
      const colorSinNumeral = selectedColor.slice(1); // Utilizando slice())
      if (colorSinNumeral != '') {
        const { data } = await getCarByColor(sucursal, slug, colorSinNumeral);
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

  const formik = useFormik({
    initialValues: {
      full_name: '',
      sucursal: '',
      id: '',
      cellphone: '',
      email: '',
      address: '',
      rol: 'Cliente',
      // password: '',
      // Quote
      color: selectedColor,
      idCar: slug,
      vehicle_sucursal: '',
      client: '',
      initial_fee: '',
      num_installments: '',
      quota_value: '',
    },
    // validationSchema: virtualQuoteValidation,
    onSubmit: async (values) => {
      try {
        const id = await createUser();
        console.log(id);
        if (id !== undefined) {
          await handleQuote(values);
          navigate(urls.login);
          toast.success(
            'Se le ha enviado un correo para que pueda inciar sesion',
            {
              position: toast.POSITION.TOP_RIGHT,
            }
          );
        }
        // await getVehicleByColor(values.sucursal);
      } catch (error) {}
    },
  });

  const { handleSubmit, handleChange, values, touched, errors } = formik;

  useEffect(() => {
    if (selectedColor !== '') {
      formik.setFieldValue('color', selectedColor); // Actualiza el valor en formik cuando selectedColor cambie
    }
    if (sucursalsAvalaible !== '') {
      setIsSucursalsDataLoaded(false); // Restablecer a false después de ejecutar getVehicleByColor

      getSucursalsData()
        .then(() => {
          setIsSucursalsDataLoaded(true);
        })
        .catch((error) => {
          // Manejar el error si ocurre
        });
    }
  }, [selectedColor, sucursalsAvalaible]);

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

  const handleQuoteProcced = () => {
    if (
      !values.full_name ||
      !values.sucursal ||
      !values.id ||
      !values.cellphone ||
      !values.email ||
      !values.address ||
      !values.initial_fee ||
      !values.num_installments
    ) {
      toast.error(
        'Por favor, complete todos los campos antes de proceder con la cotización',
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
      return;
    } else {
      // Verificar id como número
      const ccRegex = /^\d+$/;
      if (!ccRegex.test(values.id)) {
        toast.error(
          'Por favor, ingrese un número válido para el campo de Cedula',
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
        return;
      }

      // Verificar cellphone como número
      const phoneRegex = /^\d+$/;
      if (!phoneRegex.test(values.cellphone)) {
        toast.error(
          'Por favor, ingrese un número válido para el campo de Teléfono',
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
        return;
      }

      // Verificar initial_fee como número y menor a 2147483647
      const initialCuoteRegex = /^\d+$/;
      if (
        !initialCuoteRegex.test(values.initial_fee) ||
        parseInt(values.initial_fee) >= 2147483647
      ) {
        toast.error(
          'Por favor, ingrese un número válido menor a 2147483647 para la cuota inicial',
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
        return;
      }

      // Verificar num_installments como número y menor a 22
      const numInstallmentsRegex = /^\d+$/;
      if (
        !numInstallmentsRegex.test(values.num_installments) ||
        parseInt(values.num_installments) >= 23
      ) {
        toast.error(
          'Por favor, ingrese un número válido menor a 23 para el número de cuotas',
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
        return;
      }

      // Verificar email con formato válido
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(values.email)) {
        toast.error('Por favor, ingrese un correo electrónico válido', {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }

      if (values.initial_fee > price) {
        toast.error(
          'La cutoa inicial no puede sobrepasar el valor del precio del carro',
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
        return;
      }

      if (values.initial_fee < 1000000) {
        toast.error('La cutoa inicial debe ser mayor a un millon', {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }

      calculateQuote(values);
    }
  };

  return (
    <>
      <Form className="bg-transparent form" onSubmit={handleSubmit}>
        <div>
          <h6 className="fw-bold text-black">Información Personal</h6>
          <div className="d-flex align-items-center justify-content-between flex-wrap">
            <FormGroup className="form__group">
              <FormText>Nombre</FormText>
              <Input
                type="text"
                placeholder="Nombre"
                name="full_name"
                value={values.full_name}
                onChange={handleChange}
                invalid={touched.full_name && !!errors.full_name}
                disabled={isQuote}
              />
              {touched.full_name &&
                errors.full_name &&
                showErrorToast(errors.full_name)}
            </FormGroup>
            <FormGroup className="form__group">
              <FormText>Telefono</FormText>
              <Input
                type="text"
                placeholder="Telefono"
                name="cellphone"
                value={values.cellphone}
                onChange={handleChange}
                invalid={touched.cellphone && !!errors.cellphone}
                disabled={isQuote}
                maxLength={10}
              />
              {touched.cellphone &&
                errors.cellphone &&
                showErrorToast(errors.cellphone)}
            </FormGroup>
            <FormGroup className="form__group">
              <FormText>Dirección</FormText>
              <Input
                type="text"
                placeholder="Direccion"
                name="address"
                value={values.address}
                onChange={handleChange}
                invalid={touched.address && !!errors.address}
                disabled={isQuote}
              />
              {touched.address &&
                errors.address &&
                showErrorToast(errors.address)}
            </FormGroup>
            <FormGroup className="form__group">
              <FormText>Cedula</FormText>
              <Input
                type="text"
                placeholder="Cedula"
                name="id"
                value={values.id}
                onChange={handleChange}
                invalid={touched.id && !!errors.id}
                disabled={isQuote}
                maxLength={10}
              />
              {touched.id && errors.id && showErrorToast(errors.id)}
            </FormGroup>
          </div>
          <h6 className="mt-4 fw-bold text-black">Acceso a la Plataforma</h6>
          <div className="d-flex align-items-center flex-wrap ">
            <FormGroup className="form__group mr-12">
              <FormText>Email</FormText>
              <Input
                type="email"
                placeholder="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                invalid={touched.email && !!errors.email}
                disabled={isQuote}
              />
              {touched.email && errors.email && showErrorToast(errors.email)}
            </FormGroup>
            {/* <FormGroup className="form__group">
            <FormText>Contraseña</FormText>
            <Input
              type="password"
              placeholder="Contraseña"
              name="password"
              value={values.password}
              onChange={handleChange}
              invalid={touched.password && !!errors.password}
            />
            {touched.password &&
              errors.password &&
              showErrorToast(errors.password)}
          </FormGroup> */}
            <FormGroup className="select__group">
              <FormText>Sucursal</FormText>
              <Input
                type="select"
                name="sucursal"
                value={values.sucursal}
                onChange={handleChange}
                invalid={touched.sucursal && !!errors.sucursal}
                disabled={isQuote}
              >
                <option value="">Seleccione una ciudad</option>
                {sucursals.map((office) => (
                  <option value={office.id} key={office.id}>
                    {office.city}
                  </option>
                ))}
              </Input>
              {touched.sucursal &&
                errors.sucursal &&
                showErrorToast(errors.sucursal)}
            </FormGroup>
          </div>
          <h6 className="mt-4 fw-bold text-black">
            Información para la cotización
          </h6>
          <div className="d-flex align-items-center flex-wrap ">
            <FormGroup className="form__group mr-12">
              <FormText>Cuota Inicial</FormText>
              <Input
                type="text"
                placeholder="Valor de la cuota inicial"
                name="initial_fee"
                value={values.initial_fee}
                onChange={handleChange}
                invalid={touched.initial_fee && !!errors.initial_fee}
                disabled={isQuote}
              />
              {touched.initial_fee &&
                errors.initial_fee &&
                showErrorToast(errors.initial_fee)}
            </FormGroup>
            <FormGroup className="form__group mr-12">
              <FormText>Numero de cutoas</FormText>
              <Input
                type="text"
                placeholder="Numero de cutos a pagar"
                name="num_installments"
                value={values.num_installments}
                onChange={handleChange}
                invalid={touched.num_installments && !!errors.num_installments}
                disabled={isQuote}
              />
              {touched.num_installments &&
                errors.num_installments &&
                showErrorToast(errors.num_installments)}
            </FormGroup>
          </div>
          <hr className="border-gray-500/30" />
          {isQuote && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-black">
                <div>
                  <p>
                    <FormText className="text-black">
                      Valor de la cuota inicial:{' '}
                    </FormText>
                    <span className="">{formatPrice(values.initial_fee)}</span>
                  </p>
                </div>
                <div>
                  <p>
                    <FormText>Numero de cutoas: </FormText>
                    <span className="">{values.num_installments}</span>
                  </p>
                </div>
                <div>
                  <p>
                    <FormText>Valor de la cuota mensual: </FormText>
                    <span className="">{formatPrice(valueMensualDue)}</span>
                  </p>
                </div>
                <div>
                  <p>
                    <FormText>Valor del seguro de vida: </FormText>
                    <span className="">{formatPrice(lifeSegure)}</span>
                  </p>
                </div>
                <div>
                  <p>
                    <FormText>Valor total de la cuota mensual: </FormText>
                    <span className="">{formatPrice(valueTotal)}</span>
                  </p>
                </div>
              </div>
              <div className="flex justify-between flex-col sm:flex-row">
                <button
                  className="btn find__car-btn2 my-2 sm:my-0"
                  type="button"
                  onClick={() => {
                    handleCancel();
                  }}
                >
                  Cancelar
                </button>
                <button
                  className="btn find__car-btn3 my-2 sm:my-0"
                  type="submit"
                  onClick={() => {
                    resetErrorShown();
                    handleQuote();
                  }}
                >
                  Enviar
                </button>
              </div>
            </>
          )}
        </div>
      </Form>
      {!isQuote && (
        <div className="d-flex align-items-center justify-content-center flex-wrap ">
          <FormGroup className="form__group">
            <button
              className="btn find__car-btn"
              type="button"
              onClick={() => {
                handleQuoteProcced();
              }}
            >
              Proceder con la cotización
            </button>
          </FormGroup>
        </div>
      )}
    </>
  );
};

export default VirtualQuoteForm;
