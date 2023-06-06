import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import store from './assets/redux/store/store';
import Routers from './routers/Routers';

function App() {
  return (
    <>
      {/* <Provider store={store}> */}
        <ToastContainer />
        <Routers />
      {/* </Provider> */}
    </>
  );
}

export default App;
