import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <header>
      <Link className="logo" to="/">
        VideoMax
      </Link>
      <Link className="favoritos" to="/favoritos">
        Favoritos
      </Link>
    </header>
  );
};

export default Header;
