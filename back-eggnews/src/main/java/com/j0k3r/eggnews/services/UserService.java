package com.j0k3r.eggnews.services;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.j0k3r.eggnews.dao.impl.UserDaoImpl;
import com.j0k3r.eggnews.models.auth.Role;
import com.j0k3r.eggnews.models.auth.RoleEntity;
import com.j0k3r.eggnews.models.auth.UserEntity;
import com.j0k3r.eggnews.models.dto.UserEntityDto;

@Service
public class UserService {

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private UserDaoImpl userDao;

    public ResponseEntity<?> createUser(UserEntityDto userDto){

        validate(userDto.getName(), userDto.getSurname(), userDto.getUsername(), userDto.getPassword(), userDto.getRoles());

        Set<RoleEntity> roles = userDto.getRoles().stream()
                                    .map(role -> RoleEntity.builder()
                                        .name(Role.valueOf(role)).build())
                                    .collect(Collectors.toSet());

        UserEntity user = UserEntity.builder()
                .username(userDto.getUsername())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .name(userDto.getName())
                .surname(userDto.getSurname())
                .roles(roles)
            .build();

        userDao.saveUser(user);

        return ResponseEntity.ok(user);
    }
    

    public Optional<UserEntity> findUser(String username){
        return userDao.findByUsername(username);
    }

    public ResponseEntity<?> listAll(){
        return ResponseEntity.ok(userDao.findAll());
    }

    public ResponseEntity<?> findAllAlta(){
        return ResponseEntity.ok(userDao.findByAlta(true));
    }

    public ResponseEntity<?> findAllBaja(){
        return ResponseEntity.ok(userDao.findByAlta(false));
    }


    private void validate(String name, String surname, String username, String password, List<String> list){
        if(name == null || surname == null || username == null || password == null || list == null){
            throw new IllegalArgumentException();
        }
        if(name.isEmpty() || surname.isEmpty() || username.isEmpty() || password.isEmpty() || list.isEmpty()){
            throw new IllegalArgumentException();
        }
        if(name.length() < 3 || surname.length() < 3 || username.length() < 8 || password.length() < 8){
            throw new IllegalArgumentException();
        }
        if(list.stream().anyMatch(role -> role == null || role.isEmpty())){
            throw new IllegalArgumentException();
        }
        

    }

}
