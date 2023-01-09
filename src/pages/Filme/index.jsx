import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import "./filme.css";

const Filme = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "1dfa62bb1b83007161dcee66d24b55b8",
            language: "pt-BR",
          },
        })
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          console.log("Filme nao encontrado");
          navigate("/", { replace: true });
          return;
        });
    }
    loadFilme();
  }, [navigate, id]);

  function salvarFilme() {
    const minhaLista = localStorage.getItem("favoritos");

    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some(
      (filmesSalvo) => filmesSalvo.id === filme.id
    );

    if (hasFilme) {
      toast.warn("Esse filme ja está na lista");
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("favoritos", JSON.stringify(filmesSalvos));
    toast.success("Video salvo com sucesso!");
  }

  if (loading) {
    return (
      <div className="filme-info">
        <h2>Carregando detalhes...</h2>
      </div>
    );
  }

  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>

      <img
        src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
        alt={filme.title}
      />

      <h3>Sinopse:</h3>
      <span>{filme.overview}</span>

      <strong>Nota: {filme.vote_average} / 10</strong>

      <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a
            target="blank"
            href={`https://youtube.com/results?search_query=${filme.title} Trailer`}
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
};

export default Filme;
