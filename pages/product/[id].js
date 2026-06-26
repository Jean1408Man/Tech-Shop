import { useRouter } from 'next/router';
import Image from 'next/image';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';

/**
 * Displays detailed information about a single product. A call to action
 * allows the user to add the product to their shopping cart.
 */
export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart } = useCart();

  // Wait for the router to be ready and id available
  if (!id) return null;
  const product = products.find((p) => p.id.toString() === id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Producto no encontrado.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative h-80 md:h-[30rem]">
          <Image
            src={product.image}
            alt={product.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-primary text-2xl font-bold mb-4">
            ${product.price.toFixed(2)}
          </p>
          <p className="mb-6">{product.description}</p>
          <button
            onClick={() => addToCart(product)}
            className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition-colors duration-200"
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
}