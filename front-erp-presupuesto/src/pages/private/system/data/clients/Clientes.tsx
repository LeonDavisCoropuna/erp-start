import { useEffect, useRef, useState } from "react";
import Table from "../../../../../components/Table";
import { Client, ClientEmpty } from "./client.model";
import axios from "@/config/axiosConfig"
export default function Clientes() {
  /*
  const clientsData: Client[] = [
    {
      idNum: 1231,
      name: "asdasd",
      dniRuc: "12312312",
      address: "daaaaaaaa",
      telephone: 12312312,
      clientType: "string",
      state: "activo",
    },
    {
      idNum: 6521,
      name: "aaaa",
      dniRuc: "12312312",
      address: "daaaaaaaa",
      telephone: 12312312,
      clientType: "string",
      state: "inactivo",
    },
  ];*/

  const ref = useRef(true);
  const [info, setInfo] = useState<Client[]>(ClientEmpty);
  
  useEffect(() => {
    if (ref.current) {
      const getInfoClients = async () => {
        try {
          const { data } = await axios.get<Client[]>("/data/clients/all");
          setInfo(data);
          console.log(data)
        } catch (error) {
          console.error("Error al obtener los clientes:", error);
        }
      };

      getInfoClients(); // Llama a la función para obtener datos de los clientes
    }

    return () => {
      ref.current = false;
    };
  }, []);
  
  const clientsKeys = [
    "idN",
    "nombre",
    "dniRuc",
    "direccion",
    "telefono",
    "tipoCliente",
    "estado",
  ];
  const route = "/system/datos/clientes/";
  const routeBack = "/data/v1/clients/";
  return (
    <div className=" bg-[#283355] overflow-auto h-[30em]">
      {ref.current === false ? (
        <Table columns={clientsKeys} info={info} route={route} routeBack={routeBack} />
      ) : null}
    </div>
  );
}
