package com.project.r2system.domain.data.payloads;

import com.project.r2system.domain.data.entities.Article;
import com.project.r2system.domain.data.entities.Client;
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
public class ClientResponse {

    private Integer idN;
    private String nombre;
    private Integer dniRuc;
    private String direccion;
    private String telefono;
    private String tipoCliente;
    private String estado;

}
