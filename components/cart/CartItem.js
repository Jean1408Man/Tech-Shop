import Image from 'next/image';

export default function CartItem({ item, onRemove, onUpdateQuantity }) {
  return (
    <li className="flex flex-col sm:flex-row items-center bg-white p-4 rounded shadow">
      <div className="relative h-24 w-24 flex-shrink-0 mb-4 sm:mb-0">
        <Image src={item.image} alt={item.name} layout="fill" objectFit="cover" />
      </div>
      <div className="sm:ml-4 flex-1">
        <h2 className="font-semibold text-sm md:text-base">{item.name}</h2>
        <p className="text-primary font-bold mt-1">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <div className="flex items-center mt-2 space-x-2">
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className="px-2 bg-gray-200 rounded"
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="px-2 bg-gray-200 rounded"
          >
            +
          </button>
          <button
            onClick={() => onRemove(item.id)}
            className="ml-4 text-red-500 text-sm hover:underline"
          >
            Eliminar
          </button>
        </div>
      </div>
    </li>
  );
}
