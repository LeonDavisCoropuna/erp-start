package com.project.r2system.domain.data;


import com.project.r2system.domain.data.entities.Supplier;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface SupplierRepository extends MongoRepository <Supplier, ObjectId>{
    Optional<Supplier> findByIdN(Integer idN);
}
