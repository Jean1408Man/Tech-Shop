export default function CartSummary({ onCheckout, onClear, total }) {
  return (
    <div className="mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
      <p className="text-xl font-bold">
        Total: <span className="text-primary">${total.toFixed(2)}</span>
      </p>
      <div className="space-x-2">
        <button
          onClick={onClear}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
        >
          Vaciar carrito
        </button>
        <button
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors duration-200"
          onClick={onCheckout}
        >
          Finalizar compra
        </button>
      </div>
    </div>
  );
}
