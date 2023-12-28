package com.project.r2system.domain.budgetSystem.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "budgetform")
public class BudgetForm {
    @Id
    private ObjectId id;

    private String idN; //nro PPTO de budget
    private Integer nroOrden;
    private String cliente;
    private Date fecha;
    private String aprobadoPor;
    private Date fechaAprobacion;
    private Date fechaEntrega;
    private String nroFactura;
    private String estado;  //en curso, aceptado, anulado
    private String observacion;
    private String tipoOrden;
    private Boolean status; // terminado , en proceso
    private Date creado;
    private String creadoPor;
    private Date fechaActualizado;
    private String actualizadoPor;
    private Date fechaTermino;  //fecha real del termino del proyecto
    private String terminadoPor;
    private String bitacora;
    private String validadoPor;

}
