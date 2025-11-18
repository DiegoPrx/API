import { useEffect } from 'react';

export default function ModalDetalleSerie({ serie, onCerrar }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onCerrar(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onCerrar]);

  if (!serie) return null;

  return (
    <div className="modal-overlay" onClick={onCerrar} role="dialog" aria-modal="true">
      <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h2>{serie.name}</h2>
          <button className="cerrar" onClick={onCerrar} aria-label="Cerrar">✕</button>
        </header>
        <div className="modal-body">
          <img src={serie.image?.original || serie.image?.medium || '/default.jpg'} alt={serie.name} />
          <div className="detalle-texto">
            <p className="resumen-largo">{(serie.summary || '').replace(/<[^>]*>?/gm, '')}</p>
            <p><strong>Género:</strong> {serie.genres?.join(', ') || '—'}</p>
            <p><strong>Rating:</strong> {serie.rating?.average ?? '—'}</p>
            <p><strong>Estreno:</strong> {serie.premiered ?? '—'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

