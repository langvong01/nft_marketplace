import 'bootstrap/dist/css/bootstrap.min.css';

import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';
import NavBar from '../components/navbar/NavBar';
import Footer from '../components/footer/Footer';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

//INTRNAL IMPORT

const MyApp = ({ Component, pageProps }) => (
  <RecoilRoot>
    <>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
      <ToastContainer></ToastContainer>
    </>
  </RecoilRoot>
);

export default MyApp;
