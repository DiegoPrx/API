export default function ListaSeries({ series, onSelect, favoritos, onFavorito }) {
  if (!series || series.length === 0) {
    return <p className="mensaje-vacio">No hay resultados. Escribe algo para buscar series.</p>;
  }

  const esFavorita = (serie) => favoritos.some(f => f.id === serie.id);

  return (
    <div className="grid-series">
      {series.map(serie => (
        <article key={serie.id} className="card-serie">
          <div className="thumb">
            <img src={serie.image?.medium || '/default.jpg'} alt={serie.name} />
            <div className="badge-rating">{serie.rating?.average ?? '—'}</div>
            <div className="overlay">
              <button className="icono-corto" onClick={() => onSelect(serie)} title="Ver detalle">🔍</button>
              <button
                className={`icono-corazon ${esFavorita(serie) ? 'activo' : ''}`}
                onClick={() => onFavorito(serie)}
                aria-pressed={esFavorita(serie)}
                title={esFavorita(serie) ? 'Quitar de favoritos' : 'Añadir a favoritos'}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden>
                  <path d="M12 21s-7-4.35-9.06-7.03C1.36 11.21 2.1 7.5 5.5 6.1 7.08 5.45 9 6 10 7.3c1-1.3 2.92-1.85 4.5-1.2 3.4 1.4 4.14 5.11 2.56 7.87C19 16.65 12 21 12 21z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          <div className="card-body">
            <h3>{serie.name}</h3>
            <p className="resumen">{(serie.summary || '').replace(/<[^>]*>?/gm, '').slice(0, 120)}{(serie.summary || '').length > 120 ? '…' : ''}</p>
            <div className="acciones">
              <button onClick={() => onSelect(serie)} className="btn-primario">Ver detalle</button>
              <button onClick={() => onFavorito(serie)} className="btn-secundario">
                {esFavorita(serie) ? 'Quitar' : 'Favorito'}
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}


