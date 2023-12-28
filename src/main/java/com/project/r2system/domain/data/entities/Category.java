package com.project.r2system.domain.data.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "category")
public class Category  {
    @Id
    private String id;
    private Integer idN;
    private String nombre;
    private Boolean estado;
    private Date fechaCreacion;
}
