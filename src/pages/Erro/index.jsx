import { Link } from "react-router-dom";
import "./erro.css";

const Erro = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <Link to="/" className="button">
        All Films
      </Link>
    </div>
  );
};

export default Erro;
