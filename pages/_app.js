import '../styles/globals.css';

import { RecoilRoot } from 'recoil';
import NavBar from '../components/navbar/NavBar';
import Footer from '../components/footer/Footer';
//INTRNAL IMPORT

const MyApp = ({ Component, pageProps }) => (
  <RecoilRoot>
    <>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </>
  </RecoilRoot>
);

export default MyApp;
