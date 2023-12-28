package com.project.r2system.domain.budgetSystem;

import com.project.r2system.domain.budgetSystem.entities.Budget;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface BudgetRepository extends MongoRepository<Budget, ObjectId> {
    Optional<Budget> findByIdN(String idN);
    Void deleteByIdN(String idN);
}
