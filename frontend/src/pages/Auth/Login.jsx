import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Icons
import { useFormik } from 'formik';
import {
  RiEyeLine,
  RiEyeOffLine,
  RiLockLine,
  RiMailLine,
} from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, FormGroup, FormText, Input } from 'reactstrap';
import { urls } from '../../assets/urls/urls';
import { loginValidation } from '../../assets/validation/LoginValidation';

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginValidation,
    onSubmit: (values) => {
      console.log(values);
      navigate(urls.home2);
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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-secondary-100 p-8 rounded-xl shadow-2xl w-auto lg:w-[450px]">
        <h1 className="text-3xl text-center uppercase font-bold tracking-[5px] text-white mb-8">
          Iniciar <span className="text-primary">sesión</span>
        </h1>
        <Form className="mb-8" onSubmit={handleSubmit}>
          <FormGroup>
            <div className="relative mb-4">
              <RiMailLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <input
                type="email"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg"
                placeholder="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                invalid={touched.email && !!errors.email}
              />
            </div>
            {touched.email && errors.email && showErrorToast(errors.email)}
          </FormGroup>

          <FormGroup>
            <div className="relative mb-8">
              <RiLockLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <input
                type={showPassword ? 'text' : 'password'}
                className="py-3 px-8 bg-secondary-900 w-full outline-none rounded-lg"
                placeholder="Contraseña"
                name="password"
                value={values.password}
                onChange={handleChange}
                invalid={touched.password && !!errors.password}
              />
              {showPassword ? (
                <RiEyeOffLine
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary"
                />
              ) : (
                <RiEyeLine
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary"
                />
              )}
            </div>
            {touched.password &&
              errors.password &&
              showErrorToast(errors.password)}
          </FormGroup>

          <div>
            <FormGroup>
              <button
                type="submit"
                className="bg-primary text-black uppercase font-bold text-sm w-full py-3 px-4 rounded-lg"
                onClick={resetErrorShown}
              >
                Ingresar
              </button>
            </FormGroup>
          </div>
        </Form>
        <div className="flex flex-col items-center gap-4">
          {/* Funcionalidad : Olvide Contraseña */}
          {/* <Link
            to={urls.forgetPassword}
            className="hover:text-primary transition-colors"
          >
            ¿Olvidaste tu contraseña?
          </Link> */}
          <span className="flex items-center gap-2">
            ¿Deseas regrear?{' '}
            <Link
              to={urls.home}
              className="text-primary hover:text-gray-100 transition-colors"
            >
              Volver
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
