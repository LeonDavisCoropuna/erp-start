package com.project.r2system.domain.data.payloads;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ArticleResponse {
    private Integer idN;
    private String nombre;
    private String categoria;
    private String tipo;
    private String medida;
    private Float precio;
    private Float impuesto;
    private Float stock;
    private Integer stockMin;
    private Integer stockMax;
    private String estado;
}