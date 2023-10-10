package com.j0k3r.eggnews.dao.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.j0k3r.eggnews.dao.CategoryDao;
import com.j0k3r.eggnews.models.Category;
import com.j0k3r.eggnews.repositories.CategoryRepository;

@Component
public class CategoryDaoImpl implements CategoryDao{

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Optional<Category> findCategory(Long id) {
        return categoryRepository.findById(id);
    }

    @Override
    public Iterable<Category> findAll() {
        return categoryRepository.findAll();
    }

    @Override
    public void putCategory(Category category) {
        categoryRepository.save(category);
    }

    @Override
    public void deleteCategory(Category category) {
        categoryRepository.delete(category);
    }

    @Override
    public void save(Category category) {
        categoryRepository.save(category);
    }
    
}
