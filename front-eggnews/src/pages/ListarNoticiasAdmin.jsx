import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function ListarNoticiasAdmin() {

    const [noticias, setNoticias] = useState([])

    const [busqueda, setBusqueda] = useState("");


    const filtrarNoticias = () => {
        const noticiasFiltradas = noticias.filter((noticia) => noticia.titulo.includes(busqueda));
        return noticiasFiltradas;
    };

    useEffect(() => {
        fetch('http://localhost:8080/noticias/listaradmin')
            .then(res => res.json())
            .then(noticias => setNoticias(noticias))
    }, [])

    const changeState = (noticia) => {
        fetch('http://localhost:8080/noticias/modalta/' + noticia.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    return (
        <>
            <h2>Todas las noticias</h2>
            <div className="container">
                <input
                    type="text"
                    className="form-control"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Buscar por título"
                />
            </div>

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
                        <tr key={noticia.id}>
                            <td>{noticia.titulo}</td>
                            <td>{noticia.texto}</td>
                            <td>{noticia.autor}</td>
                            <td>{noticia.fechaAlta}</td>
                            <td><input className="alta" type="checkbox" defaultChecked={noticia.alta} disabled /></td>
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