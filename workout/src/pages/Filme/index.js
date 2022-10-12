import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../services/api'
import './Filme.css'
import { toast }from 'react-toastify'
export default function Filme() {
   const { id } = useParams()
   const navigate = useNavigate()

   const [loading, setLoading] = useState(true)
   const [filme, setFilme] = useState({})

   useEffect(() => {
      async function loadFilme() {
         await api
            .get(`/movie/${id}`, {
               params: {
                  api_key: '058339bb21a2c42f14979fd8151aeccf',
                  language: 'en',
               },
            })
            .then((response) => {
               setFilme(response.data)
               setLoading(false)
            })
            .catch(() => {
               console.log('Filme não encontrado')
               navigate('/', { replace: true })
               return;
            })
      }
      loadFilme()

      return () => {}
   }, [navigate, id])

   function salvarFilme(){
    const minhaLista = localStorage.getItem("@primeflix")

    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some( (filmesSalvo) => filmesSalvo.id === filme.id)

    if(hasFilme){
      toast.warn("Esse filme já está na sua lista");
      return
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    toast.success("Filme salvo com sucesso")
   }

   if (loading) {
      return (
         <div className="filme-info">
            <h1>Carregando detalhes</h1>
         </div>
      )
   }

   return (
      <div className="filme-info">
         <h1>{filme.title}</h1>
         <img
            src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
            alt={'Filme'}
         />

         <h3>sinopse</h3>
         <span>{filme.overview}</span>
         <br />
         <strong>Avaliação: {filme.vote_average} / 10</strong>

         <div className="area-buttons">
            <button onClick={salvarFilme}>Salvar</button>
            <button>
               <a target="_blank" rel='external' href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a>
            </button>
         </div>
      </div>
   )
}
