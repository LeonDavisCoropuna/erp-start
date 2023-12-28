package com.project.r2system.domain.budgetSystem.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
//@Document(collection = "clients")
public class ItemBudgetManpower {
    private ArrayList<ItemBudgetManpowerConfection> confeccion;
    private ArrayList<ItemBudgetManpowerInstallation> instalacion;
    private Float factor;
    private Float totalSigv;
}
