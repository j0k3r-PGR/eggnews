package com.j0k3r.eggnews.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.j0k3r.eggnews.models.auth.RoleEntity;

public interface RoleRepository extends JpaRepository<RoleEntity,Long>{
    
}
