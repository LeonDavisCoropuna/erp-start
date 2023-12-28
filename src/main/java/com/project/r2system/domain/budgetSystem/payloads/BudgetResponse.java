package com.project.r2system.domain.budgetSystem.payloads;

import com.project.r2system.domain.budgetSystem.entities.ItemBudget;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class    BudgetResponse {
    private String idN;
    private String estado;
    private String formaPago;
    private String referencia;
    private Date fechaCreacion;
    private Date fechaValidez;
    private Boolean precio;
    private String tipo;

    // clients attributes
    private String cliente;
    private String nombre;
    private String direccion;
    private String atencion;

    // table attributes
    private ArrayList<ItemBudget> servicios;
}
