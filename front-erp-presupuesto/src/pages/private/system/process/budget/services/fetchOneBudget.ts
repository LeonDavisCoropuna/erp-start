import { AxiosError } from "axios";
import axios from "@/config/axios";
import { Budget } from "../interfaces/BudgetModel";

export const fetchOneBudget = async (
  id: string
): Promise<{
  budget: Budget | null;
  status: number;
}> => {
  try {
    const { data, status } = await axios.get<Budget>("/data/budget-form/" + id);
    const budget: Budget = data;
    return { budget, status };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        const status = error.response.status;
        return { budget: null, status };
      }
    }
    //return { budget: null, status: 500 };
    return {
      budget: {
        idN: "ABC123",
        estado: "En proceso",
        formaPago: "Tarjeta de crédito",
        referencia: "REF456",
        fechaCreacion: new Date(),
        fechaValidez: new Date(),
        nroOrden: 123,
        precio: true,
        tipo: "Presupuesto",
        cliente: "Cliente ABC",
        nombre: "Proyecto XYZ",
        direccion: "Calle Principal 123",
        atencion: "Atención a...",
        servicios: [
          {
            idN: 1,
            codigo: "SERV001",
            descripcion: "Servicio de ejemplo",
            cantidad: 2,
            unidadMedida: "Horas",
            precioUnitario: 50,
            importe: 100,
            pedido: "Pedido de ejemplo",
            costoTotal: 80,
            utilidad: 20,
            total: 100,
            materiales: [
              {
                idN: 1,
                articulo: "Material 1",
                cantidad: 3,
                cantidadEstimada: 5,
                unidadMedida: "Unidades",
                precioUnitario: 10,
                importe: 30,
                factor: 1,
                totalSigv: 30,
              },
            ],
            manoObra: {
              confeccion: [
                {
                  descripcion: "Confección de ejemplo",
                  proceso: "Proceso de ejemplo",
                  cantidadPorHora: 2,
                  nroPersonas: 3,
                  nroHoras: 5,
                  importe: 60,
                },
              ],
              instalacion: [],
              factor: 1,
              totalSigv: 60,
            },
            serviciosTerceros: [
              {
                servicioBrindado: "Servicio tercero 1",
                proveedor: "Proveedor A",
                importe: 25,
                factor: 1,
                total: 25,
              },
            ],
            viaticos: [
              {
                costo: 124,
                descripcion: "Costo de viaticos",
                factor: 1,
                noDias: 12,
                noPersonas: 4,
                total: 12,
                importe: 60,
              },
            ],
            impresiones: [
              {
                campania: "Campania",
                cantidad: 12,
                cantidadTotal: 8,
                impresora: "",
                material: "M4",
                factor: 1,
                importe: 60,
                metrosHorizontal: 4.5,
                metrosVertical: 4.5,
                minimo: 3,
                precioM2: 55,
                totalSigv: 12
              },
            ],
          },
        ],
      },
      status: 200,
    };
  }
};
