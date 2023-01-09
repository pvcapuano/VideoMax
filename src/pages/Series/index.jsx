import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./series.css";

const Series = () => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadseries() {
      const response = await api.get("/tv/top_rated", {
        params: {
          api_key: "1dfa62bb1b83007161dcee66d24b55b8",
          language: "pt-BR",
          page: 1,
        },
      });

      setSeries(response.data.results.slice(0, 10));
      console.log(response.data.results);
      setLoading(false);
    }
    loadseries();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando séries</h2>
      </div>
    );
  }

  return (
    <div className="container">
      {series.map((serie) => {
        return (
          <div className="lista-filmes" key={serie.id}>
            <img
              src={`https://image.tmdb.org/t/p/original/${serie.poster_path}`}
              alt={serie.title}
            />
            <div className="infos">
              <strong>{serie.original_name}</strong>
              <Link to={`/serie/${serie.id}`} className="button">
                + Info
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Series;
