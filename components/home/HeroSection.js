import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  const heroImage =
    'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1200&q=80';

  return (
    <section className="relative h-64 md:h-96 w-full">
      <Image src={heroImage} alt="Hero" layout="fill" objectFit="cover" />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-white">
          Compra como un multimillonario
        </h1>
        <p className="text-white mt-2 max-w-2xl">
          Descubre productos únicos a precios inigualables. Desde ropa hasta
          electrónica, tenemos todo lo que buscas.
        </p>
        <Link href="/category/fashion" legacyBehavior>
          <a className="mt-4 inline-block bg-primary text-white px-5 py-2 rounded-md shadow hover:bg-primary-dark transition-colors duration-200">
            Explorar ahora
          </a>
        </Link>
      </div>
    </section>
  );
}
