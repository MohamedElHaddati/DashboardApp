import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import HomeScreen from './pages/HomeScreen';
import LoginScreen from './pages/LoginScreen';

const App = () => {
  return (
    <>
      <ToastContainer />
      <Container className='my-2'>
        <Outlet />
      </Container>
    </>
  );
};

export default App;