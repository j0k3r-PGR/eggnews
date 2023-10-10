import { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"
import axios from "../config/axios"
import TableNotices from "../components/TableNotices"
import NoticeContext from '../providers/show'


export default function ListarNoticiasAdmin() {

  const [noticias, setNoticias] = useState([])

  const [busqueda, setBusqueda] = useState("")

  const [eliminarId, setEliminarId] = useState(false)

  const [eliminado, setEliminado] = useState(false)

  const [isLoading, setIsLoading] = useState(true)

  const { show } = useContext(NoticeContext)

  const noticiasOrdenadas = noticias.sort((a, b) => b.fechaAlta - a.fechaAlta)

  const filtrarNoticias = () => {
    const noticiasFiltradas = noticiasOrdenadas.filter((noticia) => noticia.titulo.toLowerCase().includes(busqueda))
    return noticiasFiltradas
  };


  useEffect(() => {
    let isMounted = true

    const controller = new AbortController()

    const getNotices = async () => {
      await axios.get( localStorage.getItem('username') ==="SUPERADMIN" ? '/superuser/noticias/listaradmin'  :  ('/admin/all/'+localStorage.getItem('username')), {
      // await axios.get('/admin/all/'+localStorage.getItem('username'), {
        headers: {
          Authorization : `Bearer ${localStorage.getItem('token')}`
        },
        signal: controller.signal,
      })
        .then(res =>{
          isMounted && setNoticias(res.data)
          setIsLoading(false)
        })
        .catch(err => console.log(err));
    }
    getNotices()
    return () => {
      isMounted = false
      controller.abort()
    }
  }, [eliminarId]);

  const eliminarNoticia = () => {

    axios.delete('/superuser/noticias/delete/' + eliminarId,{
      headers: {
        Authorization : `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(() => {
        setEliminarId(false);
        setEliminado(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="container text-center">
        <h2>Todas las noticias</h2>
        <label><b>Buscar Noticia por titulo</b></label>
        <input
          type="text"
          className="form-control mb-3 mt-3"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar por título"
        />
      </div>
      {
        eliminado &&
        <div className="alert alert-success container eliminado" role="alert">
          Noticia eliminada correctamente
          <button className="btn-close" onClick={() => setEliminado(false)} aria-label="Close"></button>
        </div>
      }

      {
        show.alta &&
        <>
          <h3 className="container">Noticias De Alta</h3>
          <TableNotices isLoading={isLoading} filtrarNoticias={() => filtrarNoticias().filter(noticia => noticia.alta)} setEliminarId={setEliminarId} />
        </>
      }
      {
        show.baja &&
        <>
          <h3 className="container">Noticias De Baja</h3>
          <TableNotices isLoading={isLoading} filtrarNoticias={() => filtrarNoticias().filter(noticia => !noticia.alta)} setEliminarId={setEliminarId} />
        </>
      }

      {
        eliminarId &&
        <div className="alert alert-success eliminar container" role="alert">
          <div>
            <h3>Atencion!!</h3>
            <button className="btn-close" onClick={() => setEliminarId(false)} aria-label="Close"></button>
          </div>
          <p>¿Esta seguro que quiere eliminar esta notica de la base de datos?</p>
          <div>
            <Link className="btn btn-primary btn-volver" onClick={() => setEliminarId(false)}>Volver</Link>
            <button className="btn btn-secondaty" onClick={eliminarNoticia}>Elimar Permanentemente</button>
          </div>
        </div>
      }
    </>
  )
}