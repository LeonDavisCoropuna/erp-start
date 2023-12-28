package com.project.r2system.domain.data;

import com.project.r2system.domain.data.entities.Measure;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MeasureRepository extends MongoRepository<Measure, ObjectId> {
    Measure findByIdN(Integer idN);
    Measure findByNombre(String name);
    Void deleteByIdN(Integer idN);
}