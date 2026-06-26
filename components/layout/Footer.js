/**
 * Simple footer with placeholder links. Real e‑commerce sites such as
 * Temu include customer service links, policies and app download
 * buttons. You can extend this component with additional information
 * relevant to your own marketplace.
 */
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-8">
      <div className="container mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <h3 className="text-white font-semibold mb-2">Acerca de</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:underline">Quiénes somos</a></li>
            <li><a href="#" className="hover:underline">Nuestra misión</a></li>
            <li><a href="#" className="hover:underline">Carreras</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-2">Servicio al cliente</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:underline">Ayuda</a></li>
            <li><a href="#" className="hover:underline">Envíos y devoluciones</a></li>
            <li><a href="#" className="hover:underline">Contacto</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-2">Comunidad</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:underline">Blog</a></li>
            <li><a href="#" className="hover:underline">Programa de afiliados</a></li>
            <li><a href="#" className="hover:underline">Influencers</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-2">Legal</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:underline">Términos de uso</a></li>
            <li><a href="#" className="hover:underline">Privacidad</a></li>
            <li><a href="#" className="hover:underline">Cookies</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Temu Clone. Todos los derechos reservados.
      </div>
    </footer>
  );
}
