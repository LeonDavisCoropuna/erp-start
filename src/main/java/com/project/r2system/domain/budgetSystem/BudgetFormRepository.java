package com.project.r2system.domain.budgetSystem;

import com.project.r2system.domain.budgetSystem.entities.Budget;
import com.project.r2system.domain.budgetSystem.entities.BudgetForm;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface BudgetFormRepository extends MongoRepository<BudgetForm, ObjectId> {
    Optional<BudgetForm> findByIdN(String idN);
    Void deleteByIdN(String idN);
}
