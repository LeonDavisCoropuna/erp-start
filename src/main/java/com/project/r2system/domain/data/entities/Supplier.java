package com.project.r2system.domain.data.entities;

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
@Document(collection = "suppliers")
public class Supplier {
    @Id
    private ObjectId id;

    protected Integer idN;
    protected String nombre;
    protected String nombreComercial;
    protected Integer dniRuc;
    protected String direccion;
    protected Integer telefono;
    protected Integer celular;
    protected String banco;
    protected String cuentaBanco;

    protected String ctaDetrac;
    protected String ctaInter;

    protected String vendedor;
    protected String glosario;

    protected String email;
    protected String webSite;
    protected Boolean estado;

    protected Date creado;
    protected String creadoPor;
    protected Date actualizado;
    protected String actualizadoPor;
}
