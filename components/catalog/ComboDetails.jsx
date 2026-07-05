import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function ComboDetails({ combo }) {
  const { addToCart } = useCart();
  const price = Number(combo.price || 0);
  const products = combo.products || [];

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative h-80 md:h-[30rem] overflow-hidden rounded-lg bg-white shadow">
          <Image
            src={combo.image}
            alt={combo.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold uppercase text-primary">
            Combo
          </p>
          <h1 className="text-3xl font-bold mb-2">{combo.name}</h1>
          <p className="text-primary text-2xl font-bold mb-4">
            ${price.toFixed(2)}
          </p>
          <p className="mb-3 text-sm font-semibold text-gray-500">
            {products.length} productos incluidos
          </p>
          <p className="mb-6">{combo.description}</p>
          <button
            type="button"
            onClick={() => addToCart(combo)}
            className="inline-flex items-center gap-2 rounded bg-primary px-6 py-2 font-semibold text-white transition-colors duration-200 hover:bg-primary-dark"
          >
            <ShoppingCart size={18} />
            Añadir al carrito
          </button>
        </div>
      </div>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Productos incluidos</h2>
        {products.length ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => {
              const productPrice = Number(product.price || product.basePrice || 0);

              return (
                <Link key={product.id} href={`/product/${product.id}`} legacyBehavior>
                  <a className="group overflow-hidden rounded-lg bg-white shadow transition-shadow hover:shadow-md">
                    <div className="relative h-40">
                      <Image
                        src={product.image}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="h-10 overflow-hidden text-sm font-semibold leading-tight text-gray-900 group-hover:text-primary">
                        {product.name}
                      </h3>
                      <p className="mt-1 h-10 overflow-hidden text-xs text-gray-500">
                        {product.description}
                      </p>
                      <p className="mt-2 font-bold text-primary">
                        ${productPrice.toFixed(2)}
                      </p>
                    </div>
                  </a>
                </Link>
              );
            })}
          </div>
        ) : (
          <p>No hay productos asociados a este combo.</p>
        )}
      </section>
    </div>
  );
}
