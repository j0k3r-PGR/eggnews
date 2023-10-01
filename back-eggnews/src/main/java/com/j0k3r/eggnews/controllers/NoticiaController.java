package com.j0k3r.eggnews.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.j0k3r.eggnews.models.dto.NoticiaDtoIntro;
import com.j0k3r.eggnews.models.dto.NoticiaDtoSend;
import com.j0k3r.eggnews.services.NoticiaService;


@RestController
@RequestMapping("noticias")
public class NoticiaController {
    
    @Autowired
    private NoticiaService noticiaService;

    @CrossOrigin("http://localhost:5173")
    @GetMapping("/listar")
    public ResponseEntity<?> listarNoticias(){
        return noticiaService.listarTodas();
    }

    @CrossOrigin("http://localhost:5173")
    @GetMapping("/listaradmin")
    public ResponseEntity<?> listarNoticiasAdmin(){
        return noticiaService.listarTodasAdmin();
    }

    @CrossOrigin("http://localhost:5173")
    @GetMapping("/buscar/{id}")
    public ResponseEntity<?> buscarNoticiaPorId(@PathVariable Long id){
        return noticiaService.buscarPorId(id);
    }

    @CrossOrigin("http://localhost:5173")
    @PostMapping("/save")
    public ResponseEntity<?> salvarNoticia(@RequestBody NoticiaDtoIntro noticia ){
        return noticiaService.guardarNoticia(noticia.getTitulo(),noticia.getTexto(),noticia.getAutor());
    }

    @CrossOrigin("http://localhost:5173")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id){
        return noticiaService.eliminarNoticia(id);
    }

    @CrossOrigin("http://localhost:5173")
    @PostMapping("/modificar/{id}")
    public ResponseEntity<?> modificarNoticia(@PathVariable Long id, @RequestBody NoticiaDtoSend noticia){
        return noticiaService.modificarNoticia(noticia.getId(),noticia.getTitulo(),noticia.getTexto(),noticia.getAutor(),noticia.isAlta());
    }
    
}
