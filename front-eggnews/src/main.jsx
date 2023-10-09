import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Error from './pages/error.jsx'
import Home from './pages/Home.jsx'
import CargaNoticia from './pages/CargaNoticia.jsx'
import Admin from './pages/Admin.jsx'
import ModificarNoticia from './pages/ModificarNoticia.jsx'
import ListarNoticiasAdmin from './pages/ListarNoticiasAdmin.jsx'
import Notice from './pages/Notice.jsx'
import Login from './pages/Login.jsx'
import NoticeProvider from './providers/show/Provider.jsx'
import AuthProvider from './providers/auth/Provider.jsx'
import RequireAuth from './utils/RequireAuth.jsx'

const route = createBrowserRouter([{
  path: "/",
  element: <App />,
  errorElement: <Error />,
  children: [{
    path: "eggnews",
    element: <Home />
  }, {
    path: "eggnews/admin",
    element: <RequireAuth><NoticeProvider> <Admin /> </NoticeProvider></RequireAuth> ,
    children: [{
      path: "cargar",
      element: <CargaNoticia />
    }, {
      path: "modificar/:id",
      element: <ModificarNoticia />
    }, {
      path: "listar",
      element: <ListarNoticiasAdmin />
    }]
  }, {
    path: "eggnews/noticia/:id",
    element: <Notice />
  }, {
    path: "eggnews/login",
    element:<NoticeProvider>  <Login /> </NoticeProvider>
  }]
}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={route} />
    </AuthProvider>
  </React.StrictMode >,
)