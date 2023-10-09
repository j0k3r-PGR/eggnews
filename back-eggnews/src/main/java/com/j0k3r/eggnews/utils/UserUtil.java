package com.j0k3r.eggnews.utils;

import com.j0k3r.eggnews.models.auth.UserEntity;
import com.j0k3r.eggnews.repositories.UserRepository;

import jakarta.annotation.PostConstruct;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserUtil {

    @Autowired
    private static UserRepository userRepository;

    @Autowired
    private UserRepository useRepository;

    @PostConstruct
    private void init(){
        UserUtil.userRepository = this.useRepository;
    }

    public static Optional<UserEntity> findUser(String username) {
        return userRepository.findByUsername(username);
    }

}
