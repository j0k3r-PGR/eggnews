package com.j0k3r.eggnews.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.j0k3r.eggnews.models.Noticia;
import com.j0k3r.eggnews.models.auth.UserEntity;

@Repository
public interface NoticiaRepositorio extends CrudRepository<Noticia, Long> {

    @Query("SELECT n FROM Noticia n WHERE n.alta = :alta ORDER BY n.fechaAlta DESC")
    Iterable<Noticia> findByAltaOrderByFechaAlta(Boolean alta);

    @Query("SELECT n FROM Noticia n ORDER BY n.fechaAlta DESC")
    Iterable<Noticia> findAllOrderByFechaAltaDesc();

    Iterable<Noticia> findByUser(UserEntity user);

}
