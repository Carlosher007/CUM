import React, { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Link } from 'react-router-dom';
// Icons
import { useFormik } from 'formik';
import {
  RiEyeLine,
  RiEyeOffLine,
  RiLockLine,
  RiMailLine,
} from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, FormGroup } from 'reactstrap';
import { loginUser } from '../../assets/api/login.api';
import { setToken, setUsuario } from '../../assets/redux/store/reducers';
import { urls } from '../../assets/urls/urls';
import { loginValidation } from '../../assets/validation/LoginValidation';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const captcha = useRef(null);

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (values) => {
    try {
      const { email, password } = values;
      const loginData = {
        username: email,
        password,
      };
      const response = await loginUser(loginData);
      const { token, usuario, mensaje } = response.data;

      // Almacenar el token y la información del usuario en el almacenamiento local
      dispatch(setToken(token));
      dispatch(setUsuario(usuario));

      console.log(token, usuario, mensaje);

      // Almacenar el token y la información del usuario en el almacenamiento local
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));

      //Luego, cuando el usuario vuelva a cargar la página o acceda a una página protegida, puedes recuperar el token y la información del usuario desde el almacenamiento local y almacenarlos en el estado de Redux utilizando las acciones setToken y setUsuario.

      navigate(urls.home2);
      // 3 Segundos despues hace un toast que diva bienvenido cliente
      setTimeout(() => {
        toast.success(`Bienvenido ${usuario.rol}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }, 3000);
    } catch (error) {
      const { data } = error.response;
      // Mostrar mensaje de error al usuario o tomar alguna acción según corresponda
      console.log(data.error);
      toast.error(data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
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
        console.log(values);
        handleLogin(values);
      } else {
        // Hacemos un notify con toast
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
