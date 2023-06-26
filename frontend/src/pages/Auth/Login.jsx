// Imports
import { useFormik } from 'formik';
import React, { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import {
  RiEyeLine,
  RiEyeOffLine,
  RiLockLine,
  RiMailLine,
} from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, FormGroup } from 'reactstrap';
import Cookies from 'universal-cookie';
import { login, sendEmail, validateUser } from '../../assets/api/login.api';
import { urls } from '../../assets/urls/urls';
import { loginValidation } from '../../assets/validation/LoginValidation';

const Login = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const captcha = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [emailVerificationStep, setEmailVerificationStep] = useState(false);
  const [codeUser, setCodeUser] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const [usernameG, setUsernameG] = useState('');
  const [passwordG, setPasswordG] = useState('');

  const sendVerificationCodeToEmail = async (email) => {
    try {
      const response = await sendEmail(email);
      const { code } = response.data;
      setVerificationCode(code);
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

  const verifyEmail = async (code) => {
    if (code === verificationCode) {
      const loginData = {
        username: usernameG,
        password: passwordG,
      };
      const { data } = await login(loginData);
      //Almacenar el token y el usuario
      cookies.set('token', data.token, {
        path: '/',
        sameSite: 'None',
        secure: true,
      });
      cookies.set('id', data.usuario.id, {
        path: '/',
        sameSite: 'None',
        secure: true,
      });
      cookies.set('rol', data.usuario.rol, {
        path: '/',
        sameSite: 'None',
        secure: true,
      });
      cookies.set('email', data.usuario.email, {
        path: '/',
        sameSite: 'None',
        secure: true,
      });
      cookies.set('full_name', data.usuario.full_name, {
        path: '/',
        sameSite: 'None',
        secure: true,
      });
      cookies.set('address', data.usuario.address, {
        path: '/',
        sameSite: 'None',
        secure: true,
      });
      cookies.set('sucursal', data.usuario.sucursal, {
        path: '/',
        sameSite: 'None',
        secure: true,
      });

      // Navegar al dashboard
      navigate(urls.home2);
      // Toast despues de 4 segundos dando mensaje de vienvenida al client
      setTimeout(() => {
        const fullName = cookies.get('full_name');
        toast.success(`¡Bienvenido, ${fullName}!`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }, 1500);
    } else {
      toast.error('Código de verificación incorrecto', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleLogin = async (values) => {
    try {
      const { email, password } = values;
      const loginData = {
        username: email,
        password,
      };

      await validateUser(loginData);
      setUsernameG(email);
      setPasswordG(password);

      // Enviar código de verificación al correo electrónico del usuario
      sendVerificationCodeToEmail(email);
      //Activar la verificación de email en el frontend
      setEmailVerificationStep(true);

      // Mostrar notificación para que el usuario verifique su correo
      toast.success('Se le ha enviado un correo para que verifique su email', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
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
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      captchaResponse: '',
    },
    validationSchema: loginValidation,
    onSubmit: (values) => {
      if (captcha.current.getValue()) {
        values.captchaResponse = captcha.current.getValue();
        handleLogin(values);
      } else {
        toast.error('Por favor, verifica que no eres un robot', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
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

  const handleClick = () => {
    setEmailVerificationStep(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-secondary-200">
      <div className="bg-secondary-100 p-8 rounded-xl shadow-2xl w-auto lg:w-[450px]">
        <h1 className="text-3xl text-center uppercase font-bold tracking-[5px] text-white mb-8">
          Iniciar <span className="text-primary">sesión</span>
        </h1>
        {!emailVerificationStep ? (
          <Form className="mb-8" onSubmit={handleSubmit}>
            <FormGroup>
              <div className="mb-4 relative">
                <RiMailLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
                <input
                  type="email"
                  className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none text-white rounded-lg"
                  placeholder="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  invalid={touched.email && !!errors.email ? 'true' : 'false'}
                />
              </div>
              {touched.email && errors.email && showErrorToast(errors.email)}
            </FormGroup>

            <FormGroup>
              <div className="mb-8 relative">
                <RiLockLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="py-3 px-8 bg-secondary-900 w-full outline-none rounded-lg text-white"
                  placeholder="Contraseña"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  invalid={
                    touched.password && !!errors.password ? 'true' : 'false'
                  }
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

            <FormGroup>
              <ReCAPTCHA
                ref={captcha}
                sitekey="6Ler7yUmAAAAAJNxdK6337nhATDdZlsQAmXHhVox"
              />
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
            <div className="flex flex-col items-center gap-4 text-white">
              <span className="flex items-center gap-2 text-white">
                ¿Deseas regresar?{' '}
                <Link
                  to={urls.home}
                  className="text-primary hover:text-gray-100 transition-colors"
                >
                  Volver
                </Link>
              </span>
            </div>
          </Form>
        ) : (
          <>
            <FormGroup>
              <div className="mb-4 relative">
                <RiMailLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
                <input
                  type="text"
                  className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none text-white rounded-lg"
                  placeholder="Código de verificación"
                  value={codeUser}
                  onChange={(e) => setCodeUser(e.target.value)}
                />
              </div>
            </FormGroup>
            <div>
              <FormGroup>
                <button
                  type="submit"
                  className="bg-primary text-black uppercase font-bold text-sm w-full py-3 px-4 rounded-lg"
                  onClick={() => verifyEmail(codeUser)}
                >
                  Confirmar Correo
                </button>
              </FormGroup>
            </div>
            <div className="flex flex-col items-center gap-4">
              <span className="flex items-center gap-2 text-white">
                ¿Deseas regresar?{' '}
                <Link
                  to={urls.login}
                  className="text-primar
                  y hover:text-gray-100 transition-colors"
                  onClick={handleClick}
                >
                  <span className="text-primary hover:text-gray-100 transition-colors">
                    Volver
                  </span>
                </Link>
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
