import { useState } from "react"

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
        if (response.ok){
            setError(false)
            setGuardado(response.ok)
        } else {
            setGuardado(false)
            setError(true)
        }
        
    }

    return (
        <>
            <h2>Carga de noticia</h2>
            <div className="card container">
                <div className="card-body">
                    <form action="">
                        <div className="form-group">
                            <label htmlFor="titulo">Titulo</label>
                            <input type="text" className="form-control" name="titulo" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="texto">Texto</label>
                            <textarea className="form-control" name="texto" rows="3" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="autor">Autor</label>
                            <input type="text" className="form-control" name="autor" onChange={handleChange} />
                        </div>
                        <button className="btn btn-primary" onClick={handleClick}>Enviar</button>
                    </form>
                </div>
            </div>
            {
                guardado &&
                <div className="alert alert-success" role="alert">
                    Noticia guardada con éxito
                    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            }
            {
                error &&
                <div className="alert alert-danger" role="alert">
                    Todos los campos son obligatorios
                </div>
            }
        </>
    )
}