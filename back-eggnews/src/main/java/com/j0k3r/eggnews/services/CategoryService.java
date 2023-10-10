package com.j0k3r.eggnews.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.j0k3r.eggnews.dao.impl.CategoryDaoImpl;
import com.j0k3r.eggnews.models.Category;
import com.j0k3r.eggnews.models.dto.CategoryDto;

@Service
public class CategoryService {
    
    @Autowired
    private CategoryDaoImpl categoryDao;

    public ResponseEntity<?> saveCategory(String name){
        if (name == null || name.isEmpty()){
            return ResponseEntity.status(521).build();
        }
        Category category = Category.builder().name(name).build();

        try{
            categoryDao.save(category);
        }catch (Exception e){
            return ResponseEntity.status(520).build();
        }
        
        return ResponseEntity.ok(category);
    }

    public ResponseEntity<?> updateCategory(CategoryDto categoryDto){
        if (categoryDto == null || categoryDto.getName() == null || categoryDto.getId() == null || categoryDto.getName().isEmpty()){
            return ResponseEntity.status(522).build();
        }

        Category category = Category.builder()
                        .id(categoryDto.getId())
                        .name(categoryDto.getName())
                    .build();

        categoryDao.save(category);

        return ResponseEntity.ok(category);
    }
    
    public ResponseEntity<?> deleteCategory(CategoryDto categoryDto){
        Category category = Category.builder()
                        .id(categoryDto.getId())
                        .name(categoryDto.getName())
                    .build();
        try{
            categoryDao.deleteCategory(category);
        }catch (Exception e){
            return ResponseEntity.status(523).build();
        }

        return ResponseEntity.ok("Delete success");
    }

    public ResponseEntity<?> findAllCategories(){

        Iterable<Category> categories;

        try{
            categories = categoryDao.findAll();
        }catch (Exception e){
            return ResponseEntity.status(524).build();
        }

        return ResponseEntity.ok(categories);
    }

}
