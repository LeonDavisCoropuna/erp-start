package com.project.r2system.domain.data.services;

import com.project.r2system.api.commons.CategoryMapping;
import com.project.r2system.domain.data.entities.Category;
import com.project.r2system.domain.data.CategoryRepository;
import com.project.r2system.domain.data.payloads.responses.CategoryResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private CategoryMapping categoryMapping;

    public List<Category> allCategories() {
        return categoryRepository.findAll();
    }

    public Category CategoryById(Integer idN) {
        return categoryRepository.findByIdN(idN).orElse(null);
    }
    public Category CategoryByNombre(String name) {
        return categoryRepository.findByNombre(name).orElse(null);
    }

    public String createCategory(Category Category) {
        try {
            categoryRepository.save(Category);
            return "OK";
        } catch (Exception e) {
            return e.getCause().toString();
        }
    }
    public String updateCategory(Integer idN, CategoryResponse categoryResponse) {
        try {
            Optional<Category> categoryData = categoryRepository.findByIdN(idN);
            if(categoryData.isPresent()) {
                Category _category = categoryData.get();
                categoryMapping.updateFromRequest(categoryResponse, _category);
                categoryRepository.save(_category);
                return "OK";
            }
            return "NOT_FOUND";
        }catch (Exception e) {
            return e.getCause().toString();
        }
    }
    public void deleteByIdN(Integer idN){
        categoryRepository.deleteByIdN(idN);
    }
}
