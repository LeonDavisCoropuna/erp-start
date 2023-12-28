package com.project.r2system.domain.data.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "article")
public class Article {
    @Id
    private String id;
    private Integer idN;
    private String nombre;
    private Integer categoria;
    private EType tipo;
    private Integer medida;
    private Float precio;
    private Float impuesto;
    private Float stock;
    private Integer stockMin;
    private Integer stockMax;
    private Boolean estado;
}
