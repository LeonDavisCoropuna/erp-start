package com.project.r2system.domain.budgetSystem.entities;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
//@Document(collection = "clients")
public class ItemBudgetOtherExpenses { // viaticos
    private String descripcion;
    private Float costo;
    private Integer nroPersonas;
    private Integer nroDias;
    private Float importe;

    private Float factor;
    private Float totalSigv;
}
