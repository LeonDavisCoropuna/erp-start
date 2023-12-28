package com.project.r2system.domain.budgetSystem.entities;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
//@Document(collection = "clients")
public class ItemBudget {


    private Integer idN;
    private String codigo;
    private String descripcion;
    private Integer cantidad;
    private String unidadMedida;
    private Float precioUnitario;
    private String importe;

    // nav part
    private String pedido;  //esto es la concatenacion de codigo con " - SERVICIO"
    private Float costoTotal;
    private Float utilidad;
    private Float total;
    // budgets
    private ItemBudgetManpower manoObra;
    private ArrayList<ItemBudgetMaterial> materiales;
    private ArrayList<ItemBudgetOtherExpenses> viaticos;
    private ArrayList<ItemBudgetThirdPartyServices> serviciosTerceros;
    private ArrayList<ItemBudgetPrinter> impresiones;

}
