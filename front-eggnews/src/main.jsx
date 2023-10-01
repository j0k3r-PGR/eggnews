import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter , RouterProvider} from 'react-router-dom'
import App from './App.jsx'
import Error from './pages/error.jsx'
import Home from './pages/Home.jsx'
import './index.css'
import CargaNoticia from './pages/CargaNoticia.jsx'
import Admin from './pages/Admin.jsx'
import ModificarNoticia from './pages/ModificarNoticia.jsx'
import ListarNoticiasAdmin from './pages/ListarNoticiasAdmin.jsx'
import Notice from './pages/Notice.jsx'

const route = createBrowserRouter([{
  path : "/",
  element : <App />,
  errorElement : <Error />,
  children : [{
    path : "/",
    element : <Home />
  },{
    path : "/admin",
    element : <Admin />,
    children : [{
      path : "cargar",
      element : <CargaNoticia />
    },{
      path : "modificar/:id",
      element : <ModificarNoticia />
    },{
      path : "listar",
      element : <ListarNoticiasAdmin />
    }]
  },{
    path : "noticia/:id",
    element : <Notice />
  }]
}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={route} />
  </React.StrictMode>,
)
