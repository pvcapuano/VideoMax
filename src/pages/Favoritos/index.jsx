import "./favoritos.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Favoritos = () => {
  const [filmes, setFilmes] = useState([]);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const minhaLista = localStorage.getItem("favoritos");
    const minhaLista2 = localStorage.getItem("series_favoritos");
    setFilmes(JSON.parse(minhaLista) || []);
    setSeries(JSON.parse(minhaLista2) || []);
  }, []);

  function excluirFilme(id) {
    let filtroFilmes = filmes.filter((item) => {
      return item.id !== id;
    });
    setFilmes(filtroFilmes);
    localStorage.setItem("favoritos", JSON.stringify(filtroFilmes));
    toast.success("Filme removido com sucesso!");
  }

  function excluirSerie(id) {
    let filtroSeries = series.filter((item) => {
      return item.id !== id;
    });
    setSeries(filtroSeries);
    localStorage.setItem("series_favoritos", JSON.stringify(filtroSeries));
    toast.success("Série removida com sucesso!");
  }

  return (
    <div className="meus-filmes">
      {filmes.length === 0 && <span>Você não possui nenhum filme salvo</span>}
      <h1>Meus filmes</h1>
      <ul>
        {filmes.map((item) => {
          return (
            <li key={item.id}>
              <span>{item.title}</span>
              <div>
                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                <button onClick={() => excluirFilme(item.id)}>Excluir</button>
              </div>
            </li>
          );
        })}
      </ul>
      <h1>Minhas séries</h1>
      <ul>
        {series.map((item) => {
          return (
            <li key={item.id}>
              <span>{item.original_name}</span>
              <div>
                <Link to={`/serie/${item.id}`}>Ver detalhes</Link>
                <button onClick={() => excluirSerie(item.id)}>Excluir</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Favoritos;
