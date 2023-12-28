package com.project.r2system.domain.budgetSystem.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "budget")
public class Budget {
    @Id
    private String id;

    //private String numeroPresupuesto;
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

    // additional data
    private Date tiempoEntrega;
    private String garantia;
    private String tasa;
    private String moneda;
    private Float tasaCambio;
    private Float subTotal;
    private Float impuesto;
    private Float totalSoles;
    private Float totalDolares;


}
