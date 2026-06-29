import '../styles/globals.css';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import Layout from '../components/layout/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <CartProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CartProvider>
    </AuthProvider>
  );
}

export default MyApp;
