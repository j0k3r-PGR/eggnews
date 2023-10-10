package com.j0k3r.eggnews.services;

import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.j0k3r.eggnews.dao.impl.UserDaoImpl;
import com.j0k3r.eggnews.models.auth.RoleEntity;
import com.j0k3r.eggnews.models.auth.UserEntity;
import com.j0k3r.eggnews.models.dto.UserEntityDto;
import com.j0k3r.eggnews.repositories.RoleRepository;

@Service
public class UserService {

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    private UserDaoImpl userDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public ResponseEntity<?> findAll() {
        Iterable<UserEntity> users = null;
        try {
            users = userDao.findAll();
        } catch (Exception e) {
            return ResponseEntity.status(530).body("Internal Problema en el servidor");
        }
        return ResponseEntity.ok(users);
    }

    public ResponseEntity<?> deleteUser(Long id) {
        Optional<UserEntity> userOptional = userDao.findById(id);

        if (userOptional.isPresent()) {
            UserEntity user = userOptional.get();
            userDao.deleteUser(user);
            return ResponseEntity.ok("delete success");
        }
        return ResponseEntity.status(531).body("Not found user");
    }

    public ResponseEntity<?> findById(Long id) {
        Optional<UserEntity> userOptional = userDao.findById(id);

        if (userOptional.isPresent()) {
            UserEntity user = userOptional.get();
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(531).body("Not found user");
    }

    public ResponseEntity<?> updateUser(Long id, UserEntity userDto) {

        try {
            validate(userDto.getName(), userDto.getUsername(), userDto.getSurname(), userDto.getPassword(),
                    userDto.getIdRole());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(533).body("all inputs required");
        }

        Optional<UserEntity> userOptional = userDao.findById(id);

        if (userOptional.isPresent()) {
            RoleEntity roleEntity = roleRepository.findById(userDto.getIdRole()).get();
            Set<RoleEntity> roles = Set.of(roleEntity);

            UserEntity user = userOptional.get();
            user.setName(userDto.getName());
            user.setUsername(userDto.getUsername());
            if (!user.getPassword().equals(userDto.getPassword())) {
                user.setPassword(passwordEncoder.encode(userDto.getPassword()));
            }
            user.setAlta(userDto.getAlta());
            user.setSurname(userDto.getSurname());
            user.setRoles(roles);
            user.setIdRole();
            try {
                userDao.updateUser(user);
            } catch (Exception e) {
                return ResponseEntity.status(532).body(e.getMessage());
            }

            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(531).body("Not found user");
    }

    public ResponseEntity<?> saveUser(UserEntityDto userDto) {

        try {
            validate(userDto.getName(), userDto.getUsername(), userDto.getSurname(), userDto.getPassword(),
                    userDto.getIdRole());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(533).body("all inputs required");
        }

        Optional<RoleEntity> roleEntityOptional = roleRepository.findById(userDto.getIdRole());
        if (!roleEntityOptional.isPresent()) {
            return ResponseEntity.status(541).body("Not found role");
        }

        Set<RoleEntity> roles = Set.of(roleEntityOptional.get());

        UserEntity user = UserEntity.builder()
                .name(userDto.getName())
                .surname(userDto.getSurname())
                .username(userDto.getUsername())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .roles(roles)
                .build();
        user.setIdRole();
        try {
            userDao.saveUser(user);
        } catch (Exception e) {
            return ResponseEntity.status(532).body("problem in the server");
        }

        return ResponseEntity.ok(user);
    }

    private void validate(String name, String username, String surname, String password, Long idRoles)
            throws IllegalArgumentException {
        if (name == null || name.isEmpty() || name == "") {
            throw new IllegalArgumentException("name is required");
        }
        if (surname == null || surname.isEmpty() || surname == "") {
            throw new IllegalArgumentException("name is required");
        }
        if (username == null || username.isEmpty() || username == "") {
            throw new IllegalArgumentException("name is required");
        }
        if (password == null || password.isEmpty() || password == "") {
            throw new IllegalArgumentException("name is required");
        }
        if (idRoles == null) {
            throw new IllegalArgumentException("name is required");
        }

    }

}