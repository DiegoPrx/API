import { useState, useEffect } from 'react';
import BarraBusqueda from '../components/BarraBusqueda';
import ListaSeries from '../components/ListaSeries';
import ModalDetalleSerie from '../components/ModalDetalleSerie';
import ListaFavoritos from '../components/ListaFavoritos';

export default function Inicio() {
  const [resultados, setResultados] = useState([]);
  const [seleccionada, setSeleccionada] = useState(null);
  const [favoritos, setFavoritos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  // Cargar favoritos de localStorage al iniciar
  useEffect(() => {
    try {
      const raw = localStorage.getItem('favoritos_series');
      if (raw) setFavoritos(JSON.parse(raw));
    } catch (e) {
      console.warn('No se pudo leer favoritos desde localStorage', e);
    }
  }, []);

  // Guardar favoritos cuando cambien
  useEffect(() => {
    try {
      localStorage.setItem('favoritos_series', JSON.stringify(favoritos));
    } catch (e) {
      console.warn('No se pudo guardar favoritos en localStorage', e);
    }
  }, [favoritos]);

  const handleBuscar = async (query) => {
    if (!query || !query.trim()) {
      setResultados([]);
      setError(null);
      return;
    }

    setCargando(true);
    setError(null);
    try {
      const res = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setResultados(data.map(item => item.show));
    } catch (err) {
      console.error('Error al buscar:', err);
      setError('Hubo un problema buscando. Intenta de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  const seleccionar = (serie) => setSeleccionada(serie);

  const alternarFavorito = (serie) => {
    setFavoritos(prev => 
      prev.some(f => f.id === serie.id)
        ? prev.filter(f => f.id !== serie.id)
        : [...prev, serie]
    );
  };

  return (
    <main className="app-contenedor">
      <header className="app-header">
        <h1>Buscador de series</h1>
        <p className="subtitulo">Busca tus series favoritas y guárdalas para consultarlas después.</p>
      </header>

      <section className="panel-busqueda">
        <BarraBusqueda onBuscar={handleBuscar} />
      </section>

      <section className="contenido-principal">
        <div className="col-izq">
          {cargando && <p className="cargando">Cargando resultados…</p>}
          {error && <p className="error">{error}</p>}
          <ListaSeries series={resultados} onSelect={seleccionar} onFavorito={alternarFavorito} favoritos={favoritos} />
        </div>
        <aside className="col-der">
          <ListaFavoritos favoritos={favoritos} onSelect={seleccionar} onQuitar={alternarFavorito} />
        </aside>
      </section>

      {seleccionada && <ModalDetalleSerie serie={seleccionada} onCerrar={() => setSeleccionada(null)} />}
    </main>
  );
}

