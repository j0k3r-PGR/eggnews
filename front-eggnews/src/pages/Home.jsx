import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import CardNoticia from "../components/CardNoticia"
import axios from "../config/axios"
import { BeatLoader } from "react-spinners"



export default function Home() {

    const [noticias, setNoticias] = useState([])

    const [categories, setCategories] = useState([])

    const [noticiasFiltradas, setNoticiasFiltradas] = useState(noticias)

    const [isLoading, setIsLoadin] = useState(true)

    useEffect(() => {
        let isMounted = true

        const controller = new AbortController()

        const getCategoies = async () => {
            await axios.get('/category/all', {
                signal: controller.signal,
            })
                .then(res => {
                    isMounted && setCategories(res.data)
                })
                .catch(err => console.log(err));
        }
        getCategoies()
        return () => {
            isMounted = false
            controller.abort()
        }
    }, []);

    useEffect(() => {
        let isMounted = true

        const controller = new AbortController()

        axios.get('/noticias/listar', {
            signal: controller.signal
        })
            .then(res => {
                isMounted && setNoticias(res.data)
                isMounted && setNoticiasFiltradas(res.data)
                setIsLoadin(false)
            })
            .catch((err) => console.log(err))

        return () => {
            isMounted = false
            controller.abort()
        }
    }, [])

    const onClickCategory = (e) => {
        if (e.target.name == "all") {
            setNoticiasFiltradas(noticias)
        } else {
            setNoticiasFiltradas(noticias.filter(noticia => noticia.category.name === e.target.name))
        }
    }


    return (
        <div className="container">
            <h2 className="mt-3 mb-3">Todas Las Noticias</h2>
            <div className="container text-center">
                <h3 className="mb-3">Categorias</h3>
                <Link className="btn btn-primary m-3" name="all" onClick={onClickCategory}>Todas las Categorias</Link>
                {
                    categories.map(category => {
                        return (
                            <Link key={category.id} className="btn btn-primary m-3" name={category.name} onClick={onClickCategory} >{category.name}</Link>
                        )
                    })
                }
            </div>
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
            <div className="home-noticias">
                {noticiasFiltradas.map(noticia => (
                    <CardNoticia key={noticia.id}
                        id={noticia.id}
                        titulo={noticia.titulo}
                        texto={noticia.texto}
                        autor={noticia.autor}
                        categoria={noticia.category.name}
                        fechaAlta={noticia.fechaAlta}
                    />
                ))}
            </div>
        </div>
    )
}