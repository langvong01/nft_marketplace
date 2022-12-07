import 'bootstrap/dist/css/bootstrap.min.css';

import { RecoilRoot } from 'recoil';
import NavBar from '../components/navbar/NavBar';
import Footer from '../components/footer/Footer';
import '../styles/globals.css';
import '../styles/custom-react-ui.css';
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
