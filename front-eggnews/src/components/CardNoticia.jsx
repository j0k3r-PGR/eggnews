import { Link } from "react-router-dom"

export default function CardNoticia({id, titulo, texto, autor, fechaAlta }) {

    return (
        <div className="card mt-3">
            <div className="card-body">
                <h5 className="card-title">{titulo}</h5>
                <p className="card-text">{texto}</p>
                <p>{autor}</p>
                <p>{fechaAlta}</p>
                <Link to={`/noticia/${id}`} className="btn btn-primary">Leer más</Link>
            </div>
        </div>
    )
}