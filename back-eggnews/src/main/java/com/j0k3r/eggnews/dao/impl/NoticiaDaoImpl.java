package com.j0k3r.eggnews.dao.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

import com.j0k3r.eggnews.dao.NoticiaDao;
import com.j0k3r.eggnews.models.Noticia;
import com.j0k3r.eggnews.models.auth.UserEntity;
import com.j0k3r.eggnews.repositories.NoticiaRepositorio;


@Component
public class NoticiaDaoImpl implements NoticiaDao{

    @Autowired
    private NoticiaRepositorio noticiaRepositorio;

    @Override
    public Iterable<Noticia> listarNoticias() {
        return noticiaRepositorio.findByAltaOrderByFechaAlta(true);
    }

    @Override
    public Iterable<Noticia> listarNoticiasAdmin() {
        return noticiaRepositorio.findAllOrderByFechaAltaDesc();
    }

    @Override
    public Optional<Noticia> buscarNoticiaPorId(Long id) {
        return noticiaRepositorio.findById(id);
    }

    @Override
    public void salvarNoticia(Noticia noticia) {
        noticiaRepositorio.save(noticia);
    }

    @Override
    public void modificarNoticia(Noticia noticia) {
        noticiaRepositorio.save(noticia);
    }

    @Override
    public void eliminarNoticia(Noticia noticia) {
        noticiaRepositorio.delete(noticia);
    }

    @Override
    public Iterable<Noticia> findByUser(UserEntity user) {
        return noticiaRepositorio.findByUser(user);
    }
    
}
