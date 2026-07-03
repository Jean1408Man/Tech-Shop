import Image from "next/image";
import Link from "next/link";
import figure1 from "../../images/figure1.svg";
import figure2 from "../../images/figure2.svg";
import figure3 from "../../images/figure3.svg";
import figure4 from "../../images/figure4.svg";
import figure5 from "../../images/figure5.svg";
import figure6 from "../../images/figure6.svg";
import figure7 from "../../images/figure7.svg";
import figure8 from "../../images/figure8.svg";
import figure9 from "../../images/figure9.svg";

export default function HeroSection() {
  return (
    <section className="relative h-64 md:h-96 w-full max-w-[1856px] mx-auto bg-black/10">
      <div className="absolute top-0 left-0 scale-75 md:scale-100 origin-center">
        <Image src={figure1} alt="Figure 1" />
      </div>
      <div className="absolute left-0 top-[63.66%] scale-75 md:scale-100 origin-center">
        <Image src={figure2} alt="Figure 2" />
      </div>
      <div className="absolute left-[4.71%] top-[43.66%] scale-75 md:scale-100 origin-center">
        <Image src={figure3} alt="Figure 3" />
      </div>
      <div className="absolute left-[5%] bottom-0 scale-75 md:scale-100 origin-center">
        <Image src={figure4} alt="Figure 4" />
      </div>
      <div className="absolute right-0 top-[38.23%] scale-75 md:scale-100 origin-center">
        <Image src={figure5} alt="Figure 5" />
      </div>
      <div className="absolute right-[12.35%] top-[62.20%] scale-75 md:scale-100 origin-center">
        <Image src={figure8} alt="Figure 8" />
      </div>
      <div className="absolute right-[19.65%] top-[10.36%] scale-75 md:scale-100 origin-center">
        <Image src={figure7} alt="Figure 7" />
      </div>
      <div className="absolute right-0 top-0 scale-75 md:scale-100 origin-center">
        <Image src={figure6} alt="Figure 6" />
      </div>
      <div className="absolute right-[32.11%] top-0 scale-75 md:scale-100 origin-center">
        <Image src={figure9} alt="Figure 9" />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-white">
          Compra como un multimillonario
        </h1>
        <p className="text-white mt-2 max-w-2xl">
          Descubre productos únicos a precios inigualables. Desde ropa hasta
          electrónica, tenemos todo lo que buscas.
        </p>
        <Link href="/#explore" legacyBehavior>
          <a className="mt-4 inline-block bg-primary text-white px-5 py-2 rounded-md shadow hover:bg-primary-dark transition-colors duration-200">
            Explorar ahora
          </a>
        </Link>
      </div>
    </section>
  );
}
