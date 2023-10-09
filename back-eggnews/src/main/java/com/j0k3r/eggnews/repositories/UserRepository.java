package com.j0k3r.eggnews.repositories;

import com.j0k3r.eggnews.models.auth.UserEntity;
import java.util.Optional;
import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<UserEntity,Long>{
    
    Optional<UserEntity> findByUsername(String username);
    
    Optional<UserEntity> findByUsernameAndPassword(String password, String username);
    
    Optional<UserEntity> findByUsernameAndPasswordAndToken(String password, String username, String token);

    List<UserEntity> findByAlta(Boolean alta);
}
