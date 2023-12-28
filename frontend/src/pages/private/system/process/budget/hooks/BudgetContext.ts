import React, { createContext, useState } from "react";
import { Budget, EmptyBuget, Servicio } from "../interfaces/BudgetModel";

// Define el tipo de tu contexto
type BudgetContextType = {
  budget: Budget;
  saveService: (idService: number) => void;
  updateService: (service: Servicio) => void;
  updateBudget: () => void;
};

// Crea el contexto con un valor inicial de undefined
const BudgetContext = createContext<BudgetContextType | null>(null);

export const BudgetProvider = ({ children }: { children: React.ReactNode }) => {
  const [budget, setBudget] = useState<Budget>(EmptyBuget);
  const saveService = (service: Servicio) => {
    const newService: Servicio = {
      idN: service.idN,
      codigo: service.codigo,
      descripcion: service.descripcion,
      cantidad: service.cantidad,
      unidadMedida: service.unidadMedida,
      precioUnitario: service.precioUnitario,
      importe: service.importe,
      /** nav */
      pedido: service.pedido,
      costoTotal: service.costoTotal,
      utilidad: service.utilidad,
      total: service.total,
      materiales: service.materiales,
      manoObra: service.manoObra,
      serviciosTerceros: service.serviciosTerceros,
      impresiones: service.impresiones,
      viaticos: service.viaticos,
    };
    const updateServices = [...budget.servicios, newService];
    setBudget({ ...budget, servicios: updateServices });
  };
  return (
    <BudgetContext.Provider value={{ budget, setBudget, saveService }}>
      {children}
    </BudgetContext.Provider>
  );
};
