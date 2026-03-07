import "./loader.css";

export function LoadingDots({ n = 3 }) {
  return (
    <span className="loading-dots">
      {Array(n).fill(<i className="bi bi-dot"></i>)}
    </span>
  );
}
