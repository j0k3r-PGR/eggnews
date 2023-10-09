import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../config/axios"
import { ClipLoader } from "react-spinners";

import { errors } from '../utils/Errors'
import Input from "../components/Input";

export default function CargaNoticia() {

    const [noticia, setNoticia] = useState({
        titulo: "",
        texto: "",
        autor: localStorage.getItem("name") + " " + localStorage.getItem('surname')
    })

    const [guardando, setGuardando] = useState(false)

    const [guardado, setGuardado] = useState(false);

    const [error, setError] = useState(0);

    const handleChange = (e) => {
        setNoticia({
            ...noticia,
            [e.target.name]: e.target.value
        })
    }

    const handleClick = async (e) => {
        e.preventDefault()
        setNoticia({
            ...noticia,
            autor: localStorage.getItem("name") + " " + localStorage.getItem('surname')
        })
        setGuardando(true)
        await axios.post('admin/noticias/save', JSON.stringify(noticia), {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            mode: 'no-cors'
        }).then(() => {
            setGuardando(false)
            setGuardado(true)
            setNoticia({
                titulo: "",
                texto: "",
                autor: ""
            })
        })
            .catch((err) => {
                setError(err?.response?.status)
                setGuardado(false)
                setGuardando(false)
                return 0;
            });

    }

    return (
        <>
            {
                guardando &&
                <div className="enviando">
                    <ClipLoader className="spiner-enviando" color="#276559" />
                </div>
            }

            <div className="card container mt-5">
                <div className="card-body">
                    <h2>Carga de noticia</h2>
                    <form action="">
                        <Input label="Titulo" type="text" value={noticia.titulo} name="titulo" handleChange={handleChange} />
                        <Input label="Texto" type="text" value={noticia.texto} name="texto" handleChange={handleChange} textArea={true} />
                        <Input label="Autor" type="text" value={noticia.autor} name="autor" disabled={true} />
                        <button className="btn btn-primary mt-3" onClick={handleClick}>Enviar</button>
                    </form>
                </div>
            </div>
            {
                guardado &&
                <div className="alert alert-success guardado-exito" role="alert">
                    <p>Noticia guardada con éxito</p>
                    <button className="btn-close" onClick={() => setGuardado(false)} aria-label="Close"></button>
                    <Link to="/eggnews/admin/listar" className="btn btn-primary btn-volver">Volver</Link>
                </div>
            }
            {
                error != 0 &&
                <div className="alert alert-danger error-guardado" role="alert">
                    <p>{errors[error]}</p>
                    <button className="btn-close" onClick={() => setError(false)} aria-label="Close"></button>
                </div>
            }
        </>
    )
}