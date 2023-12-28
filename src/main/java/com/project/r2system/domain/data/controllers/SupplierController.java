package com.project.r2system.domain.data.controllers;

import com.project.r2system.domain.data.entities.Supplier;
import com.project.r2system.domain.data.payloads.responses.SupplierResponse;
import com.project.r2system.domain.data.services.SupplierService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/data/suppliers")
public class SupplierController {

    @Autowired
    private SupplierService supplierService;
    @Autowired
    private ModelMapper modelMapper;

    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<?>> getAllSuppliers()
    {
        List<Supplier> suppliers = supplierService.allSupplier();
        if ( suppliers.isEmpty() ) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        List<SupplierResponse> allSuppliersList = new ArrayList<>();

        for (Supplier supplier : suppliers) {
            SupplierResponse supplierResponse = modelMapper.map(supplier, SupplierResponse.class);
            //SupplierResponse
            allSuppliersList.add(supplierResponse);
        }
        return new ResponseEntity<>(allSuppliersList, HttpStatus.OK);
    }

    @GetMapping("/{idN}")
    public ResponseEntity<?> getClientById(@PathVariable Integer idN) {
        Supplier supplier = supplierService.supplierById(idN);

        if (supplier != null) {

            SupplierResponse supplierResponse = modelMapper.map(supplier, SupplierResponse.class);
            //clientResponse.setEstado(.getEstado() ? "Activo" : "Inactivo");
            return new ResponseEntity<>(supplierResponse, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cliente no encontrado",HttpStatus.NOT_FOUND);
        }
    }



    @PostMapping("/create")
    public ResponseEntity<?> createClient(@RequestBody Supplier supplier) {
        System.out.println(supplier);
        String state = supplierService.createSupplier(supplier);
        if(state != "OK"){
            return new ResponseEntity<String>(state, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>("Cliente creado con exito",HttpStatus.CREATED);
    }
/*
    @PutMapping("/{idN}")
    public ResponseEntity<?> updateClient(@PathVariable Integer idN, @RequestBody SupplierResponse updatedSupplierResponse) {
        try {
            // Primero, verifica si el cliente con el ID especificado existe
            Supplier existingSupplier = supplierService.supplierById(idN);

            if (existingClient == null) {
                return new ResponseEntity<>("Cliente no econtrado",HttpStatus.NOT_FOUND);
            }

            Client updatedClient = modelMapper.map(updatedClientResponse, Client.class);

            updatedClient.setId(existingClient.getId());

            String result = clientService.updateClient(idN, updatedClient);

            if ("OK".equals(result)) {
                return new ResponseEntity<>("Cliente actualizado con éxito", HttpStatus.OK);
            } else {
                return new ResponseEntity<>(result, HttpStatus.INTERNAL_SERVER_ERROR);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{idN}")
    public ResponseEntity<String> deleteClientById(@PathVariable Integer idN) {
        try {
            // Verificamos si el cliente con el ID especificado existe
            Client existingClient = clientService.clientById(idN);

            if (existingClient == null) {
                return new ResponseEntity<>("Cliente no encontrado", HttpStatus.NOT_FOUND);
            }

            // Llamamos al método deleteClientById del servicio para eliminar el cliente
            String result = clientService.deleteClientById(idN);

            if ("OK".equals(result)) {
                return new ResponseEntity<>("Cliente eliminado con éxito", HttpStatus.OK);
            } else {
                return new ResponseEntity<>(result, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }*/
}
