import Link from 'next/link';

export default function EmptyCart() {
  return (
    <div>
      <p>Tu carrito está vacío.</p>
      <Link href="/" legacyBehavior>
        <a className="text-primary hover:underline">Seguir comprando</a>
      </Link>
    </div>
  );
}
