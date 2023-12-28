package com.project.r2system.domain.data.payloads.responses;

import com.project.r2system.domain.data.entities.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CategoryResponse {
    private Integer idN;
    private String nombre;
    private String estado;
    private Date fechaCreacion;
}
