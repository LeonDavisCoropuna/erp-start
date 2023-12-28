package com.project.r2system.domain.data.services;


import com.project.r2system.domain.data.ClientRepository;
import com.project.r2system.domain.data.entities.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ClientService{

    @Autowired
    private ClientRepository clientRepository;

    public List<Client> allClients()
    {
        
        return clientRepository.findAll();
        
    }

    public Client clientById(Integer idN)
    {
        try {
            return clientRepository.findByIdN(idN).orElse(null);
        } catch (NoSuchElementException e) {
            return null; // Opcionalmente, puedes lanzar una excepción personalizada o registrar un error aquí.
        }
    }

    public String createArticle(Client client) {
        try {
            clientRepository.save(client);
            return "OK";
        } catch (Exception e) {
            return e.getCause().toString();
        }
    }

    public String updateClient(Integer idN, Client updatedClient) {
        try {
            // Verificamos si el cliente con el ID especificado existe
            Client existingClient = clientRepository.findByIdN(idN).orElse(null);

            if (existingClient == null) {
                return "NOT_FOUND";
            }

            // Copiamos los datos actualizados al cliente existente
            existingClient.setIdN(updatedClient.getIdN());
            existingClient.setNombre(updatedClient.getNombre());
            existingClient.setDniRuc(updatedClient.getDniRuc());
            existingClient.setDireccion(updatedClient.getDireccion());
            existingClient.setTelefono(updatedClient.getTelefono());
            existingClient.setTipoCliente(updatedClient.getTipoCliente());
            existingClient.setEstado(updatedClient.getEstado());

            // Guardamos el cliente actualizado en la base de datos
            clientRepository.save(existingClient);

            return "OK";
        } catch (Exception e) {
            return e.getCause().toString();
        }
    }

    public String deleteClientById(Integer idN) {
        try {
            Client existingClient = clientRepository.findByIdN(idN).orElse(null);

            if (existingClient == null) {
                return "Cliente no encontrado";
            }

            // Eliminamos el cliente de la base de datos
            clientRepository.delete(existingClient);

            return "OK";
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}