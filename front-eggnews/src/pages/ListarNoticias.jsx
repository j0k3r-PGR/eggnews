import { useEffect, useState } from "react"

export default function ListarNoticias(){

    const [noticias, setNoticias] = useState([])

    useEffect(() => {
        fetch('http://localhost:8080/noticias/listar')
      .then(res => res.json())
      .then(noticias => setNoticias(noticias))
    }, [])

    return(
        <>
            <h2>noticias</h2>
            <table className="table container">
                <thead>
                    <tr>
                        <th scope="col">titulo</th>
                        <th scope="col">texto</th>
                        <th scope="col">autor</th>
                    </tr>
                </thead>
                <tbody>
                    {noticias.map(noticia => (
                        <tr key={noticia.id}>
                            <td>{noticia.titulo}</td>
                            <td>{noticia.texto}</td>
                            <td>{noticia.autor}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}