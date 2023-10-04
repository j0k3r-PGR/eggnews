package com.j0k3r.eggnews.dao.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.j0k3r.eggnews.dao.UserDao;
import com.j0k3r.eggnews.models.auth.UserEntity;
import com.j0k3r.eggnews.repositories.UserRepository;

@Component
public class UserDaoImpl implements UserDao{

    @Autowired
    private UserRepository userRepository;

    @Override
    public void saveUser(UserEntity user) {
        userRepository.save(user);
    }

    @Override
    public Optional<UserEntity> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public List<UserEntity> findAll() {
        return userRepository.findAll();
    }

    @Override
    public List<UserEntity> findByAlta(Boolean alta) {
        return userRepository.findByAlta(true);
    }
    
}
