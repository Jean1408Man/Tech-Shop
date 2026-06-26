/**
 * Static data describing the categories and products available on
 * the Temu clone. In a real application you would fetch this
 * information from an API or database. Here we keep it in-memory
 * to simplify the example and avoid any backend requirements.
 */
export const categories = [
  {
    name: 'Moda',
    slug: 'fashion',
    image:
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=60',
  },
  {
    name: 'Electrónica',
    slug: 'electronics',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=60',
  },
  {
    name: 'Hogar y cocina',
    slug: 'home-kitchen',
    image:
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=600&q=60',
  },
  {
    name: 'Belleza',
    slug: 'beauty',
    image:
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=60',
  },
  {
    name: 'Juguetes',
    slug: 'toys',
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=60',
  },
  {
    name: 'Deportes',
    slug: 'sports',
    image:
      'https://images.unsplash.com/photo-1558611848-73f7eb4001c6?auto=format&fit=crop&w=600&q=60',
  },
];

export const products = [
  {
    id: 1,
    name: 'Vestido rojo elegante',
    price: 29.99,
    category: 'fashion',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=60',
    description:
      'Un vestido rojo elegante perfecto para cualquier ocasión, confeccionado con materiales de alta calidad.',
  },
  {
    id: 2,
    name: 'Camiseta básica blanca',
    price: 9.99,
    category: 'fashion',
    image:
      'https://images.unsplash.com/photo-1520975698519-d8a4a3ba1781?auto=format&fit=crop&w=600&q=60',
    description:
      'Camiseta de algodón suave, ideal para combinar con cualquier atuendo.',
  },
  {
    id: 3,
    name: 'Smartphone de última generación',
    price: 499.99,
    category: 'electronics',
    image:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=60',
    description:
      'Un potente smartphone con cámara de alta resolución y gran autonomía.',
  },
  {
    id: 4,
    name: 'Auriculares inalámbricos',
    price: 59.99,
    category: 'electronics',
    image:
      'https://images.unsplash.com/photo-1510867759970-401c2d6e9c84?auto=format&fit=crop&w=600&q=60',
    description:
      'Auriculares Bluetooth con cancelación de ruido y sonido envolvente.',
  },
  {
    id: 5,
    name: 'Set de utensilios de cocina',
    price: 39.99,
    category: 'home-kitchen',
    image:
      'https://images.unsplash.com/photo-1498579167354-54f7d6c7d3b4?auto=format&fit=crop&w=600&q=60',
    description:
      'Completo set de utensilios para tu cocina, fabricados en acero inoxidable.',
  },
  {
    id: 6,
    name: 'Lámpara decorativa vintage',
    price: 24.99,
    category: 'home-kitchen',
    image:
      'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=600&q=60',
    description:
      'Lámpara de diseño vintage que aporta calidez a cualquier espacio.',
  },
  {
    id: 7,
    name: 'Kit de maquillaje profesional',
    price: 79.99,
    category: 'beauty',
    image:
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=60',
    description:
      'Set de maquillaje con una amplia variedad de colores para un acabado perfecto.',
  },
  {
    id: 8,
    name: 'Crema hidratante natural',
    price: 14.99,
    category: 'beauty',
    image:
      'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=60',
    description:
      'Crema hidratante elaborada con ingredientes naturales que dejan tu piel suave y nutrida.',
  },
  {
    id: 9,
    name: 'Juego educativo de construcción',
    price: 19.99,
    category: 'toys',
    image:
      'https://images.unsplash.com/photo-1551712690-073349a44386?auto=format&fit=crop&w=600&q=60',
    description:
      'Colorido set de bloques para fomentar la creatividad y el aprendizaje en los niños.',
  },
  {
    id: 10,
    name: 'Pelota de fútbol profesional',
    price: 29.99,
    category: 'sports',
    image:
      'https://images.unsplash.com/photo-1508609349937-5ec4ae374eb1?auto=format&fit=crop&w=600&q=60',
    description:
      'Balón de fútbol fabricado con materiales de alta calidad para un rendimiento óptimo.',
  },
  {
    id: 11,
    name: 'Sudadera deportiva con capucha',
    price: 34.99,
    category: 'sports',
    image:
      'https://images.unsplash.com/photo-1542293787938-c9e299b8803b?auto=format&fit=crop&w=600&q=60',
    description:
      'Sudadera cómoda y transpirable, ideal para entrenamiento o uso diario.',
  },
  {
    id: 12,
    name: 'Muñeca de colección',
    price: 15.99,
    category: 'toys',
    image:
      'https://images.unsplash.com/photo-1535930749574-1399327ce78f?auto=format&fit=crop&w=600&q=60',
    description:
      'Muñeca de colección con detalles cuidadosamente elaborados.',
  },
];