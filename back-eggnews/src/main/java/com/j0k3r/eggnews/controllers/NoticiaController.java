package com.j0k3r.eggnews.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.j0k3r.eggnews.services.NoticiaService;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("noticias")
public class NoticiaController {
    
    @Autowired
    private NoticiaService noticiaService;

    @CrossOrigin("*")
    @GetMapping("/listar")
    public ResponseEntity<?> listarNoticias(){
        return noticiaService.listarTodas();
    }
    
    @CrossOrigin("*")
    @GetMapping("/buscar/{id}")
    public ResponseEntity<?> buscarNoticiaPorId(@PathVariable Long id){
        return noticiaService.buscarPorId(id);
    }    

}
