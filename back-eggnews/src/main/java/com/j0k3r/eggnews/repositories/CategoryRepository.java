package com.j0k3r.eggnews.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.j0k3r.eggnews.models.Category;

@Repository
public interface CategoryRepository extends CrudRepository<Category,Long>{
    
}
