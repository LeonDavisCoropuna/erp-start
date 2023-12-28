package com.project.r2system.domain.data.services;

import com.project.r2system.api.commons.WorkpowerMapping;
import com.project.r2system.domain.data.entities.Workpower;
import com.project.r2system.domain.data.WorkpowerRepository;
import com.project.r2system.domain.data.payloads.responses.WorkpowerResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WorkpowerService {
    @Autowired
    private WorkpowerRepository workpowerRepository;
    @Autowired
    private WorkpowerMapping workpowerMapping;

    public List<Workpower> allWorkpowers() {
        return workpowerRepository.findAll();
    }

    public Workpower workpowerById(Integer idN) {
        return workpowerRepository.findByIdN(idN).orElse(null);
    }

    public String createWorkpower(Workpower workpower) {
        try {
            workpowerRepository.save(workpower);
            return "OK";
        } catch (Exception e) {
            return e.getCause().toString();
        }
    }/*
    public String updateWorkpower(Integer idN, WorkpowerResponse workpowerResponse) {
        try {
            Optional<Workpower> workpowerData = workpowerRepository.findByIdN(idN);
            if(workpowerData.isPresent()){
                Workpower _workpower = workpowerData.get();
                workpowerMapping.updateFromRequest(workpowerResponse,_workpower);
                workpowerRepository.save(_workpower);
                return "OK";
            }
            return "NOT_FOUND";
        }catch (Exception e) {
            return e.getCause().toString();
        }
    }*/
    public void deleteByIdN(Integer idN){
        workpowerRepository.deleteByIdN(idN);
    }
}
