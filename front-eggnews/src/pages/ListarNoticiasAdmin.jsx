import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function ListarNoticiasAdmin() {

    const [noticias, setNoticias] = useState([])

    const [busqueda, setBusqueda] = useState("");

    const filtrarNoticias = () => {
        const noticiasFiltradas = noticiasOrdenadas.filter((noticia) => noticia.titulo.toLowerCase().includes(busqueda));
        return noticiasFiltradas;
    };

    useEffect(() => {
        fetch('http://localhost:8080/noticias/listaradmin')
            .then(res => res.json())
            .then(noticias => setNoticias(noticias))
    }, [])


    const noticiasOrdenadas = noticias.sort((a, b) => b.fechaAlta - a.fechaAlta);


    return (
        <>
            <div className="container text-center">
                <h2>Todas las noticias</h2>
                <label><b>Buscar Noticia por titulo</b></label>
                <input
                    type="text"
                    className="form-control"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Buscar por título"
                />
            </div>
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
                            <td>{noticia.texto.slice(0,200)}....</td>
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
                            <td>{noticia.texto.slice(0,200)}...</td>
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
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}