import React from 'react';

const Filtros = ({ filtro, setFiltro }) => {
  return (
    <div className="p-4 bg-green-500 rounded-lg shadow-md mb-9">
      {/* Único input de búsqueda */}
      <input
        type="text"
        placeholder="Buscar producto..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="p-2 w-full rounded-md text-black"
      />
    </div>
  );
};

export default Filtros;
