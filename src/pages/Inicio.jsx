import { useState, useEffect } from 'react';
import BarraBusqueda from '../components/BarraBusqueda';
import ListaSeries from '../components/ListaSeries';
import ListaFavoritos from '../components/ListaFavoritos';
import ModalDetalleSerie from '../components/ModalDetalleSerie';

export default function Inicio() {
  const [resultados, setResultados] = useState([]);
  const [seleccionada, setSeleccionada] = useState(null);
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem('favoritos_series');
    if (raw) setFavoritos(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem('favoritos_series', JSON.stringify(favoritos));
  }, [favoritos]);

  const handleBuscar = async (texto) => {
    if (!texto) {
      setResultados([]);
      return;
    }
    const res = await fetch(`https://api.tvmaze.com/search/shows?q=${texto}`);
    const data = await res.json();
    setResultados(data.map(item => item.show));
  };

  const toggleFavorito = (serie) => {
    setFavoritos(prev =>
      prev.some(f => f.id === serie.id)
        ? prev.filter(f => f.id !== serie.id)
        : [...prev, serie]
    );
  };

  return (
    <main className="app-contenedor">
      <h1>Buscador de series</h1>

      <BarraBusqueda onBuscar={handleBuscar} />

      <ListaSeries
        series={resultados}
        onSelect={setSeleccionada}
        favoritos={favoritos}
        onFavorito={toggleFavorito}
      />

      <ListaFavoritos
        favoritos={favoritos}
        onSelect={setSeleccionada}
        onQuitar={toggleFavorito}
      />

      {seleccionada && (
        <ModalDetalleSerie
          serie={seleccionada}
          onCerrar={() => setSeleccionada(null)}
        />
      )}
    </main>
  );
}
