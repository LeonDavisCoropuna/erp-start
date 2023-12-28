package com.project.r2system.domain.data.payloads.responses;

import com.project.r2system.domain.data.entities.Article;
import com.project.r2system.domain.data.services.CategoryService;
import com.project.r2system.domain.data.services.MeasureService;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

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