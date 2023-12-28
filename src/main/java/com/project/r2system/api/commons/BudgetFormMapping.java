package com.project.r2system.api.commons;


import com.project.r2system.domain.budgetSystem.entities.Budget;
import com.project.r2system.domain.budgetSystem.entities.BudgetForm;
import com.project.r2system.domain.budgetSystem.payloads.BudgetFormResponse;
import com.project.r2system.domain.budgetSystem.services.BudgetService;
import com.project.r2system.security.jwt.JwtUtils;
import com.project.r2system.security.services.UserDetailsImpl;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

public class BudgetFormMapping {
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private BudgetService budgetService;

//    @Autowired
//    private UserDetailsImpl userDetails;

    public BudgetFormResponse mapBudgetFormToResponse(BudgetForm budgetFrom) {

        return modelMapper.map(budgetFrom, BudgetFormResponse.class);
    }

    public BudgetForm createBudgetFormByResponse(BudgetFormResponse budgetFormResponse){

        // Obtener la fecha actual en el horario de Perú
        TimeZone timeZone = TimeZone.getTimeZone("America/Lima");
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSX");
        sdf.setTimeZone(timeZone);
        Date fechaCreacion = new Date();  // Fecha y hora actual
        String fechaCreacionFormatted = sdf.format(fechaCreacion);


        BudgetForm budgetForm = modelMapper.map(budgetFormResponse, BudgetForm.class);
//        budgetForm.setCreadoPor(userDetails.getUsername());
        Budget budget = new Budget();
        budget.setIdN(budgetForm.getIdN());


        try {
            Date fechaCreacionDate = sdf.parse(fechaCreacionFormatted);
            budget.setFechaCreacion(fechaCreacionDate);
        } catch (ParseException e) {
            e.printStackTrace();  // Manejar la excepción según tu lógica
        }


        budgetService.createBudget(budget);
        return budgetForm;
    }
    public void updateBudgetFormByResponse(BudgetFormResponse budgetFormResponse, BudgetForm budgetForm){

        budgetForm.setIdN(budgetFormResponse.getIdN());
        budgetForm.setNroOrden(budgetFormResponse.getNroOrden());
        budgetForm.setCliente(budgetFormResponse.getCliente());
        budgetForm.setFecha(budgetFormResponse.getFecha());
        budgetForm.setAprobadoPor(budgetFormResponse.getAprobadoPor());
        budgetForm.setFechaAprobacion(budgetFormResponse.getFechaAprobacion());
        budgetForm.setFechaEntrega(budgetFormResponse.getFechaEntrega());
        budgetForm.setNroFactura(budgetFormResponse.getNroFactura());
        budgetForm.setEstado(budgetFormResponse.getEstado());
        budgetForm.setObservacion(budgetFormResponse.getObservacion());
        budgetForm.setTipoOrden(budgetFormResponse.getTipoOrden());
        budgetForm.setStatus(budgetFormResponse.getStatus());
        budgetForm.setCreado(budgetFormResponse.getCreado());
        budgetForm.setFechaActualizado(budgetForm.getFechaActualizado());
        budgetForm.setCreadoPor(budgetForm.getCreadoPor());
        budgetForm.setActualizadoPor(budgetFormResponse.getActualizadoPor());
        budgetForm.setFechaTermino(budgetFormResponse.getFechaTermino());
        budgetForm.setTerminadoPor(budgetFormResponse.getTerminadoPor());
        budgetForm.setBitacora(budgetFormResponse.getBitacora());
        budgetForm.setValidadoPor(budgetFormResponse.getValidadoPor());
    }
}
