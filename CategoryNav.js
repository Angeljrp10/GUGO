
import React from 'react';

const CategoryNav = ({ activeCategory, setActiveCategory }) => {
  const categories = [
    { id: 'salas', name: 'Salas' },
    { id: 'recamaras', name: 'Recámaras' },
    { id: 'cocinas', name: 'Cocinas' },
    { id: 'comedores', name: 'Comedores' }
  ];

  return (
    <nav className="fixed top-0 left-0 h-full w-40 bg-[#3e2723] shadow-xl z-20 flex flex-col items-center py-6 space-y-4">
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => setActiveCategory(category.id)}
          className={`w-full py-3 text-center text-white font-semibold transition-all duration-500 relative overflow-hidden
            ${activeCategory === category.id ? 'bg-gradient-to-r from-[#5d4037] to-[#8d6e63]' : 'hover:bg-[#4e342e]'}`}
        >
          <span className="relative z-10">{category.name}</span>
          {activeCategory === category.id && (
            <span className="absolute inset-0 animate-shimmer bg-gradient-to-r from-[#6d4c41] via-[#8d6e63] to-[#6d4c41] opacity-40"></span>
          )}
        </button>
      ))}
    </nav>
  );
};

export default CategoryNav;
