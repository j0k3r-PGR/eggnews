package com.j0k3r.eggnews.dao;

import com.j0k3r.eggnews.models.auth.RoleEntity;

public interface RoleDao {
    
    Iterable<RoleEntity> findAll();

}
