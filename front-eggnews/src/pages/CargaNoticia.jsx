import { useState } from "react"
import { Link } from "react-router-dom";

export default function CargaNoticia() {

    const [noticia, setNoticia] = useState({
        titulo: "",
        texto: "",
        autor: ""
    })

    const [guardado, setGuardado] = useState(false);
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        setNoticia({
            ...noticia,
            [e.target.name]: e.target.value
        })
    }


    const handleClick = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:8080/noticias/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(noticia),
        });
        console.log(response)
        if (response.ok) {
            setError(false)
            setNoticia({
                titulo: "",
                texto: "",
                autor: ""
            })
            setGuardado(response.ok)
        } else {
            setGuardado(false)
            setError(true)
        }

    }

    return (
        <>
            <div className="card container mt-5">
                <div className="card-body">
                <h2>Carga de noticia</h2>
                    <form action="">
                        <div className="form-group mt-3">
                            <label htmlFor="titulo">Titulo</label>
                            <input type="text" className="form-control" name="titulo" onChange={handleChange} value={noticia.titulo} />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="texto">Texto</label>
                            <textarea className="form-control" name="texto" rows="3" onChange={handleChange} value={noticia.texto} />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="autor">Autor</label>
                            <input type="text" className="form-control" name="autor" onChange={handleChange} value={noticia.autor} />
                        </div>
                        {/* <div className="form-group mt-3">
                            <label htmlFor="autor">Imagen</label>
                            <input type="file" className="form-control" name="image" accept="image/png, image/jpg" />
                        </div> */}
                        <button className="btn btn-primary mt-3" onClick={handleClick}>Enviar</button>
                    </form>
                </div>
            </div>
            {
                guardado &&
                <div className="alert alert-success guardado-exito" role="alert">
                    <p>Noticia guardada con éxito</p>
                    <button className="btn-close" onClick={() => setGuardado(false)} aria-label="Close"></button>
                    <Link to="/admin/listar" className="btn btn-primary btn-volver">Volver</Link>
                </div>
            }
            {
                error &&
                <div className="alert alert-danger error-guardado" role="alert">
                    Todos los campos son obligatorios
                    <button className="btn-close" onClick={() => setError(false)} aria-label="Close"></button>
                </div>
            }
        </>
    )
}