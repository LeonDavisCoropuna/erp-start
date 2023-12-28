package com.project.r2system.domain.budgetSystem.controllers;

import com.project.r2system.api.commons.BudgetFormMapping;
import com.project.r2system.domain.budgetSystem.entities.BudgetForm;
import com.project.r2system.domain.budgetSystem.payloads.BudgetFormResponse;
import com.project.r2system.domain.budgetSystem.services.BudgetFormService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
@RestController
@RequestMapping("/data/budget-form")
public class BudgetFormController {
    @Autowired
    private BudgetFormService budgetFormService;

    @Autowired
    private BudgetFormMapping budgetFormMapping;


    @GetMapping("/all")
    public ResponseEntity<List<?>> getAllBudgets()
    {
        List<BudgetForm> budgetsForm = budgetFormService.allBudgetForm();
        if (budgetsForm.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        List<BudgetFormResponse> DTO = new ArrayList<>();
        for (BudgetForm budget : budgetsForm) {
            DTO.add(budgetFormMapping.mapBudgetFormToResponse(budget));
        }
        return new ResponseEntity<>(DTO, HttpStatus.OK);
    }

    @GetMapping("/{idN}")
    public ResponseEntity<?> getBudgetById(@PathVariable String idN) {
        BudgetForm budget = budgetFormService.BudgetFormById(idN);
        if (budget != null) {
            return new ResponseEntity<>(budgetFormMapping.mapBudgetFormToResponse(budget), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Presupuesto no encontrado",HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createBudgetForm(@RequestBody BudgetFormResponse budgetResponse) {
        BudgetForm budget = budgetFormMapping.createBudgetFormByResponse(budgetResponse);
        String state = budgetFormService.createBudgetForm(budget);
        if(!Objects.equals(state, "OK")){
            return new ResponseEntity<>(state, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>("Presupuesto Creado",HttpStatus.CREATED);
    }


    /*@PutMapping("/{idN}")
    public ResponseEntity<?> updateBudget(@PathVariable String idN, @RequestBody BudgetResponse updatedBudget) {
        try {
            String createdBudget = budgetService.updateBudget(idN,updatedBudget);
            if(Objects.equals(createdBudget, "NOT_FOUND")){
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(createdBudget, HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }*/

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBudget(@PathVariable("id") String idN) {
        try {
            budgetFormService.deleteByIdN(idN);
            return new ResponseEntity<>("Eliminado con exito",HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al eliminar", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
