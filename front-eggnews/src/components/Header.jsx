import { Link } from "react-router-dom";

export default function Header() {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
                <div className="container-fluid row">
                    <Link class="navbar-brand col-8" to="/">EggNews</Link>
                    <div className="collapse navbar-collapse col-4" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Admin
                                </Link>
                                <ul className="dropdown-menu">
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