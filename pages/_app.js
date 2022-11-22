import '../styles/globals.css';

import { RecoilRoot } from 'recoil';
//INTRNAL IMPORT
import { NavBar, Footer } from '../components/componentsindex';

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
