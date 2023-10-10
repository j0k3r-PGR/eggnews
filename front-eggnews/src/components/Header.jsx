import { Link, useNavigate } from "react-router-dom";

export default function Header() {

    let token = localStorage.getItem('token');

    const navigate = useNavigate()

    const user = localStorage.getItem('name') + " " + localStorage.getItem('surname')

    const logout = (e) => {
        e.preventDefault()
        token = ""
        localStorage.clear()
        navigate("/eggnews/login")
    }

    return (
        <>
            <nav className="sticky-top nav-bar">
                <div className="content-navbar">
                    <Link class="navbar-brand" to="/eggnews"><b className="text-navbar">EggNews</b></Link>
                    <div className="links" id="navbarSupportedContent">
                        <ul className="navbar-nav links">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/eggnews">Home</Link>
                            </li>
                            {
                                localStorage.getItem('username') === "SUPERADMIN" &&
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/eggnews/superusers">Usuarios</Link>
                                </li>
                            }
                            {
                                token ?
                                    <>
                                        <li className="nav-item dropdown">
                                            <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Admin
                                            </Link>
                                            <ul className="dropdown-menu show-menu">
                                                <li><Link className="dropdown-item" to="/eggnews/admin">Panel Admin</Link></li>
                                                <li><Link className="dropdown-item" to="/eggnews/admin/listar">Noticias</Link></li>
                                                <li><Link className="dropdown-item" to="/eggnews/admin/cargar">Cargar Noticia</Link></li>
                                            </ul>
                                        </li>
                                        <li className="dropdown-item">
                                            <Link className="nav-link" onClick={logout} aria-current="page" to="/eggnews/login">Log-out ({user})</Link>
                                        </li>
                                    </>
                                    :
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/eggnews/login">Login</Link>
                                    </li>
                            }
                            
                        </ul>
                    </div>
                    <div className="menu">
                        <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img width="45" height="45" src="https://img.icons8.com/nolan/64/menu.png" alt="menu" />
                        </Link>
                        <ul className="dropdown-menu show-menu">
                            <li className="dropdown-item">
                                <Link className="nav-link active" aria-current="page" to="/eggnews">Home</Link>
                            </li>
                            {
                                token ?
                                    <>
                                        <li className="dropdown-item dropdown">
                                            <Link className="nav-link" to="/eggnews/admin/listar">Panel Admin</Link>
                                        </li>
                                        <li className="dropdown-item">
                                            <Link className="nav-link" onClick={logout} aria-current="page" to="/eggnews/login">Log-out ({user})</Link>
                                        </li>
                                    </>
                                    :
                                    <li className="dropdown-item">
                                        <Link className="nav-link" aria-current="page" to="/eggnews/login">Login</Link>
                                    </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}