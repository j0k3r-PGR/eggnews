import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import axios from "../config/axios"
import Input from '../components/Input'

export default function ModificarNoticia() {

    const { id } = useParams()

    const [noticia, setNoticia] = useState({})

    const [guardando, setGuardando] = useState(false)

    const [cargando, setCargando] = useState(true)

    const [guardado, setGuardado] = useState(false);

    const [error, setError] = useState(false);

    useEffect(() => {
        let isMounted = true

        const controller = new AbortController()

        const getNotices = async () => {
            await axios.get('/noticias/buscar/' + id, {
                signal: controller.signal
            })
                .then(res => {
                    isMounted && setNoticia(res.data)
                    localStorage.setItem('autor', res.data.autor)
                    setCargando(false)
                })
                .catch(err => {
                    setCargando(false)
                    console.log(err)
                });
        }

        getNotices()

        return () => {
            isMounted = false
            controller.abort()
        }
    }, [])

    const handleChange = (e) => {
        setNoticia({
            ...noticia,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeCheck = (e) => {
        setNoticia({
            ...noticia,
            [e.target.name]: e.target.checked
        })
    }

    const handleClick = async (e) => {
        e.preventDefault()
        setGuardando(true)
        setNoticia({
            ...noticia,
            autor: localStorage.getItem('autor')
        })
        await axios.post('/admin/noticias/modificar/' + id, JSON.stringify(noticia), {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        }).then(() => {
            setGuardando(false)
            setError(false)
            setGuardado(true)
            localStorage.setItem('autor',"")
        })
            .catch(() => {
                setGuardando(false)
                setGuardado(false)
                setError(true)
            });

    };

    return (
        <>
            {
                guardando || cargando &&
                <div className="enviando">
                    <ClipLoader className="spiner-enviando" color="#276559" />
                </div>
            }
            <h2>Modificar</h2>
            <div className="card container">
                <div className="card-body container">
                    <form action="">
                        <Input label="Titulo: " type="text" value={noticia.titulo} name="titulo" handleChange={handleChange} />
                        <Input label="Texto: " type="text" value={noticia.texto} name="texto" handleChange={handleChange} textArea={true} />
                        <Input label="Autor: " type="text" value={noticia.autor} name="autor" disabled={true} />
                        <div className="form-group mt-3">
                            <label>Alta</label>
                            <input type="checkbox" className="checkbox" defaultChecked={noticia.alta} name="alta" onClick={handleChangeCheck} />
                        </div>

                        <button type="submit" className="btn btn-primary mt-3" onClick={handleClick}>Modificar</button>
                    </form>
                    {
                        guardado &&
                        <div className="alert alert-success guardado-exito container" role="alert">
                            <p>Noticia guardada con éxito</p>
                            <button className="btn-close" onClick={() => setGuardado(false)} aria-label="Close"></button>
                            <Link to="/eggnews/admin/listar" className="btn btn-primary btn-volver">Volver</Link>
                        </div>
                    }
                    {
                        error &&
                        <div className="alert alert-danger error-guardado" role="alert">
                            Todos los campos son obligatorios
                            <button className="btn-close" onClick={() => setError(false)} aria-label="Close"></button>
                        </div>
                    }
                </div>
                <div className="text-center">
                    <Link className="btn btn-secondary mt-5 mb-3" to="/eggnews/admin/listar">Volver</Link>
                </div>
            </div>
        </>
    )
}