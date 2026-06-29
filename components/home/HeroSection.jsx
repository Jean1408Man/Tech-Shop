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
    <section className="relative h-64 md:h-96 w-full max-w-[1856px] mx-auto">
      <div className="absolute inset-0 z-50">
        {/* Figure 1 - bottom left triangle */}
        <div className="absolute left-[5.83%] top-[87.15%] w-[7.71%] h-[12.85%]">
          <Image src={figure1} alt="Figure 1" layout="fill" objectFit="none" />
        </div>
        {/* Figure 2 - left middle square */}
        <div className="absolute left-[2.71%] top-[43.66%] w-[5.45%] h-[18.17%]">
          <Image src={figure2} alt="Figure 2" layout="fill" objectFit="none" />
        </div>
        {/* Figure 3 - left middle circle */}
        <div className="absolute left-0 top-[63.66%] w-[3.88%] h-[26.10%]">
          <Image src={figure3} alt="Figure 3" layout="fill" objectFit="none" />
        </div>
        {/* Figure 4 - top left shape */}
        <div className="absolute left-0 top-0 w-[5.71%] h-[15.61%]">
          <Image src={figure4} alt="Figure 4" layout="fill" objectFit="none" />
        </div>
        {/* Figure 5 - top middle-right shape */}
        <div className="absolute left-[65.89%] top-0 w-[8.78%] h-[11.95%]">
          <Image src={figure5} alt="Figure 5" layout="fill" objectFit="none" />
        </div>
        {/* Figure 6 - right middle lines */}
        <div className="absolute left-[85.65%] top-[62.20%] w-[7.03%] h-[25.37%]">
          <Image src={figure6} alt="Figure 6" layout="fill" objectFit="none" />
        </div>
        {/* Figure 7 - top middle-right triangle */}
        <div className="absolute left-[78.35%] top-[10.36%] w-[4.95%] h-[14.29%]">
          <Image src={figure7} alt="Figure 7" layout="fill" objectFit="none" />
        </div>
        {/* Figure 8 - top right corner shape */}
        <div className="absolute left-[95.82%] top-0 w-[4.19%] h-[16.16%]">
          <Image src={figure8} alt="Figure 8" layout="fill" objectFit="none" />
        </div>
        {/* Figure 9 - right middle shape */}
        <div className="absolute left-[95.09%] top-[38.23%] w-[4.92%] h-[20.13%]">
          <Image src={figure9} alt="Figure 9" layout="fill" objectFit="none" />
        </div>
      </div>
      <div className="absolute inset-0 bg-black/25 flex flex-col items-center justify-center text-center px-4">
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
