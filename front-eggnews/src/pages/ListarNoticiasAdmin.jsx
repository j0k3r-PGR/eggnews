import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function ListarNoticiasAdmin() {

    const [noticias, setNoticias] = useState([])

    const [busqueda, setBusqueda] = useState("")

    const [eliminarId, setEliminarId] = useState(false)

    const [eliminado, setEliminado] = useState(false)

    const filtrarNoticias = () => {
        const noticiasFiltradas = noticiasOrdenadas.filter((noticia) => noticia.titulo.toLowerCase().includes(busqueda))
        return noticiasFiltradas
    };

    useEffect(() => {
        fetch('http://localhost:8080/noticias/listaradmin')
            .then(res => res.json())
            .then(noticias => setNoticias(noticias))
    }, [eliminarId])

    const noticiasOrdenadas = noticias.sort((a, b) => b.fechaAlta - a.fechaAlta)

    const eliminarNoticia = () =>{
        fetch('http://localhost:8080/noticias/delete/'+eliminarId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
      .then(res => {
        if (res.ok){
            console.log("noticia eliminada")
            setEliminarId(false)
            setEliminado(true)
        }else{
            console.log("no se pudo eliminar la noticia")
        }
      })
    }

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
            <h3 className="container">Noticias De Alta</h3>
            <table className="table container">
                <thead>
                    <tr>
                        <th scope="col">titulo</th>
                        <th scope="col">texto</th>
                        <th scope="col">autor</th>
                        <th scope="col">fecha</th>
                        <th scope="col">Alta</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filtrarNoticias().map((noticia) => (
                        noticia.alta &&
                        <tr key={noticia.id}>
                            <td>{noticia.titulo}</td>
                            <td>{noticia.texto.slice(0, 200)}....</td>
                            <td>{noticia.autor}</td>
                            <td>
                                {
                                    new Date(noticia.fechaAlta).toLocaleDateString("es-ES", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                        hour: "numeric",
                                        minute: "numeric"
                                    })
                                }
                            </td>
                            <td><input className="checkbox" type="checkbox" defaultChecked={noticia.alta} disabled /></td>
                            <td>
                                <Link className="btn btn-primary" to={`/admin/modificar/${noticia.id}`}>Editar</Link>
                                <button className="btn btn-secondary mt-3" onClick={() => setEliminarId(noticia.id)} >Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h3 className="container">Noticias De Baja</h3>
            <table className="table container">
                <thead>
                    <tr>
                        <th scope="col">titulo</th>
                        <th scope="col">texto</th>
                        <th scope="col">autor</th>
                        <th scope="col">fecha</th>
                        <th scope="col">Alta</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filtrarNoticias().map((noticia) => (
                        !noticia.alta &&
                        <tr key={noticia.id}>
                            <td>{noticia.titulo}</td>
                            <td>{noticia.texto.slice(0, 200)}...</td>
                            <td>{noticia.autor}</td>
                            <td>
                                {
                                    new Date(noticia.fechaAlta).toLocaleDateString("es-ES", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                        hour: "numeric",
                                        minute: "numeric"
                                    })
                                }
                            </td>
                            <td><input className="checkbox" type="checkbox" defaultChecked={noticia.alta} disabled /></td>
                            <td>
                                <Link className="btn btn-primary" to={`/admin/modificar/${noticia.id}`}>Editar</Link>
                                <button className="btn btn-secondary mt-3" onClick={() => setEliminarId(noticia.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
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