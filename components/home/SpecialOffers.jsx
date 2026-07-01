import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Loader from "../ui/Loader";

/**
 * Special Offers component displaying a carousel of images
 * fetched from an external API.
 */
export default function SpecialOffers() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch random images from Lorem Picsum as special offers
    fetch("https://picsum.photos/v2/list?page=2&limit=5")
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching special offers:", err);
        setLoading(false);
      });
  }, []);

  // Auto-play the slider
  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [images, currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };

  return (
    <section className="relative overflow-hidden max-w-[1856px] w-full h-[512px] mx-auto border-t-2 border-primary-dark">
      {loading && (
        <div className="absolute inset-0 grid justify-items-center content-center gap-8 ">
          <h1 className="text-3xl font-bold text-white bg-primary px-4 py-2 rounded-md">
            Cargando ofertas
          </h1>
          <Loader />
        </div>
      )}
      {images && images.length > 0 && (
        <>
          <h1 className="absolute top-0 left-1/2 -translate-x-1/2 z-50 text-3xl font-bold text-white bg-primary px-12 py-4 rounded-es-full rounded-ee-full">
            Ofertas Especiales
          </h1>

          <div className="relative group w-full h-full overflow-hidden">
            {/* Slides */}
            <div
              className="flex transition-transform duration-500 ease-out h-full"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {images.map((image) => (
                <div key={image.id} className="min-w-full h-full relative">
                  <img
                    src={image.download_url}
                    alt={`Special Offer by ${image.author}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-bottom p-8">
                    <div className="mt-auto text-white">
                      <p className="text-sm font-semibold uppercase tracking-wider text-primary-light mb-1">
                        Oferta Exclusiva
                      </p>
                      <h3 className="text-3xl font-bold mb-2">
                        Descuentos de hasta el 50%
                      </h3>
                      <p className="text-lg opacity-90">
                        Capturado por: {image.author}
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
              {images.map((_, i) => (
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
      {!loading && (!images || images.length === 0) && (
        <div className="absolute inset-0 grid justify-items-center content-center gap-4">
          <h1 className="text-3xl font-bold text-white bg-primary px-12 py-4 rounded-md">
            No hay ofertas que mostrar
          </h1>
        </div>
      )}
    </section>
  );
}
