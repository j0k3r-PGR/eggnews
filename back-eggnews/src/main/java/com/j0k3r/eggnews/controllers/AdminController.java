package com.j0k3r.eggnews.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.j0k3r.eggnews.models.dto.NoticiaDtoIntro;
import com.j0k3r.eggnews.models.dto.NoticiaDtoSend;
import com.j0k3r.eggnews.services.NoticiaService;
import com.j0k3r.eggnews.services.RoleService;


@RestController
@RequestMapping("/admin")
public class AdminController {
    
    @Autowired
    private NoticiaService noticiaService;

    @Autowired
    private RoleService roleService;

    @CrossOrigin("*")
    @GetMapping("/all/{username}")
    public ResponseEntity<?> findAll(@PathVariable String username){
        return noticiaService.findByUser(username);
    }

    @CrossOrigin("*")
    @PostMapping("/noticias/save/{id}")
    public ResponseEntity<?> salvarNoticia(@RequestBody NoticiaDtoIntro noticia,@PathVariable Long id ){
        return noticiaService.guardarNoticia(noticia.getTitulo(),noticia.getTexto(),noticia.getAutor(), noticia.getCategory().getId(),id);
    }

    @CrossOrigin("*")
    @PostMapping("/noticias/modificar/{id}")
    public ResponseEntity<?> modificarNoticia(@PathVariable Long id, @RequestBody NoticiaDtoSend noticia){
        return noticiaService.modificarNoticia(noticia.getId(),noticia.getTitulo(),noticia.getTexto(),noticia.getAutor(),noticia.isAlta(),noticia.getCategory().getId());
    }

    @CrossOrigin("*")
    @GetMapping("/roles/all")
    public ResponseEntity<?> findAllRoles(){
        return roleService.findAll();
    }

}
