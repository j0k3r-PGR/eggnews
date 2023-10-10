import { Link } from "react-router-dom"
import { BeatLoader } from "react-spinners"

export default function TableNotices({ filtrarNoticias, setEliminarId, isLoading }) {

    return (
        <>
            <table className="table container">
                <thead>
                    <tr>
                        <th scope="col">titulo</th>
                        <th scope="col">texto</th>
                        <th scope="col">autor</th>
                        <th scope="col" className="display-none">fecha</th>
                        <th scope="col" className="display-none">Alta</th>
                        <th scope="col">Categoria</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filtrarNoticias().map((noticia) => (
                            <tr key={noticia.id}>
                                <td>{noticia.titulo}</td>
                                <td>{noticia.texto.slice(0, 200)}....</td>
                                <td>{noticia.autor}</td>
                                <td className="display-none">
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
                                <td className="display-none"><input className="checkbox" type="checkbox" defaultChecked={noticia.alta} disabled /></td>
                                <td>{noticia.category.name}</td>
                                <td>
                                    <Link className="btn btn-primary" to={`/eggnews/admin/modificar/${noticia.id}`}>Editar</Link>
                                    {localStorage.getItem('username') === "SUPERADMIN" &&
                                        <button className="btn btn-secondary" onClick={() => setEliminarId(noticia.id)} >Eliminar</button>
                                    }
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            {
                isLoading ?
                    <div className="tr-spinner">
                        <BeatLoader
                            className="spinner"
                            color="#1a6b5b"
                            size={35}
                        />
                    </div>
                    :
                    filtrarNoticias().length === 0 &&
                    <div className="alert alert-secondary">
                        No Hay Noticias Para Mostrar
                    </div>
            }
        </>
    )
}