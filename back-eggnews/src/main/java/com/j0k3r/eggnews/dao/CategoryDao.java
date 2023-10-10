package com.j0k3r.eggnews.dao;

import java.util.Optional;

import com.j0k3r.eggnews.models.Category;

public interface CategoryDao {
    
    Optional<Category> findCategory(Long id);

    Iterable<Category> findAll();

    void save(Category category);

    void putCategory(Category category);

    void deleteCategory(Category category);

}
