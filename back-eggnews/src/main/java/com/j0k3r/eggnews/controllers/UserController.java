package com.j0k3r.eggnews.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.j0k3r.eggnews.models.dto.UserEntityDto;
import com.j0k3r.eggnews.services.UserService;


@RestController
@RequestMapping("/admin/user")
public class UserController {

    @Autowired
    private UserService userService;
    

    @GetMapping("/all")
    public ResponseEntity<?> listAll(){
        return userService.listAll();
    }

    @GetMapping("/all/alta")
    public ResponseEntity<?> findAllAlta(){
        return userService.findAllAlta();
    }

    @GetMapping("/all/baja")
    public ResponseEntity<?> findAllBaja(){
        return userService.findAllBaja();
    }

    @PostMapping("/create")
    public ResponseEntity<?> createUser(@RequestBody UserEntityDto user){
        return userService.createUser(user);
    }



}
