package com.j0k3r.eggnews.dao.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.j0k3r.eggnews.dao.RoleDao;
import com.j0k3r.eggnews.models.auth.RoleEntity;
import com.j0k3r.eggnews.repositories.RoleRepository;

@Component
public class RoleDaoImpl implements RoleDao{

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public Iterable<RoleEntity> findAll() {
        return roleRepository.findAll();
    }
    
}
