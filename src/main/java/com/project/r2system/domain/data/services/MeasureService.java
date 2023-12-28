package com.project.r2system.domain.data.services;

import com.project.r2system.domain.data.entities.Measure;
import com.project.r2system.domain.data.MeasureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MeasureService {
    @Autowired
    private MeasureRepository MeasureServiceApi;

    public List<Measure> allMeasures() {
        return MeasureServiceApi.findAll();
    }

    public Measure MeasureById(Integer idN) {
        return MeasureServiceApi.findByIdN(idN);
    }

    public Measure MeasureByNombre(String name) {
        return MeasureServiceApi.findByNombre(name);
    }


    public String createMeasure(Measure Measure) {
        try {
            MeasureServiceApi.save(Measure);
            return "OK";
        } catch (Exception e) {
            return e.getCause().toString();
        }
    }
    /*
    public String updateMeasure(Integer idN, Measure updatedMeasure) {
        try {
            MeasureServiceApi.save(updatedMeasure);
            return "OK";
        }catch (Exception e) {
            return e.getCause().toString());
        }
    }*/
}
