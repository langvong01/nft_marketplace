import 'bootstrap/dist/css/bootstrap.min.css';

import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';
import NavBar from '../components/navbar/NavBar';
import Footer from '../components/footer/Footer';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import useScrollRestoration from 'hook/useScrollRestoration';
//INTRNAL IMPORT

const MyApp = ({ Component, pageProps, router }) => {

  useScrollRestoration(router);

  Router.events.on('routeChangeStart', () => {
    NProgress.start();
  });

  Router.events.on('routeChangeComplete', () => {
    NProgress.done();
  });
  return (
    <>
      <RecoilRoot>
        <>
          <Head>
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
              integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="
              crossorigin="anonymous"
              referrerpolicy="no-referrer"
            />
            <link rel="shortcut icon" href="/static/logo.png" />
          </Head>
          <NavBar />
          <Component {...pageProps} />
          <Footer />
          <ToastContainer></ToastContainer>
        </>
      </RecoilRoot>
    </>
  );
};
export default MyApp;
