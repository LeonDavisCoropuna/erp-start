package com.project.r2system.domain.budgetSystem.controllers;

import com.project.r2system.api.commons.BudgetMapping;
import com.project.r2system.domain.budgetSystem.entities.Budget;
import com.project.r2system.domain.budgetSystem.payloads.BudgetResponse;
import com.project.r2system.domain.budgetSystem.services.BudgetService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
@RestController
@RequestMapping("/data/budget")
public class BudgetController {
    @Autowired
    private BudgetService budgetService;

    @Autowired
    private BudgetMapping budgetMapping;

    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<?>> getAllBudget()
    {
        List<Budget> budgets = budgetService.allBudget();
        if (budgets.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        List<BudgetResponse> DTO = new ArrayList<>();
        for (Budget budget : budgets) {
            DTO.add(budgetMapping.mapBudgetToResponse(budget));
        }
        return new ResponseEntity<>(DTO, HttpStatus.OK);
    }

    @GetMapping("/{idN}")
    public ResponseEntity<BudgetResponse> getBudgetById(@PathVariable String idN) {
        Budget budget = budgetService.BudgetById(idN);
        if (budget != null) {
            return new ResponseEntity<>(budgetMapping.mapBudgetToResponse(budget), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createBudget(@RequestBody BudgetResponse budgetResponse) {
        Budget budget = budgetMapping.createBudgetByResponse(budgetResponse);
        String state = budgetService.createBudget(budget);
        if(!Objects.equals(state, "OK")){
            return new ResponseEntity<>(state, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>("Presupuesto Creado",HttpStatus.CREATED);
    }
    @PutMapping("/{idN}")
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
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteTutorial(@PathVariable("id") String idN) {
        try {
            budgetService.deleteByIdN(idN);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
