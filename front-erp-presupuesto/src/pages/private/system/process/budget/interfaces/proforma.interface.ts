export interface Proforma {
  idN: string;
  nroOrden: number;
  cliente: string;
  fecha: string;
  aprobadoPor: string;
  fechaAprobacion: string;
  fechaEntrega: string;
  nroFactura: string;
  estado: string;
  observacion: string;
  tipoOrden: string;
  status: boolean;
  creado: string;
  creadoPor: string;
  fechaActualizado: string;
  actualizadoPor: string;
  fechaTermino: string;
  terminadoPor: string;
  bitacora: string;
  validadoPor: string;
}

const proformaEmpty: Proforma = {
  idN: "identificador",
  nroOrden: 123,
  cliente: "Nombre del Cliente",
  fecha: "2023-01-01",
  aprobadoPor: "Aprobador",
  fechaAprobacion: "2023-01-02",
  fechaEntrega: "2023-01-10",
  nroFactura: "F123",
  estado: "Aprobado",
  observacion: "Observaciones adicionales",
  tipoOrden: "Tipo de Orden",
  status: true,
  creado: "2023-01-01",
  creadoPor: "Creador",
  fechaActualizado: "2023-01-03",
  actualizadoPor: "Actualizador",
  fechaTermino: "2023-01-15",
  terminadoPor: "Terminador",
  bitacora: "Registro de eventos",
  validadoPor: "Validador",
};

function getKeys<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

export const keysProforma = getKeys(proformaEmpty);
