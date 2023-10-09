import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom"
import axios from "../config/axios"

export default function Notice(){

    const {id} = useParams();

    const [noticia, setNoticia] = useState({});

    useEffect(() => {
        axios('/noticias/buscar/' + id)
        .then(res => setNoticia(res.data))
    }, [])

    return(
        <div className="container mt-5">
            <h2>{noticia.titulo}</h2>
            <p>Autor: {noticia.autor}</p>
            <p>{noticia.texto}</p>
            <p>Fecha de publicacion: {new Date(noticia.fechaAlta).toLocaleDateString("es-ES", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                        hour: "numeric",
                                        minute: "numeric"
                                    })}</p>
            <Link className="btn btn-primary" to="/eggnews">Volver</Link>

        </div>
    )
}