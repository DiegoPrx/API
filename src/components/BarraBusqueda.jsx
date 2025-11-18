import { useState, useEffect } from 'react';

export default function BarraBusqueda({ onBuscar }) {
  const [valor, setValor] = useState('');

  useEffect(() => {
    const id = setTimeout(() => {
      onBuscar(valor);
    }, 400);
    return () => clearTimeout(id);
  }, [valor]);

  return (
    <input
      type="text"
      value={valor}
      onChange={(e) => setValor(e.target.value)}
      placeholder="Buscar series..."
    />
  );
}
