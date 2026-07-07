/**
 * Tour step definitions for the Tech Shop application.
 *
 * Each tour is keyed by route and contains an ordered list of steps.
 * Steps reference DOM elements via CSS selectors and include a title
 * and description that will be displayed in the driver.js popover.
 */

export const HOME_TOUR_STEPS = [
  {
    element: "#tour-hero",
    title: "Bienvenido a Tech Shop",
    description:
      "Esta es la página principal de nuestra tienda. Aquí encontrará las mejores ofertas y productos destacados.",
    side: "bottom",
  },
  {
    element: "#tour-search",
    title: "Buscador de productos",
    description:
      "Utilice este campo para buscar cualquier producto por nombre, categoría o palabra clave.",
    side: "bottom",
  },
  {
    element: "#tour-categories",
    title: "Categorías de productos",
    description:
      "Explore nuestra amplia gama de categorías para encontrar exactamente lo que necesita.",
    side: "bottom",
  },
  {
    element: "#tour-special-offers",
    title: "Ofertas especiales",
    description:
      "No se pierda nuestras ofertas exclusivas con descuentos significativos por tiempo limitado.",
    side: "top",
  },
  {
    element: "#tour-combos",
    title: "Ofertas de combos",
    description:
      "Explora los combos preparados y ofertados por tiempo limitado.",
    side: "top",
  },
  {
    element: "#tour-product-grid",
    title: "Catálogo de productos",
    description:
      "Navegue por nuestro catálogo completo. Haga clic en cualquier producto para ver más detalles.",
    side: "top",
  },
  {
    element: "#tour-cart",
    title: "Carrito de compras",
    description:
      "Aquí puede ver los productos seleccionados, modificar cantidades y proceder al pago.",
    side: "left",
  },
  {
    element: "#tour-auth",
    title: "Acceso de usuario",
    description:
      "Inicie sesión o cree una cuenta para guardar su historial de compras y acceder a ofertas personalizadas.",
    side: "bottom",
  },
];

export const PRODUCT_TOUR_STEPS = [
  {
    element: "#tour-product-image",
    title: "Imagen del producto",
    description:
      "Visualice el producto desde diferentes ángulos. La imagen principal muestra el artículo en detalle.",
    side: "left",
  },
  {
    element: "#tour-product-info",
    title: "Información del producto",
    description:
      "Aquí encontrará el nombre, la calificación de otros clientes y el precio actual del artículo.",
    side: "right",
  },
  {
    element: "#tour-product-description",
    title: "Descripción detallada",
    description:
      "Conozca las características, especificaciones y beneficios de este producto antes de comprar.",
    side: "right",
  },
  {
    element: "#tour-add-to-cart",
    title: "Agregar al carrito",
    description:
      "Seleccione la cantidad deseada y agregue el producto a su carrito de compras con un solo clic.",
    side: "left",
  },
];

export const CART_TOUR_STEPS = [
  {
    element: "#tour-cart-items",
    title: "Productos en el carrito",
    description:
      "Revise los productos que ha seleccionado. Puede modificar cantidades o eliminar artículos desde aquí.",
    side: "top",
  },
  {
    element: "#tour-cart-summary",
    title: "Resumen del pedido",
    description:
      "Consulte el subtotal, los descuentos aplicados y el total a pagar antes de finalizar la compra.",
    side: "left",
  },
  {
    element: "#tour-checkout-btn",
    title: "Finalizar compra",
    description:
      "Haga clic aquí para proceder al pago. Deberá completar sus datos de contacto para crear el pedido.",
    side: "top",
  },
  {
    element: "#tour-checkout-form",
    title: "Formulario de pedido",
    description:
      "Ingrese su nombre y número de teléfono. Esta información será utilizada para coordinar la entrega.",
    side: "left",
  },
];

export const SEARCH_TOUR_STEPS = [
  {
    element: "#tour-search-header",
    title: "Resultados de búsqueda",
    description:
      "Aquí se muestran todos los productos que coinciden con su criterio de búsqueda.",
    side: "bottom",
  },
  {
    element: "#tour-search-grid",
    title: "Productos encontrados",
    description:
      "Explore los resultados. Haga clic en cualquier producto para ver su ficha detallada.",
    side: "top",
  },
];

export const ADMIN_TOUR_STEPS = [
  {
    element: "#tour-admin-sidebar",
    title: "Panel de navegación administrativa",
    description:
      "Utilice este menú para acceder a las diferentes secciones de gestión: productos, categorías, ofertas, combos, pedidos y usuarios.",
    side: "right",
  },
  {
    element: "#tour-admin-header",
    title: "Encabezado de entidad",
    description:
      "Aquí se muestra la entidad actualmente seleccionada, su descripción y las acciones disponibles.",
    side: "bottom",
  },
  {
    element: "#tour-admin-search",
    title: "Buscador de registros",
    description:
      "Filtre los registros de la entidad actual escribiendo un término de búsqueda en este campo.",
    side: "bottom",
  },
  {
    element: "#tour-admin-create-btn",
    title: "Crear nuevo registro",
    description:
      "Haga clic en este botón para agregar un nuevo elemento a la entidad actual.",
    side: "left",
  },
  {
    element: "#tour-admin-table",
    title: "Tabla de registros",
    description:
      "Visualice todos los registros de la entidad. Utilice los botones de acción para ver detalles, editar o eliminar.",
    side: "top",
  },
  {
    element: "#tour-admin-actions",
    title: "Acciones por registro",
    description:
      "Cada fila dispone de tres acciones: ver detalle, editar y eliminar. Utilice el ícono de ojo para ver información completa.",
    side: "left",
  },
];

export const ADMIN_FORM_TOUR_STEPS = [
  {
    element: "#tour-admin-form",
    title: "Formulario de entidad",
    description:
      "Complete los campos requeridos para crear o editar un registro. Los campos marcados son obligatorios.",
    side: "right",
  },
  {
    element: "#tour-admin-form-submit",
    title: "Guardar cambios",
    description:
      "Una vez completado el formulario, haga clic aquí para guardar la información en el sistema.",
    side: "top",
  },
];

export const ADMIN_DETAIL_TOUR_STEPS = [
  {
    element: "#tour-admin-detail",
    title: "Vista detallada del registro",
    description:
      "Aquí se muestra toda la información del registro seleccionado, incluyendo datos relacionados.",
    side: "right",
  },
  {
    element: "#tour-admin-detail-actions",
    title: "Acciones disponibles",
    description:
      "Desde esta vista puede editar el registro o regresar a la lista principal.",
    side: "left",
  },
];
