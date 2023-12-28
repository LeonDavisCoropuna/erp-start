package com.project.r2system.domain.data;

import com.project.r2system.domain.data.entities.Category;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CategoryRepository extends MongoRepository<Category, ObjectId> {
    Optional<Category> findByIdN(Integer idN);
    Optional<Category> findByNombre(String name);
    Void deleteByIdN(Integer idN);
}
