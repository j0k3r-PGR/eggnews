package com.j0k3r.eggnews.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.j0k3r.eggnews.models.dto.CategoryDto;
import com.j0k3r.eggnews.services.CategoryService;
import com.j0k3r.eggnews.services.NoticiaService;
import com.j0k3r.eggnews.services.RoleService;

@RestController
@RequestMapping("/superuser")
public class SuperAdminController {

    @Autowired
    private NoticiaService noticiaService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private RoleService roleService;

    @CrossOrigin("*")
    @GetMapping("/noticias/listaradmin")
    public ResponseEntity<?> listarNoticiasAdmin() {
        return noticiaService.listarTodasAdmin();
    }

    @CrossOrigin("*")
    @DeleteMapping("/noticias/delete/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        return noticiaService.eliminarNoticia(id);
    }

    @CrossOrigin("*")
    @PostMapping("/category/save")
    public ResponseEntity<?> save(@RequestBody String name){
        return categoryService.saveCategory(name);
    }

    @CrossOrigin("*")
    @PutMapping("/category/update")
    public ResponseEntity<?> update(@RequestBody CategoryDto category){
        return categoryService.updateCategory(category);
    }

    @CrossOrigin("*")
    @DeleteMapping("/category/delete")
    public ResponseEntity<?> delete(@RequestBody CategoryDto category){
        return categoryService.deleteCategory(category);
    }

    @CrossOrigin("*")
    @GetMapping("/roles/all")
    public ResponseEntity<?> findAllRoles(){
        return roleService.findAll();
    }

}
