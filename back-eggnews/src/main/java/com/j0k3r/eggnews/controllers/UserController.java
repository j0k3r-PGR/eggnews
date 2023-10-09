package com.j0k3r.eggnews.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/user")
public class UserController {

    @GetMapping("v1")
    public String v1(){
        return "pass";
    }


    @GetMapping("v2")
    public String v2(){
        return "pass";
    }
}
