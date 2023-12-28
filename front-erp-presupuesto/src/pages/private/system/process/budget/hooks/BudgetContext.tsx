import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { Budget, EmptyBuget, Servicio } from "../interfaces/BudgetModel";

// Define el tipo de tu contexto
export type BudgetContextType = {
  budget: Budget;
  setBudget: Dispatch<SetStateAction<Budget>>;
  updateService: (index: number, field: keyof Servicio, value: any) => void; // <-- Cambiar aquí
  addService: () => void;
  deleteService: (index: number) => void;
};

// Crea el contexto con un valor inicial de undefined
export const BudgetContext = createContext<BudgetContextType | null>(null);

export const BudgetProvider = ({ children }: { children: React.ReactNode }) => {
  const [budget, setBudget] = useState<Budget>(EmptyBuget);
  const addService = () => {
    const newService: Servicio = {
      idN: budget.servicios.length + 1,
      codigo: "",
      descripcion: "",
      cantidad: 0,
      unidadMedida: "",
      precioUnitario: 0,
      importe: 0,

      pedido: "",
      costoTotal: 0,
      utilidad: 0,
      total: 0,
      materiales: [
        {
          idN: 0,
          articulo: "",
          cantidad: 0,
          cantidadEstimada: 0,
          unidadMedida: "",
          precioUnitario: 0,
          importe: 0,
          factor: 1,
          totalSigv: 0,
        },
      ],
      manoObra: {
        confeccion: [
          {
            descripcion: "",
            proceso: "",
            cantidadPorHora: 0,
            nroHoras: 0,
            nroPersonas: 0,
            importe: 0,
          },
        ],
        instalacion: [
          {
            descripcion: "",
            proceso: "",
            cantidadPorHora: 0,
            nroHoras: 0,
            nroPersonas: 0,
            importe: 0,
          },
        ],
        factor: 2.1,
        totalSigv: 0,
      },
      serviciosTerceros: [
        {
          servicioBrindado: "",
          proveedor: "",
          importe: 0,
          factor: 1,
          total: 0,
        },
      ],
      viaticos: [
        {
          descripcion: "",
          costo: 0,
          noPersonas: 0,
          noDias: 0,
          importe: 0,
          factor: 1,
          total: 0,
        },
      ],
      impresiones: [
        {
          campania: "",
          material: "",
          impresora: "",
          metrosHorizontal: 0,
          metrosVertical: 0,
          cantidad: 0,
          cantidadTotal: 0,
          precioM2: 0,
          importe: 0,
          minimo: 0,
          factor: 1,
          totalSigv: 0,
        },
      ],
    };
    const updateServices = [...budget.servicios, newService];
    setBudget({ ...budget, servicios: updateServices });
  };
  const deleteService = (index: number) => {
    const servicioCopia = [...budget.servicios];
    servicioCopia.splice(index, 1);

    const servicios = servicioCopia.map((servicios, index) => ({
      ...servicios,
      idN: index + 1,
    }));
    setBudget((prevState) => ({
      ...prevState, // Copiamos todas las propiedades del estado anterior
      servicios: servicios,
    }));
  };
  const updateService = (index: number, field: keyof Servicio, value: any) => {
    const updatedServicio = [...budget.servicios];
    updatedServicio[index] = {
      ...updatedServicio[index],
      [field]: value,
    };
    setBudget({
      ...budget,
      servicios: updatedServicio,
    });
  };
  return (
    <BudgetContext.Provider
      value={{ budget, setBudget, addService, updateService, deleteService }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
