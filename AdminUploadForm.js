import React, { useState } from 'react';

const AdminUploadForm = ({ productToEdit, onSave, onCancel }) => {
  const [productData, setProductData] = useState(productToEdit);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setProductData({
      ...productData,
      images: [...productData.images, ...newImages].slice(0, 5)
    });
  };

  const removeImage = (index) => {
    const newImages = [...productData.images];
    newImages.splice(index, 1);
    setProductData({ ...productData, images: newImages });
  };

  const addColorOption = () => {
    const newColor = {
      name: `Color ${productData.colorOptions.length + 1}`,
      value: '#FFFFFF'
    };
    setProductData({
      ...productData,
      colorOptions: [...productData.colorOptions, newColor]
    });
  };

  const updateColorOption = (index, field, value) => {
    const newColors = [...productData.colorOptions];
    newColors[index][field] = value;
    setProductData({ ...productData, colorOptions: newColors });
  };

  const addSpec = () => {
    setProductData({
      ...productData,
      specs: [...productData.specs, { name: '', value: '' }]
    });
  };

  const updateSpec = (index, field, value) => {
    const newSpecs = [...productData.specs];
    newSpecs[index][field] = value;
    setProductData({ ...productData, specs: newSpecs });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(productData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        {productToEdit ? 'Editar Producto' : 'Nuevo Producto'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Categoría</label>
              <select 
                className="w-full p-2 border rounded-md"
                value={productData.category}
                onChange={(e) => setProductData({...productData, category: e.target.value})}
              >
                <option value="salas">Salas</option>
                <option value="recamaras">Recámaras</option>
                <option value="cocinas">Cocinas</option>
                <option value="comedores">Comedores</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Nombre</label>
              <input
                type="text"
                placeholder="Nombre del producto"
                className="w-full p-2 border rounded-md"
                value={productData.name}
                onChange={(e) => setProductData({...productData, name: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Descripción Corta</label>
              <input
                type="text"
                placeholder="Descripción breve para la tarjeta"
                className="w-full p-2 border rounded-md"
                value={productData.shortDescription}
                onChange={(e) => setProductData({...productData, shortDescription: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Descripción Completa</label>
              <textarea
                placeholder="Descripción detallada del producto"
                rows="4"
                className="w-full p-2 border rounded-md"
                value={productData.description}
                onChange={(e) => setProductData({...productData, description: e.target.value})}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Precio ($)</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-md"
                  value={productData.price}
                  onChange={(e) => setProductData({...productData, price: parseFloat(e.target.value)})}
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Precio con Descuento ($)</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-md"
                  value={productData.discountPrice}
                  onChange={(e) => setProductData({...productData, discountPrice: parseFloat(e.target.value)})}
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Imágenes (Máx. 5)</label>
              <div className="grid grid-cols-3 gap-2 mb-2">
                {productData.images.map((img, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={img} 
                      alt={`Preview ${index}`}
                      className="w-full h-24 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full p-2 border rounded-md"
                disabled={productData.images.length >= 5}
              />
            </div>

            {productData.category === 'salas' && (
              <div>
                <label className="block text-sm font-medium mb-1">Opciones de Tela</label>
                <div className="space-y-2">
                  {productData.fabricOptions.map((fabric, index) => (
                    <input
                      key={index}
                      type="text"
                      value={fabric}
                      onChange={(e) => {
                        const newFabrics = [...productData.fabricOptions];
                        newFabrics[index] = e.target.value;
                        setProductData({...productData, fabricOptions: newFabrics});
                      }}
                      className="w-full p-2 border rounded-md"
                      placeholder="Nombre de tela"
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => setProductData({
                      ...productData,
                      fabricOptions: [...productData.fabricOptions, '']
                    })}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    + Añadir opción de tela
                  </button>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">Opciones de Color/Acabado</label>
              <div className="space-y-2">
                {productData.colorOptions.map((color, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="color"
                      value={color.value}
                      onChange={(e) => updateColorOption(index, 'value', e.target.value)}
                      className="w-8 h-8"
                    />
                    <input
                      type="text"
                      value={color.name}
                      onChange={(e) => updateColorOption(index, 'name', e.target.value)}
                      className="flex-1 p-2 border rounded-md"
                      placeholder="Nombre del color"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addColorOption}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  + Añadir opción de color
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Especificaciones</label>
              <div className="space-y-2">
                {productData.specs.map((spec, index) => (
                  <div key={index} className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={spec.name}
                      onChange={(e) => updateSpec(index, 'name', e.target.value)}
                      className="p-2 border rounded-md"
                      placeholder="Nombre"
                    />
                    <input
                      type="text"
                      value={spec.value}
                      onChange={(e) => updateSpec(index, 'value', e.target.value)}
                      className="p-2 border rounded-md"
                      placeholder="Valor"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSpec}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  + Añadir especificación
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
          >
            Guardar Producto
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminUploadForm;

// DONE