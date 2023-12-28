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
public class ItemBudgetMaterial {
    private String idN;
    private String articulo;
    private Integer cantidad;
    private Integer cantidadEstimada;
    private String unidadMedida;
    private Float precioUnitario;
    private Float importe;
    private Float factor;
    private Float totalSigv;

}
