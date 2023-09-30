package com.j0k3r.eggnews.dao;

import org.springframework.stereotype.Component;

import java.util.Optional;

import com.j0k3r.eggnews.models.Noticia;

@Component
public interface NoticiaDao {
    
    Iterable<Noticia> listarNoticias();

    Iterable<Noticia> listarNoticiasAdmin();

    Optional<Noticia> buscarNoticiaPorId(Long id);

    void salvarNoticia(Noticia noticia);

    void modificarNoticia(Noticia noticia);

}
