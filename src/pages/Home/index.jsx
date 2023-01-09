import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./home.css";

//URL API: /movie/now_playing?api_key=1dfa62bb1b83007161dcee66d24b55b8

const Home = () => {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get("/movie/now_playing", {
        params: {
          api_key: "1dfa62bb1b83007161dcee66d24b55b8",
          language: "pt-BR",
          page: 1,
        },
      });

      setFilmes(response.data.results.slice(0, 10));
      setLoading(false);
    }
    loadFilmes();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando filmes</h2>
      </div>
    );
  }

  return (
    <div className="container">
      {filmes.map((filme) => {
        return (
          <div className="lista-filmes" key={filme.id}>
            <img
              src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
              alt={filme.title}
            />
            <div className="infos">
              <strong>{filme.title}</strong>
              <Link to={`/filme/${filme.id}`} className="button">
                + Info
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
