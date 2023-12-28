package com.project.r2system.domain.data;

import com.project.r2system.domain.data.entities.Article;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ArticleRepository extends MongoRepository<Article, ObjectId> {
    Optional<Article> findByIdN(Integer idN);
    Void deleteByIdN(Integer idN);
}
