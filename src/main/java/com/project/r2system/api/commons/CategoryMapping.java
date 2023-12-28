package com.project.r2system.api.commons;

import com.project.r2system.domain.data.entities.Category;
import com.project.r2system.domain.data.payloads.responses.CategoryResponse;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

public class CategoryMapping {
    @Autowired
    private ModelMapper modelMapper;

    public CategoryResponse maptoResponse(Category category) {
        CategoryResponse categoryResponse = modelMapper.map(category, CategoryResponse.class);
        categoryResponse.setEstado(category.getEstado() ? "Activo" : "Inactivo");
        return categoryResponse;
    }
    public void updateFromRequest(CategoryResponse categoryResponse, Category category){
        category.setNombre(categoryResponse.getNombre());
    }
}
