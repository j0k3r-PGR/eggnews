package com.j0k3r.eggnews.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.j0k3r.eggnews.services.CategoryService;

@RestController
@RequestMapping("/category")
public class CategoryController {
    

    @Autowired
    private CategoryService categoryService;

    @CrossOrigin("*")
    @GetMapping("/all")
    public ResponseEntity<?> all(){
        return categoryService.findAllCategories();
    }

}
