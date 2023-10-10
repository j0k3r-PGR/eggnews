package com.j0k3r.eggnews.dao;

import org.springframework.stereotype.Component;

import java.util.Optional;

import com.j0k3r.eggnews.models.Noticia;
import com.j0k3r.eggnews.models.auth.UserEntity;

@Component
public interface NoticiaDao {
    
    Iterable<Noticia> listarNoticias();

    Iterable<Noticia> listarNoticiasAdmin();

    Optional<Noticia> buscarNoticiaPorId(Long id);

    void salvarNoticia(Noticia noticia);

    void modificarNoticia(Noticia noticia);

    void eliminarNoticia(Noticia noticia);

    Iterable<Noticia> findByUser(UserEntity user);
}
