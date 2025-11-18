export default function ListaFavoritos({ favoritos, onSelect, onQuitar }) {
  if (!favoritos || favoritos.length === 0) {
    return (
      <div className="favoritos-vacio">
        <h2>Favoritos</h2>
        <p>Aún no has marcado series como favoritas.</p>
      </div>
    );
  }

  return (
    <section className="favoritos">
      <header className="fav-header">
        <h2>Favoritos</h2>
        <span className="contador-fav">{favoritos.length}</span>
      </header>
      <div className="lista-favoritos">
        {favoritos.map(serie => (
          <article key={serie.id} className="fav-item">
            <img src={serie.image?.medium || '/default.jpg'} alt={serie.name} />
            <div>
              <h4>{serie.name}</h4>
              <div className="acciones-mini">
                <button onClick={() => onSelect(serie)} className="btn-primario">Ver</button>
                <button onClick={() => onQuitar(serie)} className="btn-secundario">Quitar</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}


