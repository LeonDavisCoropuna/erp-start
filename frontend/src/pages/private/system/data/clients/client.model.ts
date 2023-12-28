export interface Client {
  idN: number;
  nombre: string;
  dniRuc: string;
  direccion: string;
  telefono: number;
  tipoCliente: string;
  estado: boolean;
}

export const ClientEmpty: Client[] = [
  {
    idN: 0,
    nombre: "",
    dniRuc: "",
    direccion: "",
    telefono: 0,
    tipoCliente: "",
    estado: true,
  },
];

export const Client: Client = {
  idN: 0,
  nombre: "",
  dniRuc: "",
  direccion: "",
  telefono: 0,
  tipoCliente: "",
  estado: true,
};
