export default function ModalDetalleSerie({ serie, onCerrar }) {
  return (
    <div onClick={onCerrar}>
      <h2>{serie.name}</h2>
      <p>{(serie.summary || '').replace(/<[^>]+>/g, '')}</p>
    </div>
  );
}
