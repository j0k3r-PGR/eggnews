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

import com.j0k3r.eggnews.models.auth.UserEntity;
import com.j0k3r.eggnews.models.dto.UserEntityDto;
import com.j0k3r.eggnews.services.UserService;

@RestController
@RequestMapping("/superuser/user")
public class UserController {

    @Autowired
    private UserService userService;

    @CrossOrigin("*")
    @GetMapping("/all")
    public ResponseEntity<?> findAll(){
        return userService.findAll();
    }

    @CrossOrigin("*")
    @GetMapping("/find/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id){
        return userService.findById(id);
    }
    
    @CrossOrigin("*")
    @PostMapping("/save") 
    public ResponseEntity<?> saveUser(@RequestBody UserEntityDto userDto){
        return userService.saveUser(userDto);
    }

    @CrossOrigin("*")
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody UserEntity userDto){
        return userService.updateUser(id, userDto);
    }

    @CrossOrigin("*")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id){
        return userService.deleteUser(id);
    }
    
}
