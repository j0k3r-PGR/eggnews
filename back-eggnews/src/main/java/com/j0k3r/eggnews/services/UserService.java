package com.j0k3r.eggnews.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.j0k3r.eggnews.dao.impl.UserDaoImpl;

@Service
public class UserService {

    @Autowired
    private UserDaoImpl userDao;
    
}
