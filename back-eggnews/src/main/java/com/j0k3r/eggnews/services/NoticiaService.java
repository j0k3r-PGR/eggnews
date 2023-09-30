package com.j0k3r.eggnews.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

import com.j0k3r.eggnews.dao.impl.NoticiaDaoImpl;
import com.j0k3r.eggnews.models.ErrorResponse;
import com.j0k3r.eggnews.models.Noticia;

@Service
public class NoticiaService {
    
    @Autowired
    private NoticiaDaoImpl noticiaDao;

    public ResponseEntity<?> listarTodas(){
        return ResponseEntity.ok(noticiaDao.listarNoticias());
    }

    public ResponseEntity<?> listarTodasAdmin(){
        return ResponseEntity.ok(noticiaDao.listarNoticiasAdmin());
    }

    public ResponseEntity<?> buscarPorId(Long id){
        return ResponseEntity.ok(noticiaDao.buscarNoticiaPorId(id));
    }

    public ResponseEntity<?> guardarNoticia(String titulo,String texto, String autor){

        if (titulo == null || titulo.isEmpty()) {
            return ResponseEntity.badRequest().body(new ErrorResponse(HttpStatus.BAD_REQUEST, "El título de la noticia no puede ir vacío"));
        }
    
        if (texto == null || texto.isEmpty()) {
            return ResponseEntity.badRequest().body(new ErrorResponse(HttpStatus.BAD_REQUEST, "El contenido de la noticia no puede ir vacío"));
        }
    
        if (autor == null || autor.isEmpty()) {
            return ResponseEntity.badRequest().body(new ErrorResponse(HttpStatus.BAD_REQUEST, "El autor de la noticia no puede ir vacío"));
        }

        Noticia noticia = Noticia.builder()
                    .titulo(titulo)
                    .texto(texto)
                    .fechaAlta(new Date())
                    .autor(autor)
                .build();

        noticiaDao.salvarNoticia(noticia);

        return ResponseEntity.ok(noticia);
    }

    public ResponseEntity<?> actualizarNoticia(Long id, String titulo,String texto, String autor, boolean alta){

        Optional<Noticia> noticiaOptional = noticiaDao.buscarNoticiaPorId(id);
        
        if (!noticiaOptional.isPresent()){
            return ResponseEntity.badRequest().body("La noticia No se Encuentra en la base de datos");
        }

        Noticia noticia = noticiaOptional.get();

        noticia.setTitulo(titulo);
        noticia.setTexto(texto);
        noticia.setAutor(autor);
        noticia.setAlta(alta);

        noticiaDao.modificarNoticia(noticia);

        return ResponseEntity.ok(noticia);
    }

    public ResponseEntity<?> modificarAltaNoticia(Long id){

        Optional<Noticia> noticiaOptional = noticiaDao.buscarNoticiaPorId(id);

        if (!noticiaOptional.isPresent()){
            return ResponseEntity.badRequest().body("La noticia No se Encuentra en la base de datos");
        }

        Noticia noticia = noticiaOptional.get();
        boolean alta = noticia.getAlta();
        noticia.setAlta(!alta);

        noticiaDao.modificarNoticia(noticia);

        return ResponseEntity.ok(noticia);
    }
    
    public ResponseEntity<?> modificarNoticia(Long id, String titulo, String texto, String autor,boolean alta){

        if (titulo == null || titulo.isEmpty()) {
            return ResponseEntity.badRequest().body(new ErrorResponse(HttpStatus.BAD_REQUEST, "El título de la noticia no puede ir vacío"));
        }
    
        if (texto == null || texto.isEmpty()) {
            return ResponseEntity.badRequest().body(new ErrorResponse(HttpStatus.BAD_REQUEST, "El contenido de la noticia no puede ir vacío"));
        }
    
        if (autor == null || autor.isEmpty()) {
            return ResponseEntity.badRequest().body(new ErrorResponse(HttpStatus.BAD_REQUEST, "El autor de la noticia no puede ir vacío"));
        }

        Noticia noticia = noticiaDao.buscarNoticiaPorId(id).get();

        noticia.setTitulo(titulo);
        noticia.setTexto(texto);
        noticia.setAutor(autor);
        noticia.setAlta(alta);

        noticiaDao.modificarNoticia(noticia);

        return ResponseEntity.ok().build();

    }
}
