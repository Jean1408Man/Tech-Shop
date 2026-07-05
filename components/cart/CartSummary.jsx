import PropTypes from "prop-types";

export default function CartSummary({ onCheckout, onClear, subtotal }) {
  const discount = 0;
  const shipping = subtotal >= 50 ? 0 : 5.99;
  const total = subtotal - discount + shipping;

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
      <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
        Resumen del pedido
      </h2>
      <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium text-gray-900">
            ${subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Descuento</span>
          <span className="font-medium text-green-600">
            -${discount.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Envío</span>
          <span className="font-medium text-gray-900">
            {shipping === 0 ? (
              <span className="text-green-600">Gratis</span>
            ) : (
              `$${shipping.toFixed(2)}`
            )}
          </span>
        </div>
        <div className="border-t border-gray-100 pt-2 sm:pt-3 flex justify-between">
          <span className="font-bold text-gray-900">Total</span>
          <span className="font-bold text-primary text-base sm:text-lg">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>
      <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-4">
        <button
          className="w-full bg-primary text-white py-2.5 sm:py-3 rounded-full hover:bg-primary-dark transition-all duration-300 shadow-sm hover:shadow-md font-semibold text-sm sm:text-base"
          onClick={onCheckout}
        >
          Finalizar compra
        </button>
        <button
          onClick={onClear}
          className="w-full border border-gray-300 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-50 rounded-full transition-all duration-200 shadow-sm text-sm sm:text-base"
        >
          Vaciar carrito
        </button>
      </div>
    </div>
  );
}

CartSummary.propTypes = {
  onClear: PropTypes.func.isRequired,
  subtotal: PropTypes.number.isRequired,
};
