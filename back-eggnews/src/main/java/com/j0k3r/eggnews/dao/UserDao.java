package com.j0k3r.eggnews.dao;

import java.util.List;
import java.util.Optional;

import com.j0k3r.eggnews.models.auth.UserEntity;

public interface UserDao {
    void saveUser(UserEntity user);

    Optional<UserEntity> findByUsername(String username);

    List<UserEntity> findAll();

    List<UserEntity> findByAlta(Boolean alta);
}
