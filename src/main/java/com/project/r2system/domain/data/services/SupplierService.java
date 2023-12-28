package com.project.r2system.domain.data.services;


import com.project.r2system.domain.data.SupplierRepository;
import com.project.r2system.domain.data.entities.Supplier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class SupplierService {
    @Autowired
    private SupplierRepository supplierRepository;

    public List<Supplier> allSupplier()
    {
        return supplierRepository.findAll();
    }

    public Supplier supplierById(Integer idN)
    {
        try {
            return supplierRepository.findByIdN(idN).orElse(null);
        } catch (NoSuchElementException e) {
            return null; // Opcionalmente, puedes lanzar una excepción personalizada o registrar un error aquí.
        }
    }

    public String createSupplier(Supplier supplier) {
        try {
            supplierRepository.save(supplier);
            return "OK";
        } catch (Exception e) {
            return e.getCause().toString();
        }
    }

    public String updateSupplier(Integer idN, Supplier updatedSupplier) {

        try {
            // Verificamos si el cliente con el ID especificado existe
            Supplier existingSupplier = supplierRepository.findByIdN(idN).orElse(null);

            if (existingSupplier == null) {
                return "NOT_FOUND";
            }

            // Copiamos los datos actualizados al cliente existente
                existingSupplier.setIdN(updatedSupplier.getIdN());
                existingSupplier.setNombre(updatedSupplier.getNombre());
                existingSupplier.setNombreComercial(updatedSupplier.getNombreComercial());
                existingSupplier.setDniRuc(updatedSupplier.getDniRuc());
                existingSupplier.setDireccion(updatedSupplier.getDireccion());
                existingSupplier.setTelefono(updatedSupplier.getTelefono());
                existingSupplier.setCelular(updatedSupplier.getCelular());
                existingSupplier.setBanco(updatedSupplier.getBanco());
                existingSupplier.setCuentaBanco(updatedSupplier.getCuentaBanco());
                existingSupplier.setCtaDetrac(updatedSupplier.getCtaDetrac());
                existingSupplier.setCtaInter(updatedSupplier.getCtaInter());
                existingSupplier.setVendedor(updatedSupplier.getVendedor());
                existingSupplier.setGlosario(updatedSupplier.getGlosario());
                existingSupplier.setEmail(updatedSupplier.getEmail());
                existingSupplier.setWebSite(updatedSupplier.getWebSite());
                existingSupplier.setEstado(updatedSupplier.getEstado());
                existingSupplier.setCreado(updatedSupplier.getCreado());
                existingSupplier.setCreadoPor(updatedSupplier.getCreadoPor());
                existingSupplier.setActualizado(new Date()); // Actualizamos la fecha de actualización
                existingSupplier.setActualizadoPor(updatedSupplier.getActualizadoPor());

                // Guardamos el proveedor actualizado en la base de datos
                supplierRepository.save(existingSupplier);
                return "OK";
        } catch (Exception e) {
            return e.getCause().toString();
        }
    }

    public String deleteSupplierById(Integer idN) {
        try {
            Supplier existingSupplier = supplierRepository.findByIdN(idN).orElse(null);

            if (existingSupplier == null) {
                return "Cliente no encontrado";
            }

            // Eliminamos el cliente de la base de datos
            supplierRepository.delete(existingSupplier);

            return "OK";
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}
