package com.j0k3r.eggnews.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.j0k3r.eggnews.dao.impl.RoleDaoImpl;

@Service
public class RoleService {
    
    @Autowired
    private RoleDaoImpl roleDao;

    public ResponseEntity<?> findAll(){
        return ResponseEntity.ok(roleDao.findAll());
    }

}
