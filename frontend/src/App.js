import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Landing/Layout/Layout';
import Routers from './routers/Routers'

function App() {
  return (
    <>
      {/* <FormikProvider> */}
      <ToastContainer />
      {/* <Layout /> */}
      <Routers/>
      {/* </FormikProvider> */}
    </>
  );
}

export default App;
