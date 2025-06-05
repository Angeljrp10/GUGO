import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductDetailModal from './ProductDetailModal';

const mockProducts = {
  salas: [
    {
      id: 1,
      name: 'Sala Minimalista Oslo',
      shortDescription: 'Diseño contemporáneo ideal para espacios reducidos',
      description: 'La sala Oslo combina elegancia y funcionalidad en un diseño compacto. Incluye 2 sofás de 2 plazas cada uno y 2 taburetes multifuncionales que pueden servir como mesas auxiliares o asientos adicionales. Estructura en madera de haya con patas metálicas.',
      images: ['/sofa-oslo-1.jpg', '/sofa-oslo-2.jpg', '/sofa-oslo-3.jpg'],
      rating: 4,
      reviews: 28,
      colorOptions: [
        { name: 'Lino Beige', value: '#F5E6C8' },
        { name: 'Chenilla Gris', value: '#CFCFCF' },
        { name: 'Piel Negro', value: '#2D2D2D' },
        { name: 'Algodón Azul', value: '#E1EFF6' },
        { name: 'Lino Verde', value: '#E8F5E9' }
      ],
      specs: [
        { name: 'Dimensiones', value: '320 x 180 cm' },
        { name: 'Material', value: 'Madera de haya' },
        { name: 'Incluye', value: '2 sofás + 2 taburetes' },
        { name: 'Estilo', value: 'Moderno' }
      ],
      category: 'salas'
    }
  ],
  recamaras: [
    {
      id: 2,
      name: 'Recámara Nordic',
      shortDescription: 'Conjunto de dormitorio en madera clara con diseño escandinavo',
      description: 'El conjunto Nordic incluye cama king size, 2 mesitas de noche y cómoda de 6 cajones. Fabricado en madera de pino con acabado natural que resalta la veta. Diseño limpio y funcional con detalles en metal negro mate.',
      images: ['/recamara-nordic-1.jpg', '/recamara-nordic-2.jpg'],
      rating: 5,
      reviews: 42,
      colorOptions: [
        { name: 'Natural', value: '#E4D5C3' },
        { name: 'Blanco', value: '#FFFFFF' },
        { name: 'Gris', value: '#9E9E9E' },
        { name: 'Nogal', value: '#5C3A21' },
        { name: 'Negro', value: '#212121' }
      ],
      specs: [
        { name: 'Cama', value: 'King Size (180x200cm)' },
        { name: 'Material', value: 'Madera de pino' },
        { name: 'Incluye', value: 'Cama + 2 mesitas + cómoda' },
        { name: 'Estilo', value: 'Escandinavo' }
      ],
      category: 'recamaras'
    }
  ],
  cocinas: [
    {
      id: 3,
      name: 'Cocina Integral Linear',
      shortDescription: 'Diseño minimalista con líneas limpias y maximización de espacio',
      description: 'Sistema de cocina integral con 3.5m lineales que incluye gabinetes superiores e inferiores, cubierta de cuarzo de 2cm de espesor y campana decorativa. Perfecta para espacios urbanos con opción de personalización en acabados.',
      images: ['/cocina-linear-1.jpg', '/cocina-linear-2.jpg'],
      rating: 4,
      reviews: 35,
      colorOptions: [
        { name: 'Blanco Brillante', value: '#FFFFFF' },
        { name: 'Gris Cemento', value: '#9E9E9E' },
        { name: 'Madera Natural', value: '#D2B48C' },
        { name: 'Verde Botella', value: '#006A4E' },
        { name: 'Azul Marino', value: '#1A237E' }
      ],
      specs: [
        { name: 'Medidas', value: '350 cm lineales' },
        { name: 'Cubierta', value: 'Cuarzo 2cm' },
        { name: 'Incluye', value: 'Gabinetes + cubierta' },
        { name: 'Estilo', value: 'Moderno' }
      ],
      category: 'cocinas'
    },
    {
      id: 4,
      name: 'Isla Cocina Industrial',
      shortDescription: 'Isla central con estilo industrial y almacenaje amplio',
      description: 'Isla de cocina con estructura metálica y superficie de acero inoxidable. Incluye 4 cajones de almacenamiento, estante inferior abierto y barra para 3 banquetas. Patines metálicos permiten reubicación fácil.',
      images: ['/isla-cocina-1.jpg', '/isla-cocina-2.jpg'],
      rating: 4,
      reviews: 18,
      colorOptions: [
        { name: 'Acero Inox', value: '#D3D3D3' },
        { name: 'Negro Mate', value: '#424242' },
        { name: 'Cobre', value: '#B87333' },
        { name: 'Verde Militar', value: '#556B2F' },
        { name: 'Cemento', value: '#9E9E9E' }
      ],
      specs: [
        { name: 'Dimensiones', value: '150 x 90 cm' },
        { name: 'Material', value: 'Metal + acero' },
        { name: 'Capacidad', value: '4 cajones grandes' },
        { name: 'Estilo', value: 'Industrial' }
      ],
      category: 'cocinas'
    }
  ],
  comedores: [
    {
      id: 5,
      name: 'Comedor Minimal Copenhagen',
      shortDescription: 'Mesa con extensión y 6 sillas de diseño danés',
      description: 'Conjunto de comedor de 6 piezas con mesa extensible de 1.40 a 1.80m y 6 sillas tapizadas. Base metálica cromada con superficie de madera MDF lacado. Ideal para espacios modernos que buscan elegancia sin complicaciones.',
      images: ['/comedor-copenhagen-1.jpg', '/comedor-copenhagen-2.jpg'],
      rating: 4,
      reviews: 24,
      colorOptions: [
        { name: 'Blanco', value: '#FFFFFF' },
        { name: 'Negro', value: '#000000' },
        { name: 'Roble', value: '#C19A6B' },
        { name: 'Nogal', value: '#5C3A21' },
        { name: 'Gris', value: '#616161' }
      ],
      specs: [
        { name: 'Mesa', value: '140-180cm extensible' },
        { name: 'Sillas', value: '6 unidades' },
        { name: 'Material', value: 'Madera + metal' },
        { name: 'Estilo', value: 'Minimalista' }
      ],
      category: 'comedores'
    },
    {
      id: 6,
      name: 'Comedor Rústico Toscana',
      shortDescription: 'Mesa rectangular de madera maciza con bancos laterales',
      description: 'Juego de comedor estilo rústico con mesa de pino macizo de 1.60m y 2 bancos laterales. Acabado envejecido natural con detalles artesanales. Perfecto para crear ambientes cálidos y acogedores.',
      images: ['/comedor-toscana-1.jpg', '/comedor-toscana-2.jpg'],
      rating: 4,
      reviews: 15,
      colorOptions: [
        { name: 'Natural', value: '#D2B48C' },
        { name: 'Blanco Rústico', value: '#F5F5DC' },
        { name: 'Gris Desgaste', value: '#A9A9A9' },
        { name: 'Caoba', value: '#884E2D' },
        { name: 'Envejecido', value: '#8B4513' }
      ],
      specs: [
        { name: 'Mesa', value: '160cm rectangular' },
        { name: 'Bancos', value: '2 unidades' },
        { name: 'Material', value: 'Pino macizo' },
        { name: 'Estilo', value: 'Rústico' }
      ],
      category: 'comedores'
    }
  ]
};

const ProductGallery = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    setProducts(mockProducts[category] || []);
  }, [category]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard 
            key={product.id}
            product={product}
            onClick={() => setSelectedProduct(product)}
          />
        ))}
      </div>
      
      {selectedProduct && (
        <ProductDetailModal 
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default ProductGallery;

// DONE