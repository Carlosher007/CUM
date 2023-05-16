import { FormikProvider } from 'formik';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <>
      {/* <FormikProvider> */}
        <ToastContainer />
        <Layout />
      {/* </FormikProvider> */}
    </>
  );
}

export default App;
