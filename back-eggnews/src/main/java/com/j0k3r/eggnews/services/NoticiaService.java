package com.j0k3r.eggnews.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

import com.j0k3r.eggnews.Exceptions.MiException;
import com.j0k3r.eggnews.dao.impl.NoticiaDaoImpl;
import com.j0k3r.eggnews.models.Noticia;

@Service
public class NoticiaService {

    @Autowired
    private NoticiaDaoImpl noticiaDao;

    public ResponseEntity<?> listarTodas() {
        return ResponseEntity.ok(noticiaDao.listarNoticias());
    }

    public ResponseEntity<?> listarTodasAdmin() {
        return ResponseEntity.ok(noticiaDao.listarNoticiasAdmin());
    }

    public ResponseEntity<?> buscarPorId(Long id) {
        return ResponseEntity.ok(noticiaDao.buscarNoticiaPorId(id));
    }

    public ResponseEntity<?> guardarNoticia(String titulo, String texto, String autor) {
        try {
            validar(titulo, texto, autor);
        } catch (MiException e) {
            return ResponseEntity.status(Integer.parseInt(e.getMessage())).build();
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

    public ResponseEntity<?> modificarNoticia(Long id, String titulo, String texto, String autor,boolean alta){
        try {
            validar(titulo, texto, autor);
        } catch (MiException e) {
            return ResponseEntity.status(Integer.parseInt(e.getMessage())).build();
        }

        Noticia noticia = noticiaDao.buscarNoticiaPorId(id).get();

        noticia.setTitulo(titulo);
        noticia.setTexto(texto);
        noticia.setAutor(autor);
        noticia.setAlta(alta);

        noticiaDao.modificarNoticia(noticia);

        return ResponseEntity.ok().build();

    }

    public ResponseEntity<?> eliminarNoticia(Long id){

        Optional<Noticia> noticiaOptional = noticiaDao.buscarNoticiaPorId(id);

        if(noticiaOptional.isPresent()){
            noticiaDao.eliminarNoticia(noticiaOptional.get());
            return ResponseEntity.ok().build();
        }
        
        return ResponseEntity.status(515).build();   
    }

    private void validar(String titulo, String texto, String autor) throws MiException {
        if (titulo == null || titulo == "") {
            throw new MiException("511");
        }

        if (texto == null || texto == "") {
            throw new MiException("512");
        }

        if (autor == null || autor == "") {
            throw new MiException("513");
        }
    }

}
