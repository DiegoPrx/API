export default function ListaFavoritos({ favoritos, onSelect, onQuitar }) {
  return (
    <div>
      <h2>Favoritos ({favoritos.length})</h2>
      {favoritos.map(s => (
        <div key={s.id}>
          <span>{s.name}</span>
          <button onClick={() => onSelect(s)}>Ver</button>
          <button onClick={() => onQuitar(s)}>Quitar</button>
        </div>
      ))}
    </div>
  )
}
