import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

export default function ModificarNoticia() {

    const { id } = useParams()

    const [noticia, setNoticia] = useState({})

    const [guardado, setGuardado] = useState(false)

    useEffect(() => {
        fetch('http://localhost:8080/noticias/buscar/'+ id)
            .then(res => res.json())
            .then(noticia => setNoticia(noticia))
    }, [])

    const handleChange = (e) => {
        console.log(e.target.checked)
        setNoticia({
            ...noticia, 
            [e.target.name]: e.target.value 
        })
    }

    const handleChangeCheck = (e) => {
        console.log(e.target.checked)
        setNoticia({
           ...noticia, 
            [e.target.name]: e.target.checked 
        })
    }

    const handleClick = (e) => {
        e.preventDefault()
        fetch('http://localhost:8080/noticias/modificar/'+id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(noticia)
        })
      .then(res => setGuardado(res.status === 200))
    }

    return (
        <>
            <h2>Modificar</h2>
            <div className="card container">
                <div className="card-body container">
                    <form action="">
                        <div className="form-group">
                            <label>Titulo</label>
                            <input type="text" className="form-control" value={noticia.titulo} name="titulo" onChange={handleChange}/>
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
                            <input type="checkbox" defaultChecked={noticia.alta} name="alta" onClick={handleChangeCheck} />
                        </div>

                        <button type="submit" className="btn btn-primary" onClick={handleClick}>Modificar</button>
                    </form>
                    {
                        guardado && <p>Noticia modificada</p>
                    }
                </div>
                <div>
                    <Link className="btn btn-secondary" to="/admin/listar">Volver</Link>
                </div>
            </div>
        </>
    )
}