export interface Proforma {
  idN: string;
  nroOrden: number;
  cliente: string;
  fecha: Date;
  aprobadoPor: string;
  fechaAprobacion: Date;
  fechaEntrega: Date;
  nroFactura: string;
  estado: string;
  observacion: string;
  tipoOrden: string;
  status: boolean;
  creado: Date;
  creadoPor: string;
  fechaActualizado: Date;
  actualizadoPor: string;
  fechaTermino: Date;
  terminadoPor: string;
  bitacora: string;
  validadoPor: string;
}

export const proformaEmpty: Proforma = {
  idN: "",
  nroOrden: 0,
  cliente: "",
  fecha: new Date(),
  aprobadoPor: "",
  fechaAprobacion: new Date(),
  fechaEntrega: new Date(),
  nroFactura: "",
  estado: "",
  observacion: "",
  tipoOrden: "",
  status: false,
  creado: new Date(),
  creadoPor: "",
  fechaActualizado: new Date(),
  actualizadoPor: "",
  fechaTermino: new Date(),
  terminadoPor: "",
  bitacora: "",
  validadoPor: "",
};

function getKeys<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

export const keysProforma = getKeys(proformaEmpty);
