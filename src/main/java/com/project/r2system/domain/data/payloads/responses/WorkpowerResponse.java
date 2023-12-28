package com.project.r2system.domain.data.payloads.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WorkpowerResponse {
    private Integer idN;
    private String nombre;
    private Float costo;
    private String estado;
    private Date fechaCreacion;
    private Date fechaActualizacion;
    private String usuarioCreacion;
    private String usuarioActualizacion;
}