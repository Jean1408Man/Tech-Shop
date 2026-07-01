import Image from 'next/image';
import { useCart } from '../../context/CartContext';

export default function ProductDetails({ product }) {
  const { addToCart } = useCart();
  const price = Number(product.price || 0);
  const basePrice = Number(product.basePrice || price);

  return (
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
          ${price.toFixed(2)}
        </p>
        {product.hasOffer && (
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full bg-primary px-3 py-1 text-sm font-semibold text-white">
              {product.offer?.name || 'Oferta activa'}
            </span>
            <span className="text-sm text-gray-500">
              Antes <span className="line-through">${basePrice.toFixed(2)}</span>
            </span>
          </div>
        )}
        {product.categoryName && (
          <p className="mb-3 text-sm font-semibold text-gray-500">
            {product.categoryName}
          </p>
        )}
        <p className="mb-6">{product.description}</p>
        <button
          onClick={() => addToCart(product)}
          className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition-colors duration-200"
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  );
}
