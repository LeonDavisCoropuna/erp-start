package com.project.r2system.domain.data.payloads.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WorkpowerRequest {
    private Integer idN;
    private String nombre;
    private Float costo;
    private String estado;
}