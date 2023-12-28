import { useModal } from "@/hooks/useModal";
import {
  Impresiones,
  ManoObraOpt,
  Material,
  ServTerceros,
  Servicio,
  Viaticos,
} from "../interfaces/BudgetModel";
import { BudgetContext, BudgetContextType } from "../hooks/BudgetContext";
import { useContext } from "react";
import { AiFillPlusCircle } from "react-icons/ai";

interface TableProps<T> {
  data: T[];
  headers: string[];
  key: keyof Servicio;
  indexServicio: number;
}

export function TableServiceModal<T extends { [key: string]: any }>(
  props: TableProps<T>
) {
  const { budget, setBudget, addService, deleteService, updateService } =
    useContext(BudgetContext) as BudgetContextType;

  const { data, headers, key, indexServicio } = props;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number
  ) => {
    const { name, value } = e.target;

    const servicioActualizado = { ...budget.servicios[indexServicio] };
    if (Array.isArray(servicioActualizado[key] as any[])) {
      const newArray = [...(servicioActualizado[key] as any[])];
      newArray[index][name] = value;

      // Asigna el array actualizado al atributo 'key'
      if (Array.isArray(servicioActualizado[key])) {
        servicioActualizado[key] = newArray;
      }
      // Actualiza el presupuesto con los servicios modificados
      setBudget((prev) => ({
        ...prev,
        servicios: prev.servicios.map((servicio, i) =>
          i === indexServicio ? servicioActualizado : servicio
        ),
      }));
    }
  };

  const agregarItem = (e: React.MouseEvent) => {
    e.preventDefault();
    const updateServicios = [...budget.servicios];

    const EmptyMaterial: Material[] = [
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
    const EmptyServTerceros: ServTerceros[] = [
      {
        servicioBrindado: "",
        proveedor: "",
        importe: 0,
        factor: 1,
        total: 0,
      },
    ];

    const EmptyViaticos: Viaticos[] = [
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
    const EmptyImpresiones: Impresiones[] = [
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
    let newRow: any;
    if (key === "materiales") newRow = [...EmptyMaterial];
    if (key === "serviciosTerceros") newRow = [...EmptyServTerceros];
    if (key === "viaticos") newRow = [...EmptyViaticos];
    if (key === "impresiones") newRow = [...EmptyImpresiones];

    const newItem = [
      ...(updateServicios[indexServicio][key] as any[]),
      ...newRow,
    ];

    // Actualiza el presupuesto con los servicios modificados
    setBudget((prevPresupuesto) => {
      const updatedServicios = [...prevPresupuesto.servicios];

      updatedServicios[indexServicio][key] = newItem;
      return {
        ...prevPresupuesto,
        servicios: updatedServicios,
      };
    });
  };

  return (
    <div>
      <button onClick={agregarItem}>{<AiFillPlusCircle size={30} />}</button>{" "}
      <table className="w-full">
        <thead>
          <tr className="bg-blue-600 text-white h-6">
            {headers.map((header, index) => (
              <th key={index} className="border-[0.1em]">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, itemIndex) => (
            <tr key={itemIndex}>
              {Object.entries(item).map(([key, value], valueIndex) => {
                if (key !== "factor" && key !== "total") {
                  let inputType: "text" | "number" = "text"; // Tipo de entrada predeterminado

                  // Determina el tipo de entrada en función del tipo de datos en 'item'
                  if (typeof value === "number") {
                    inputType = "number";
                  }
                  return (
                    <td key={valueIndex} className="border-[0.1em]">
                      <input
                        value={value}
                        className="w-full  border-none outline-none"
                        onChange={(e) => handleChange(e, itemIndex)}
                        name={key as any}
                        type={inputType}
                      />
                    </td>
                  );
                }
                return null;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const ItemTableMateriales: React.FC<{
  item: Servicio;
  indexServicio: number;
}> = ({ item, indexServicio }) => {
  const headers = [
    "Codigo",
    "Articulo",
    "Cantidad",
    "Cant Est",
    "U. Medida",
    "P. Unitario",
    "Importe",
  ];
  return TableServiceModal<Material>({
    data: item.materiales,
    headers,
    key: "materiales",
    indexServicio,
  });
};

export const ItemTableServicioTerceros: React.FC<{
  item: Servicio;
  indexServicio: number;
}> = ({ indexServicio, item }) => {
  const headers = ["Servicio", "Proveedor", "Importe"];

  return TableServiceModal<ServTerceros>({
    data: item.serviciosTerceros,
    headers,
    key: "serviciosTerceros",
    indexServicio,
  });
};

export const ItemTableViaticos: React.FC<{
  item: Servicio;
  indexServicio: number;
}> = ({ item, indexServicio }) => {
  const headers = ["Descripcion", "Costo", "No. Pers", "No. Dias", "Importe"];

  return TableServiceModal<Viaticos>({
    data: item.viaticos,
    headers,
    key: "viaticos",
    indexServicio,
  });
};

export const ItemTableImpresiones: React.FC<{
  item: Servicio;
  indexServicio: number;
}> = ({ item, indexServicio }) => {
  const headers = [
    "Campaña",
    "Material",
    "Impresora",
    "Horizontal mts",
    "Vertical Mts",
    "Cantidad",
    "Can. Total",
    "Precio M2",
    "importe",
    "Min",
  ];

  return TableServiceModal<Impresiones>({
    data: item.impresiones,
    headers,
    key: "impresiones",
    indexServicio,
  });
};

export const ItemTableManoObra: React.FC<{
  item: Servicio;
  indexServicio: number;
}> = ({ item, indexServicio }) => {
  const headers = [
    "Descripcion",
    "Proceso",
    "C. x Hora",
    "Nro. Peronas",
    "Nro. Horas",
    "Importe",
  ];
  return (
    <>
      <h2 className="font-semibold text-[1.1em]">Confeccion: </h2>
      {TableServiceModal<ManoObraOpt>({
        data: item.manoObra.confeccion,
        headers,
        key: "manoObra",
        indexServicio,
      })}
      <h2 className="font-semibold text-[1.1em]">Instalacion: </h2>
      {TableServiceModal<ManoObraOpt>({
        data: item.manoObra.instalacion,
        headers,
        key: "manoObra",
        indexServicio,
      })}
    </>
  );
};
