package com.project.r2system.api.commons;

import com.project.r2system.domain.data.entities.Workpower;
import com.project.r2system.domain.data.payloads.responses.WorkpowerResponse;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

public class WorkpowerMapping {
    @Autowired
    private ModelMapper modelMapper;
    public WorkpowerResponse maptoResponse(Workpower workpower){
        WorkpowerResponse workpowerResponse = modelMapper.map(workpower,WorkpowerResponse.class);
        workpowerResponse.setEstado(workpower.getEstado()?"Activo":"Inactivo");
        return workpowerResponse;
    }
}
