export default function ListaSeries({ series, onSelect, favoritos, onFavorito }) {
  if (!series || series.length === 0) return <p>No hay resultados.</p>;

  return (
    <div>
      {series.map(serie => (
        <div key={serie.id}>
          <h3>{serie.name}</h3>
          <button onClick={() => onSelect(serie)}>Ver</button>
          <button onClick={() => onFavorito(serie)}>
            {favoritos.some(f => f.id === serie.id) ? "Quitar" : "Favorito"}
          </button>
        </div>
      ))}
    </div>
  );
}
