import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Client } from "./client.model";
import axios from "@/config/axiosConfig";
import { isNumeric } from "@/utils/decodeToken.utils";

const ClienteDetalle = () => {
  const { id } = useParams<{ id: string }>();
  const [client, setClient] = useState<Client>(Client);
  const navigate = useNavigate();
  useEffect(() => {
    if (id && isNumeric(id)) {
      const fetchClient = async () => {
        try {
          const res = await axios.get<Client>(`/data/v1/clients/${id}`);
          setClient(res.data);
        } catch (error) {
          console.error("Error fetching client:", error);
        }
      };

      fetchClient();
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setClient({
      ...client,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeEstado = (e: number) => {
    setClient({
      ...client,
      estado: e ? true : false,
    });
  };
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      if (id && isNumeric(id)) {
        await axios.put<Client>(`/data/v1/clients/${id}`, client);
      } else {
        await axios.post<Client>(`/data/v1/clients/create`, client);
      }
      navigate("/system/datos/clientes");
      alert("Envío correcto");
    } catch (error) {
      alert("Ocurrió un error");
    }
  };
  return (
    <div className="items-start text-[0.9em] flex flex-col">
      <div className="flex-[0.2]">
        <form className=" mt-5 p-2 ml-5 border-2 rounded-md flex flex-col flex-[0.3] gap-y-2">
          <div className=" hover:bg-slate-200 hover:rounded-md flex justify-between">
            <span>ID: </span>
            <div className="border-b-2 border-blue-800">{client.idN}</div>
          </div>
          <label className=" hover:bg-slate-200 hover:rounded-md flex justify-between gap-2">
            <span>Name: </span>
            <span className="border-b-2 border-blue-600">
              <input
                className="focus:border-none border-none bg-transparent"
                value={client.nombre}
                name="nombre"
                onChange={handleChange}
              />
            </span>
          </label>
          <label className=" hover:bg-slate-200 hover:rounded-md flex justify-between">
            <span>DNI/RUC: </span>
            <span className="border-b-2 border-blue-600">
              <input
                className="focus:border-none border-none bg-transparent"
                value={client.dniRuc}
                name="dniRuc"
                onChange={handleChange}
              />
            </span>
          </label>
          <label className=" hover:bg-slate-200 hover:rounded-md flex justify-between">
            <span>Address: </span>
            <span className="border-b-2 border-blue-600">
              <input
                className="focus:border-none border-none bg-transparent"
                value={client.direccion}
                name="direccion"
                onChange={handleChange}
              />
            </span>
          </label>
          <label className=" hover:bg-slate-200 hover:rounded-md flex justify-between">
            <div>Telephone: </div>
            <div className="border-b-2 border-blue-600">
              <input
                className="focus:border-none border-none bg-transparent"
                value={client.telefono}
                name="telefono"
                onChange={handleChange}
              />
            </div>
          </label>
          <label className=" hover:bg-slate-200 hover:rounded-md flex justify-between">
            <span>Client Type: </span>
            <span className="border-b-2 border-blue-600">
              <input
                className="focus:border-none border-none bg-transparent "
                value={client.tipoCliente}
                name="tipoCliente"
                onChange={handleChange}
              />
            </span>
          </label>
          <label className="hover:bg-slate-200 hover:rounded-md flex justify-between">
            <span>State: </span>
            <select
              value={client.estado ? "Activo" : "Inactivo"}
              onChange={(e) =>
                handleChangeEstado(e.target.value === "Activo" ? 1 : 0)
              } // Retorna 1 si es "Activo", 0 si es "Inactivo"
              name="estado"
            >
              <option>Activo</option>
              <option>Inactivo</option>
            </select>
          </label>
          <div className="flex-[0.8]">
            <button
              type="submit"
              className="bg-blue-500 rounded-md hover:bg-slate-400 py-2 px-5 mt-3"
              onClick={handleSubmit}
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClienteDetalle;
