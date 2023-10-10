package com.j0k3r.eggnews.dao;

import java.util.Optional;

import com.j0k3r.eggnews.models.auth.UserEntity;

public interface UserDao {
    
    void saveUser(UserEntity user);

    Optional<UserEntity> findByUsername(String username);

    Iterable<UserEntity> findAll();

    void deleteUser(UserEntity user);

    Optional<UserEntity> findById(Long id);

    void updateUser(UserEntity user);

}