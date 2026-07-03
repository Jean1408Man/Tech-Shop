import Image from "next/image";
import { useCart } from "../../context/CartContext";

export default function ProductDetails({ product }) {
  const { addToCart } = useCart();

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
        <div className="flex items-center mb-2">
          <span className="text-yellow-400 text-lg">★</span>
          <span className="text-gray-600 ml-1">
            {product.rating.toFixed(1)}
          </span>
        </div>
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
  );
}
