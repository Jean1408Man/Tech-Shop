import '../styles/globals.css';
import { CartProvider } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/**
 * The custom App component wraps every page. We use it to apply
 * global providers like the CartProvider and common layout elements
 * such as the Navbar and Footer. See:
 * https://nextjs.org/docs/pages/building-your-application/routing/custom-app
 */
function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default MyApp;