import React from 'react';

export default function BookCover({ image, title, position }) {
  const positionClasses = {
    left: "top-1/4 -left-4 -rotate-12",
    middle: "top-1/3 left-1/4 rotate-6",
    right: "top-1/2 right-0 -rotate-6"
  };

  return (
    <div className={`absolute w-48 h-64 bg-card/50 backdrop-blur-sm rounded-lg shadow-2xl transform hover:rotate-0 transition-transform duration-500 animate-float group ${positionClasses[position]}`}>
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover rounded-lg opacity-90 group-hover:opacity-100 transition-opacity"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
        <p className="text-white font-semibold">{title}</p>
      </div>
    </div>
  );
} 