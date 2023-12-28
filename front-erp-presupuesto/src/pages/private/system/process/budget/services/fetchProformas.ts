import { AxiosError } from "axios";
import axios from "@/config/axios";
import { Proforma } from "../interfaces/proforma.interface";

export const fetchProformas = async (): Promise<{
  proformas: Proforma[];
  status: number;
}> => {
  try {
    const res = await axios.get<Proforma[]>("/data/budget/all");
    const proformas: Proforma[] = res.data;
    return { proformas, status: res.status };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        const status = error.response.status;
        return { proformas: [], status };
      }
    }
    //return { articles: [], status: 500 };
    return {
      proformas: [
        {
          idN: "P001",
          nroOrden: 1,
          cliente: "Cliente A",
          fecha: "2023-01-01",
          aprobadoPor: "Aprobador 1",
          fechaAprobacion: "2023-01-02",
          fechaEntrega: "2023-01-10",
          nroFactura: "F001",
          estado: "Aceptado",
          observacion: "Observación de la proforma 1",
          tipoOrden: "Tipo 1",
          status: true,
          creado: "2023-01-01",
          creadoPor: "Usuario 1",
          fechaActualizado: "2023-01-05",
          actualizadoPor: "Usuario 2",
          fechaTermino: "2023-01-15",
          terminadoPor: "Usuario 3",
          bitacora: "Bitácora de la proforma 1",
          validadoPor: "Validador 1",
        },
        {
          idN: "P002",
          nroOrden: 2,
          cliente: "Cliente B",
          fecha: "2023-02-01",
          aprobadoPor: "Aprobador 2",
          fechaAprobacion: "2023-02-02",
          fechaEntrega: "2023-02-10",
          nroFactura: "F002",
          estado: "En curso",
          observacion: "Observación de la proforma 2",
          tipoOrden: "Tipo 2",
          status: false,
          creado: "2023-02-01",
          creadoPor: "Usuario 2",
          fechaActualizado: "2023-02-05",
          actualizadoPor: "Usuario 3",
          fechaTermino: "2023-02-15",
          terminadoPor: "Usuario 4",
          bitacora: "Bitácora de la proforma 2",
          validadoPor: "Validador 2",
        },
        {
          idN: "P003",
          nroOrden: 3,
          cliente: "Cliente C",
          fecha: "2023-03-01",
          aprobadoPor: "Aprobador 3",
          fechaAprobacion: "2023-03-02",
          fechaEntrega: "2023-03-10",
          nroFactura: "F003",
          estado: "Anulado",
          observacion: "Observación de la proforma 3",
          tipoOrden: "Tipo 3",
          status: true,
          creado: "2023-03-01",
          creadoPor: "Usuario 3",
          fechaActualizado: "2023-03-05",
          actualizadoPor: "Usuario 4",
          fechaTermino: "2023-03-15",
          terminadoPor: "Usuario 5",
          bitacora: "Bitácora de la proforma 3",
          validadoPor: "Validador 3",
        },
      ],
      status: 200,
    };
  }
};
