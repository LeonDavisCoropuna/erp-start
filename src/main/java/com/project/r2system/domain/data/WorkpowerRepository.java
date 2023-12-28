package com.project.r2system.domain.data;

import com.project.r2system.domain.data.entities.Article;
import com.project.r2system.domain.data.entities.Workpower;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface WorkpowerRepository extends MongoRepository<Workpower, ObjectId> {
    Optional<Workpower> findByIdN(Integer idN);
    Void deleteByIdN(Integer idN);
}
