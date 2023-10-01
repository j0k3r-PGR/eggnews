import { Link } from "react-router-dom"

export default function CardNoticia({ id, titulo, texto, autor, fechaAlta }) {

    return (
        <div className="card mt-3">
            <div className="card-body">
                <h4 className="card-title">{titulo}</h4>
                <p className="card-text">{texto.slice(0,200)}....</p>
                <p>Autor: {autor}</p>
                
                <p> Fecha de publicacion: 
                    {
                        new Date(fechaAlta).toLocaleDateString("es-ES", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric"
                        })
                    }
                </p>
                <Link to={`/noticia/${id}`} className="btn btn-primary">Leer más</Link>
            </div>
        </div>
    )
}