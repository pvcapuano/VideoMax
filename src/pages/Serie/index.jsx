import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import "./serie.css";

const Serie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [serie, setSerie] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSerie() {
      await api
        .get(`/tv/${id}`, {
          params: {
            api_key: "1dfa62bb1b83007161dcee66d24b55b8",
            language: "pt-BR",
          },
        })
        .then((response) => {
          setSerie(response.data);
          setLoading(false);
        })
        .catch(() => {
          console.log("Serie nao encontrado");
          navigate("/", { replace: true });
          return;
        });
    }
    loadSerie();
  }, [navigate, id]);

  function salvarSerie() {
    const minhaLista = localStorage.getItem("series_favoritos");

    let seriesSalvos = JSON.parse(minhaLista) || [];

    const hasSerie = seriesSalvos.some(
      (seriesSalvo) => seriesSalvo.id === serie.id
    );

    if (hasSerie) {
      toast.warn("Esse serie ja está na lista");
      return;
    }

    seriesSalvos.push(serie);
    localStorage.setItem("series_favoritos", JSON.stringify(seriesSalvos));
    toast.success("Série salva com sucesso!");
  }

  if (loading) {
    return (
      <div className="serie-info">
        <h2>Carregando detalhes...</h2>
      </div>
    );
  }

  return (
    <div className="serie-info">
      <h1>{serie.original_name}</h1>

      <img
        src={`https://image.tmdb.org/t/p/original/${serie.backdrop_path}`}
        alt={serie.original_name}
      />

      <h3>Sinopse:</h3>
      <span>{serie.overview}</span>

      <strong>Nota: {serie.vote_average.toFixed(1)} / 10</strong>

      <div className="area-buttons">
        <button onClick={salvarSerie}>Salvar</button>
        <button>
          <a
            target="blank"
            href={`https://youtube.com/results?search_query=${serie.original_name} Trailer`}
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
};

export default Serie;
