package com.project.r2system.domain.data.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "clients")
public class Client {
    @Id
    private ObjectId id;

    private Integer idN;
    private String nombre;
    private Integer dniRuc;
    private String direccion;
    private String telefono;
    private String tipoCliente;
    private Boolean estado;

}
