import { useState, useEffect } from "react"
import CardNoticia from "../components/CardNoticia"


export default function Home(){

    const [noticias, setNoticias] = useState([])

    useEffect(() => {
        fetch('http://localhost:8080/noticias/listar')
            .then(res => res.json())
            .then(noticias => setNoticias(noticias.reverse()))
    },[])

    return(
        <div className="container"> 
            <h2 className="mt-3">Todas Las Noticias</h2>

                {
                    noticias.length === 0 && 
                    <div className="alert alert-secondary">
                        No hay noticias en este momento
                    </div>
                }
                {noticias.map(noticia => (
                    <CardNoticia key={noticia.id} 
                        id={noticia.id}
                        titulo={noticia.titulo}
                        texto={noticia.texto}
                        autor={noticia.autor}
                        fechaAlta={noticia.fechaAlta}
                    />
                ))}
        </div>
    )
}