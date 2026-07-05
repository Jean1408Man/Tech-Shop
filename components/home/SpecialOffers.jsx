import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getOffers } from "../../services/catalogService";
import Loader from "../ui/Loader";
import TitleTab from "../ui/TitleTab";

export default function SpecialOffers() {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const loadOffers = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getOffers();
      setOffers(data);
    } catch {
      setOffers([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOffers();
  }, [loadOffers]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [offers]);

  useEffect(() => {
    if (offers.length === 0) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [offers, currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % offers.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + offers.length) % offers.length,
    );
  };

  if (!isLoading && !offers?.length) {
    return null;
  }

  return (
    <section className="relative overflow-hidden max-w-[1856px] w-full h-[256px] mx-auto border-t-2 border-primary-dark">
      {isLoading && (
        <div className="absolute inset-0 grid justify-items-center content-center gap-8 ">
          <h1 className="text-3xl font-bold text-white bg-primary px-4 py-2 rounded-md">
            Cargando ofertas
          </h1>
          <Loader />
        </div>
      )}
      {offers && offers.length > 0 && (
        <>
          <TitleTab variant="absolute">Ofertas Especiales</TitleTab>

          <div className="relative group w-full h-full overflow-hidden">
            {/* Slides */}
            <div
              className="flex transition-transform duration-500 ease-out h-full"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {offers.map((offer) => (
                <div key={offer.id} className="min-w-full h-full relative">
                  <img
                    src={offer.image}
                    alt={offer.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-bottom p-8">
                    <div className="mt-auto text-white">
                      <p className="text-sm font-semibold uppercase tracking-wider text-primary-light mb-1">
                        Oferta Exclusiva
                      </p>
                      <h3 className="text-3xl font-bold mb-2">{offer.name}</h3>
                      <p className="text-lg opacity-90">
                        {offer.description ||
                          `Ahorra $${offer.discount.toFixed(2)} en productos seleccionados`}
                      </p>
                      <button className="mt-4 bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-full transition-colors">
                        Ver Ahora
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
              aria-label="Anterior"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
              aria-label="Siguiente"
            >
              <ChevronRight size={32} />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {offers.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentIndex === i ? "bg-primary w-6" : "bg-white/50"
                  }`}
                  aria-label={`Ir a imagen ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
