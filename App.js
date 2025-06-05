import React, { useState } from 'react';
import CategoryNav from './components/CategoryNav';
import ProductGallery from './components/ProductGallery';
import AdminUploadForm from './components/AdminUploadForm';
import AdminLogin from './components/AdminLogin';

const App = () => {
  const [activeCategory, setActiveCategory] = useState('salas');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState({
    salas: [],
    recamaras: [],
    cocinas: [],
    comedores: []
  });

  const handleAdminAccess = () => {
    setShowAdminLogin(true);
  };

  const handleAdminLogin = () => {
    setIsAdminMode(true);
    setShowAdminLogin(false);
  };

  const handleSaveProduct = (productData) => {
    const categoryProducts = products[productData.category] || [];
    const existingIndex = categoryProducts.findIndex(p => p.id === productData.id);
    
    let updatedProducts = {...products};
    
    if (existingIndex >= 0) {
      updatedProducts[productData.category][existingIndex] = productData;
    } else {
      updatedProducts[productData.category] = [...categoryProducts, productData];
    }
    
    setProducts(updatedProducts);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId) => {
    const updatedProducts = {...products};
    for (const category in updatedProducts) {
      updatedProducts[category] = updatedProducts[category].filter(p => p.id !== productId);
    }
    setProducts(updatedProducts);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">GUGO | Estilo que se vive</h1>
          {!isAdminMode ? (
            <button 
              onClick={handleAdminAccess}
              className="bg-black text-white px-4 py-2 rounded-md text-sm"
            >
              Acceso Admin
            </button>
          ) : (
            <button 
              onClick={() => setIsAdminMode(false)}
              className="bg-gray-600 text-white px-4 py-2 rounded-md text-sm"
            >
              Salir
            </button>
          )}
        </div>
      </header>

      {showAdminLogin && (
        <AdminLogin 
          onLogin={handleAdminLogin}
          onClose={() => setShowAdminLogin(false)}
        />
      )}

      {isAdminMode && (
        <div className="container mx-auto py-8">
          <button
            onClick={() => setEditingProduct({
              id: Date.now(),
              category: 'salas',
              name: '',
              description: '',
              shortDescription: '',
              price: 0,
              discountPrice: 0,
              rating: 0,
              reviews: 0,
              fabricOptions: [],
              colorOptions: [],
              images: [],
              specs: [],
              questions: [
                { text: '¿Qué te ha parecido la calidad del producto?', answers: [] },
                { text: '¿Fue lo que esperabas?', answers: [] },
                { text: '¿Estuviste de acuerdo con el tiempo de entrega?', answers: [] },
                { text: '¿Qué te pareció el trato de nuestro personal de ventas?', answers: [] }
              ],
              comments: []
            })}
            className="mb-4 bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
          >
            + Nuevo Producto
          </button>
          
          {editingProduct && (
            <AdminUploadForm 
              productToEdit={editingProduct}
              onSave={handleSaveProduct}
              onCancel={() => setEditingProduct(null)}
            />
          )}
        </div>
      )}

      {!isAdminMode && !editingProduct && (
        <>
          <CategoryNav 
            activeCategory={activeCategory} 
            setActiveCategory={setActiveCategory} 
          />
          <ProductGallery 
            category={activeCategory}
            products={products[activeCategory]}
            isAdmin={isAdminMode}
            onEdit={setEditingProduct}
            onDelete={handleDeleteProduct}
          />
        </>
      )}
    </div>
  );
};

export default App;