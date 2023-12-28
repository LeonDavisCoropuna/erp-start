package com.project.r2system.domain.budgetSystem.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
//@Document(collection = "clients")
public class ItemBudgetManpowerConfection {
    private String descripcion;
    private String proceso;
    private Integer cantidadPorHora;
    private Integer nroPersonas;
    private Integer nroHoras;
    private Float importe;
}
