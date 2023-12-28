export interface Budget {
  idN: string;
  estado: string;
  formaPago: string;
  referencia: string;
  fechaCreacion: Date;
  fechaValidez: Date;
  nroOrden: number | null;
  precio: boolean;
  tipo: string;

  cliente: string;
  nombre: string;
  direccion: string;
  atencion: string;
  servicios: Servicio[];
}

export interface Servicio {
  idN: number;
  codigo: string;
  descripcion: string;
  cantidad: number;
  unidadMedida: string;
  precioUnitario: number;
  importe: number;

  pedido: string;
  //cantidad: number;
  costoTotal: number;
  utilidad: number;
  total: number;

  materiales: Material[];
  manoObra: ManoObra;
  serviciosTerceros: ServTerceros[];
  viaticos: Viaticos[];
  impresiones: Impresiones[];
}
export interface Material {
  idN: number;
  articulo: string;
  cantidad: number;
  cantidadEstimada: number;
  unidadMedida: string;
  precioUnitario: number;
  importe: number;
  factor: number;
  totalSigv: number;
}

export const EmptyMaterial: Material[] = [
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
];
export interface ManoObraOpt {
  descripcion: string;
  proceso: string;
  cantidadPorHora: number;
  nroPersonas: number;
  nroHoras: number;
  importe: number;
}
export interface ManoObra {
  confeccion: ManoObraOpt[];
  instalacion: ManoObraOpt[];
  factor: number;
  totalSigv: number;
}

export interface ServTerceros {
  servicioBrindado: string;
  proveedor: string;
  importe: number;
  factor: number;
  total: number;
}

export const EmptyBuget: Budget = {
    idN: "-",
    nroOrden: null,
    estado: "",
    formaPago: "",
    referencia: "",
    fechaCreacion: new Date(),
    fechaValidez: new Date(),
    precio: true,
    tipo: "",
    cliente: "",
    nombre: "",
    direccion: "",
    atencion: "",
    servicios: [
      {
        idN: 1,
        codigo: "",
        descripcion: "",
        cantidad: 0,
        unidadMedida: "",
        precioUnitario: 0,
        importe: 0,
        /** nav */
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
      },
    ],
  };
  

export const EmptyServTerceros: ServTerceros[] = [
  {
    servicioBrindado: "",
    proveedor: "",
    importe: 0,
    factor: 1,
    total: 0,
  },
];

export interface Viaticos {
  descripcion: string;
  costo: number;
  noPersonas: number;
  noDias: number;
  importe: number;
  factor: number;
  total: number;
}

export const EmptyViaticos: Viaticos[] = [
  {
    descripcion: "",
    costo: 0,
    noPersonas: 0,
    noDias: 0,
    importe: 0,
    factor: 1,
    total: 0,
  },
];
export interface Impresiones {
  campania: string;
  material: string;
  impresora: string;
  metrosHorizontal: number;
  metrosVertical: number;
  cantidad: number;
  cantidadTotal: number;
  precioM2: number;
  importe: number;
  minimo: number;
  factor: number;
  totalSigv: number;
}

export const EmptyImpresiones: Impresiones[] = [
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
];
