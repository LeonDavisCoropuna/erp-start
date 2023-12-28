export interface Article {
  idN: number;
  nombre: string;
  categoria: string;
  tipo: string;
  precio: number;
  impuesto: number;
  stock: number;
  stockMin: number;
  stockMax: number;
  estado:string;
}

export const ArticuloEmpty: Article = {
  idN: 0,
  nombre: "",
  categoria: "",
  tipo: "",
  precio: 0,
  impuesto: 0,
  stock: 0,
  stockMax: 0,
  stockMin: 0,
  estado:"activo"
};

function getKeys<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

export const keysArticulo = getKeys(ArticuloEmpty);
