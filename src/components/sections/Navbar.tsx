import React from 'react';

export const Navbar = () => {
  return (
    <nav className="w-full bg-gradient-to-r from-blue-700 to-blue-500 shadow-lg py-3 px-6 flex flex-col md:flex-row items-center justify-between">
      <div className="flex items-center gap-3">
        <img src="/logo-ugel.png" alt="UGEL Logo" className="h-10 w-10 rounded-full bg-white p-1 shadow" />
        <span className="text-white text-xl font-bold tracking-wide">UGEL - Ficha de Monitoreo</span>
      </div>
      <div className="mt-2 md:mt-0 flex flex-col md:flex-row gap-2 md:gap-6 text-white text-sm md:text-base">
        <span className="opacity-80">Etapa 2 - Refuerzo Escolar Primaria</span>
        <span className="opacity-80">Año 2026</span>
        <span className="opacity-80">Solo informativo</span>
      </div>
    </nav>
  );
};
