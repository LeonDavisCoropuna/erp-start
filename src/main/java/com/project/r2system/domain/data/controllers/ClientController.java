package com.project.r2system.domain.data.controllers;

import com.project.r2system.domain.data.entities.Client;
import com.project.r2system.domain.data.payloads.responses.ClientResponse;
import com.project.r2system.domain.data.services.ClientService;
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
@RequestMapping("/data/clients")
public class ClientController {
    @Autowired
    private ClientService clientService;
    @Autowired
    private ModelMapper modelMapper;
    
    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<ClientResponse>> getAllClients()
    {
        List<Client> clients = clientService.allClients();
        if (clients.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        List<ClientResponse> allClientsList = new ArrayList<>();

        for (Client client : clients) {
            ClientResponse clientResponse = modelMapper.map(client, ClientResponse.class);
            clientResponse.setEstado(client.getEstado() ? "Activo" : "Inactivo");
            allClientsList.add(clientResponse);
        }
        return new ResponseEntity<>(allClientsList, HttpStatus.OK);
    }

    @GetMapping("/{idN}")
    public ResponseEntity<?> getClientById(@PathVariable Integer idN) {
        Client client = clientService.clientById(idN);

        if (client != null) {

            ClientResponse clientResponse = modelMapper.map(client, ClientResponse.class);
            clientResponse.setEstado(client.getEstado() ? "Activo" : "Inactivo");
            return new ResponseEntity<>(clientResponse, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cliente no encontrado",HttpStatus.NOT_FOUND);
        }
    }



    @PostMapping("/create")
    public ResponseEntity<?> createClient(@RequestBody Client client) {
        System.out.println(client);
        String state = clientService.createArticle(client);
        if(state != "OK"){
            return new ResponseEntity<String>(state, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>("Cliente creado con exito",HttpStatus.CREATED);
    }

    @PutMapping("/{idN}")
    public ResponseEntity<?> updateClient(@PathVariable Integer idN, @RequestBody ClientResponse updatedClientResponse) {
        try {
            // Primero, verifica si el cliente con el ID especificado existe
            Client existingClient = clientService.clientById(idN);

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
    }


}
