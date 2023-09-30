package com.j0k3r.eggnews.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.j0k3r.eggnews.models.Noticia;

@Repository
public interface NoticiaRepositorio extends CrudRepository<Noticia, Long>{
    
    Iterable<Noticia> findByAlta(Boolean alta);

    

}
