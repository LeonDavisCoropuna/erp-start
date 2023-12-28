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
public class ItemBudgetPrinter {
    private String campania;
    private String material;
    private String impresora;
    private Float metrosHorizontal;
    private Float metrosVertical;
    private Integer cantidad;
    private Integer cantidadTotal;
    private Float precioM2;
    private Float importe;
    private Integer minimo;
    private Float factor;
    private Float totalSigv;

}
