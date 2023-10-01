import { Link } from "react-router-dom";

export default function Header() {
    return (
        <>
            <nav className="sticky-top nav-bar">
                <div className="content-navbar">
                    <Link class="navbar-brand" to="/"><b className="text-navbar">EggNews</b></Link>
                    <div className="links" id="navbarSupportedContent">
                        <ul className="navbar-nav links">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Admin
                                </Link>
                                <ul className="dropdown-menu show-menu">
                                    <li><Link className="dropdown-item" to="/admin/listar">Noticias</Link></li>
                                    <li><Link className="dropdown-item" to="/admin/cargar">Cargar Noticia</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}