package com.project.r2system.domain.data;

import com.project.r2system.domain.data.entities.Client;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ClientRepository extends MongoRepository <Client, ObjectId>{
    Optional<Client> findByIdN(Integer idN);
    Void deleteByIdN(Integer idN);
}
