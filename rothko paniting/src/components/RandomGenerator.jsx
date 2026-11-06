export default function RandomGenerator({ onGenerate }) {
  return (
    <button type="button" className="random-button" onClick={onGenerate}>
      <span className="random-icon"><i className="bi bi-stars" /></span>
      <span><strong>Surprise me</strong><small>Generate a considered composition</small></span>
      <i className="bi bi-arrow-right ms-auto" />
    </button>
  );
}
