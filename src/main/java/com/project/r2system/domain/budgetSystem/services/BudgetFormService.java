package com.project.r2system.domain.budgetSystem.services;

import com.project.r2system.api.commons.BudgetFormMapping;
import com.project.r2system.domain.budgetSystem.BudgetFormRepository;
import com.project.r2system.domain.budgetSystem.entities.BudgetForm;
import com.project.r2system.domain.budgetSystem.payloads.BudgetFormResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class BudgetFormService {
    @Autowired
    private final BudgetFormRepository budgetFormRepository;

    @Autowired
    private final BudgetFormMapping budgetFormMapping;

    public BudgetFormService(BudgetFormRepository budgetFormRepository, BudgetFormMapping budgetFormMapping) {
        this.budgetFormRepository = budgetFormRepository;
        this.budgetFormMapping = budgetFormMapping;
    }


    public List<BudgetForm> allBudgetForm()
    {
        return budgetFormRepository.findAll();
    }

    public BudgetForm BudgetFormById(String idN)
    {
        try {
            return budgetFormRepository.findByIdN(idN).orElse(null);
        } catch (NoSuchElementException e) {
            return null; // Opcionalmente, puedes lanzar una excepción personalizada o registrar un error aquí.
        }

    }

    public String createBudgetForm(BudgetForm budgetForm) {
        try {
            budgetFormRepository.save(budgetForm);
            return "OK";
        } catch (Exception e) {
            return e.getCause().toString();
        }
    }
    public String updateBudgetForm(String idN, BudgetFormResponse budgetFormResponse) {
        try {
            Optional<BudgetForm> BudgetFormData = budgetFormRepository.findByIdN(idN);
            if(BudgetFormData.isPresent()){
                BudgetForm _budgetForm = BudgetFormData.get();
                budgetFormMapping.updateBudgetFormByResponse(budgetFormResponse, _budgetForm);
                budgetFormRepository.save(_budgetForm);
                return "OK";
            }
            return "NOT_FOUND";
        }catch (Exception e) {
            return e.getCause().toString();
        }
    }
    public void deleteByIdN(String idN)
    {
        budgetFormRepository.deleteByIdN(idN);
    }
}
