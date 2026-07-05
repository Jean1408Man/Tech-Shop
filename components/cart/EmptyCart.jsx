import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6 sm:p-8 text-center">
      <p className="text-gray-600 mb-4 text-sm sm:text-base">Tu carrito está vacío.</p>
      <Link
        href="/"
        className="inline-block bg-primary text-white px-5 sm:px-6 py-2 rounded-full hover:bg-primary-dark transition-all duration-300 shadow-sm hover:shadow-md text-sm sm:text-base"
      >
        Seguir comprando
      </Link>
    </div>
  );
}
