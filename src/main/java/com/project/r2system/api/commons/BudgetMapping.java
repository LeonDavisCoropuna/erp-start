package com.project.r2system.api.commons;

import com.project.r2system.domain.budgetSystem.entities.Budget;
import com.project.r2system.domain.budgetSystem.payloads.BudgetResponse;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

@AllArgsConstructor
@NoArgsConstructor
public class BudgetMapping {

    @Autowired
    private ModelMapper modelMapper;

    public BudgetResponse mapBudgetToResponse(Budget budget) {

        return modelMapper.map(budget, BudgetResponse.class);
    }
    public Budget createBudgetByResponse(BudgetResponse budgetResponse){

        return modelMapper.map(budgetResponse, Budget.class);
    }
    public void updateBudgetByResponse(BudgetResponse budgetResponse, Budget budget){
        // Actualiza los campos del objeto Budget con los valores del objeto BudgetResponse
        budget.setIdN(budgetResponse.getIdN());
        budget.setEstado(budgetResponse.getEstado());
        budget.setFormaPago(budgetResponse.getFormaPago());
        budget.setReferencia(budgetResponse.getReferencia());
        budget.setFechaCreacion(budgetResponse.getFechaCreacion());
        budget.setFechaValidez(budgetResponse.getFechaValidez());
        budget.setPrecio(budgetResponse.getPrecio());
        budget.setTipo(budgetResponse.getTipo());

        // Actualiza los campos relacionados con el cliente
        budget.setCliente(budgetResponse.getCliente());
        budget.setNombre(budgetResponse.getNombre());
        budget.setDireccion(budgetResponse.getDireccion());
        budget.setAtencion(budgetResponse.getAtencion());

        // Actualiza los servicios
        budget.setServicios(budgetResponse.getServicios());
    }
}
