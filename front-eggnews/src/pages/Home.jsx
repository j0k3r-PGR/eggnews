import { useState, useEffect } from "react"
import CardNoticia from "../components/CardNoticia"
import axios from "../config/axios"
import { BeatLoader } from "react-spinners"



export default function Home() {

    const [noticias, setNoticias] = useState([])

    const [isLoading, setIsLoadin] = useState(true)

    useEffect(() => {
        let isMounted = true

        const controller = new AbortController()

        axios.get('/noticias/listar', {
            signal: controller.signal
        })
            .then(res => {
                isMounted && setNoticias(res.data)
                setIsLoadin(false)
            })
            .catch((err) => console.log(err))

        return () => {
            isMounted = false
            controller.abort()
        }
    }, [])


    return (
        <div className="container">
            <h2 className="mt-3">Todas Las Noticias</h2>
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