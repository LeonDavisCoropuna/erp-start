package com.project.r2system.domain.data.payloads.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ClientResponse {

    private Integer idN;
    private String nombre;
    private Integer dniRuc;
    private String direccion;
    private String telefono;
    private String tipoCliente;
    private String estado;

}
