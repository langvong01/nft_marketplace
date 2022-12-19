import 'bootstrap/dist/css/bootstrap.min.css';

import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';
import NavBar from '../components/navbar/NavBar';
import Footer from '../components/footer/Footer';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
import Head from 'next/head';

//INTRNAL IMPORT

const MyApp = ({ Component, pageProps }) => (
  <RecoilRoot>
    <>
      <Head>
        <link rel="shortcut icon" href="/static/logo.png" />
      </Head>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
      <ToastContainer></ToastContainer>
    </>
  </RecoilRoot>
);

export default MyApp;
