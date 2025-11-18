import { useState, useEffect } from 'react';

export default function BarraBusqueda({ onBuscar, placeholder = 'Buscar series...' }) {
  const [valor, setValor] = useState('');

  useEffect(() => {
    const id = setTimeout(() => {
      onBuscar(valor);
    }, 500);
    return () => clearTimeout(id);
  }, [valor, onBuscar]);

  return (
    <div className="buscar-wrapper">
      <label htmlFor="buscador" className="sr-only">Buscar series</label>
      <div className="input-con-icono">
        <span className="icono-buscar" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
        <input
          id="buscador"
          type="text"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          placeholder={placeholder}
          className="input-buscar"
        />
        <button
          type="button"
          className="boton-limpiar"
          onClick={() => setValor('')}
          title="Limpiar búsqueda"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
