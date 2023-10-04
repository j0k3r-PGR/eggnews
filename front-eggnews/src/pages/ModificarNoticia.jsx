import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

export default function ModificarNoticia() {

    const { id } = useParams()

    const [noticia, setNoticia] = useState({})

    const [guardado, setGuardado] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch('http://mauriciomaldonadoprg.online:8080/eggnews/noticias/buscar/' + id)
            .then(res => res.json())
            .then(res => setNoticia(res))
    }, [])

    const handleChange = (e) => {
        console.log(e.target.checked)
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
        const response = await fetch('http://mauriciomaldonadoprg.online:8080/eggnews/noticias/modificar/' + id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(noticia)
        });
        if (response.ok) {
            setError(false)
            setGuardado(response.ok)
        } else {
            setGuardado(false)
            setError(true)
        }
    }

    return (
        <>
            <h2>Modificar</h2>
            <div className="card container">
                <div className="card-body container">
                    <form action="">
                        <div className="form-group">
                            <label>Titulo</label>
                            <input type="text" className="form-control" value={noticia.titulo} name="titulo" onChange={handleChange} />
                        </div>
                        <div className="form-group mt-3">
                            <label>Texto</label>
                            <textarea className="form-control" rows="3" value={noticia.texto} name="texto" onChange={handleChange} ></textarea>
                        </div>
                        <div className="form-group mt-3">
                            <label>Autor</label>
                            <input type="text" className="form-control" value={noticia.autor} name="autor" onChange={handleChange} />
                        </div>
                        <div className="form-group mt-3">
                            <label>Alta</label>
                            <input type="checkbox" className="checkbox" defaultChecked={noticia.alta} name="alta" onClick={handleChangeCheck} />
                        </div>

                        <button type="submit" className="btn btn-primary" onClick={handleClick}>Modificar</button>
                    </form>
                    {
                        guardado &&
                        <div className="alert alert-success guardado-exito container" role="alert">
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
                </div>
                <div>
                    <Link className="btn btn-secondary" to="/admin/listar">Volver</Link>
                </div>
            </div>
        </>
    )
}