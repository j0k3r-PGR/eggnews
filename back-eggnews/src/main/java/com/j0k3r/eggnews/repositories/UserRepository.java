package com.j0k3r.eggnews.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.j0k3r.eggnews.models.auth.UserEntity;
import java.util.Optional;
import java.util.List;



public interface UserRepository extends JpaRepository<UserEntity,Long>{
    Optional<UserEntity> findByUsername(String username);

    List<UserEntity> findByAlta(Boolean alta);
}
