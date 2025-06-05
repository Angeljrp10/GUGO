import React, { useState } from 'react';

const ProductDetailModal = ({ product, onClose }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [reviews, setReviews] = useState(product.reviews || []);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    answers: {
      quality: '',
      expectations: '',
      delivery: '',
      service: ''
    }
  });

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const reviewToAdd = {
      ...newReview,
      user: 'Usuario Anónimo',
      date: new Date().toLocaleDateString(),
      photos: []
    };
    setReviews([...reviews, reviewToAdd]);
    setNewReview({
      rating: 5,
      comment: '',
      answers: {
        quality: '',
        expectations: '',
        delivery: '',
        service: ''
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="md:flex">
          <div className="md:w-1/2 p-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              {product.images.slice(0, 4).map((img, index) => (
                <div key={index} className="relative pt-[100%] bg-gray-100 rounded-lg overflow-hidden">
                  <img 
                    src={img} 
                    alt={`${product.name} ${index + 1}`}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            {product.images.length > 4 && (
              <div className="relative pt-[50%] bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={product.images[4]} 
                  alt={`${product.name} 5`}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
                {product.images.length > 5 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-bold">+{product.images.length - 5} más</span>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="md:w-1/2 p-6">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-gray-600 text-sm ml-2">({product.reviews?.length || 0} reseñas)</span>
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold text-xl mb-2">${product.price?.toLocaleString() || 'Consultar'}</h3>
              <p className="text-gray-700 mb-4">{product.description}</p>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h3 className="font-semibold text-lg mb-2">Especificaciones</h3>
                <ul className="space-y-2 text-sm">
                  {product.specs?.map((spec, index) => (
                    <li key={index} className="flex">
                      <span className="text-gray-500 w-24">{spec.name}:</span>
                      <span className="font-medium">{spec.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <button className="w-full bg-black text-white py-3 rounded-lg mb-4 hover:bg-gray-800 transition font-medium">
                Comprar ahora
              </button>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex space-x-4 mb-4">
                <button 
                  onClick={() => setActiveTab('details')}
                  className={`pb-2 px-1 ${activeTab === 'details' ? 'border-b-2 border-black font-medium' : 'text-gray-500'}`}
                >
                  Detalles
                </button>
                <button 
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-2 px-1 ${activeTab === 'reviews' ? 'border-b-2 border-black font-medium' : 'text-gray-500'}`}
                >
                  Reseñas ({product.reviews?.length || 0})
                </button>
                <button 
                  onClick={() => setActiveTab('questions')}
                  className={`pb-2 px-1 ${activeTab === 'questions' ? 'border-b-2 border-black font-medium' : 'text-gray-500'}`}
                >
                  Preguntas
                </button>
              </div>
              
              {activeTab === 'details' && (
                <div>
                  <h3 className="font-semibold text-lg mb-2">Opciones de {product.category === 'salas' ? 'tela' : 'acabado'}</h3>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {product.colorOptions?.map((color, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div 
                          className="w-10 h-10 rounded-full border-2 border-gray-200 mb-1"
                          style={{ backgroundColor: color.value }}
                        />
                        <span className="text-xs text-gray-600">{color.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div>
                  {reviews.length > 0 ? (
                    <div className="space-y-4">
                      {reviews.map((review, index) => (
                        <div key={index} className="border-b pb-4">
                          <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                            <span className="text-sm text-gray-500 ml-2">{review.date}</span>
                          </div>
                          <p className="text-gray-700 mb-2">{review.comment}</p>
                          {review.photos?.length > 0 && (
                            <div className="flex space-x-2 mb-2">
                              {review.photos.map((photo, i) => (
                                <div key={i} className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                                  <img src={photo} alt="" className="w-full h-full object-cover" />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">Aún no hay reseñas para este producto.</p>
                  )}
                </div>
              )}
              
              {activeTab === 'questions' && (
                <div>
                  <h3 className="font-semibold text-lg mb-4">Preguntas frecuentes</h3>
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <h4 className="font-medium mb-2">¿Qué te ha parecido la calidad del producto?</h4>
                      <p className="text-gray-600 text-sm">Aún no hay respuestas</p>
                    </div>
                    <div className="border-b pb-4">
                      <h4 className="font-medium mb-2">¿Fue lo que esperabas?</h4>
                      <p className="text-gray-600 text-sm">Aún no hay respuestas</p>
                    </div>
                    <div className="border-b pb-4">
                      <h4 className="font-medium mb-2">¿Estuviste de acuerdo con el tiempo de entrega?</h4>
                      <p className="text-gray-600 text-sm">Aún no hay respuestas</p>
                    </div>
                    <div className="border-b pb-4">
                      <h4 className="font-medium mb-2">¿Qué te pareció el trato de nuestro personal de ventas?</h4>
                      <p className="text-gray-600 text-sm">Aún no hay respuestas</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;