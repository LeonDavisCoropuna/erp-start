import { useContext, useState } from "react";
import {
  BudgetContext,
  BudgetContextType,
  BudgetProvider,
} from "./hooks/BudgetContext";
import { HeadersTablePresupuesto } from "./components/HeaderTable";
import { AiFillEdit, AiFillPlusCircle, AiOutlineDelete } from "react-icons/ai";
import { useModal } from "@/hooks/useModal";
import { Servicio } from "./interfaces/BudgetModel";
import { InputField } from "./components/InputField";
import Modal from "@/components/Modal";
import { DetailService } from "./components/ModalServiceBudget";
import { ButtonModalItem } from "./components/ButtonModalItem";
import {
  ItemTableImpresiones,
  ItemTableManoObra,
  ItemTableMateriales,
  ItemTableServicioTerceros,
  ItemTableViaticos,
} from "./components/ModalsServicesKeyof";
import { fetchCreateBudget } from "./services/fetchCreateBudget";

export const NewBudget = () => {
  return (
    <BudgetProvider>
      <NewBudgetCreate />
    </BudgetProvider>
  );
};

export const NewBudgetCreate = () => {
  const { budget, setBudget, addService, deleteService, updateService } =
    useContext(BudgetContext) as BudgetContextType;

  const handleChangePresupuesto = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setBudget((prevState) => ({
      ...prevState, // Copiamos todas las propiedades del estado anterior
      [e.target.name]: e.target.value,
    }));
  };
  const sendInfo = async (e : React.MouseEvent) => {
    e.preventDefault()
    const res = await fetchCreateBudget(budget);
  }
  const handleChangePresupuestoFecha = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const newDate = new Date(e.target.value);
    setBudget({ ...budget, [e.target.name]: newDate });
  };

  const agregarServicio = (e: React.MouseEvent) => {
    e.preventDefault();
    const nuevoServicio: Servicio = {
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

    // Clona el array existente y agrega el nuevo servicio
    const nuevosServicios = [...budget.servicios, nuevoServicio];

    // Actualiza el estado del presupuesto con los nuevos servicios
    setBudget({
      ...budget,
      servicios: nuevosServicios,
    });
  };
  const handleDeleteService = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
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

  const [selectedAttribute, setSelectedAttribute] = useState<
    keyof Servicio | null
  >("materiales");

  const [isOpenModal, openModal, closeModal] = useModal();
  //const isEdit = presupuesto.idN ? true : false;
  const isEdit = budget.estado === "En curso" ? true : false;
  const handleChangeServicio = (
    index: number,
    field: keyof Servicio,
    value: any
  ) => {
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

  const handleAttributeClick = (
    e: React.MouseEvent,
    attribute: keyof Servicio
  ) => {
    e.preventDefault();
    setSelectedAttribute(attribute);
  };
  return (
    <div>
      <div>Nuevo Presupuesto</div>
      <div className="flex">
        <div className="flex gap-3">
          <table className="">
            <tbody>
              <tr className="">
                <td className="">Numero: </td>
                <td>
                  <input
                    placeholder="nro"
                    name="idN"
                    className=" border-gray-500 pl-1 border-[0.1em] rounded-md w-24"
                    onChange={handleChangePresupuesto}
                    value={budget.idN}
                  />
                </td>
              </tr>
              <tr className="">
                <td className="">Estado:</td>
                <td>
                  <select
                    className="w-24 border-gray-500 pl-1 border-[0.1em] rounded-md"
                    name="estado"
                    onChange={handleChangePresupuesto}
                    value={budget.estado}
                  >
                    <option>En curso</option>
                    <option>Aceptado</option>
                    <option>Anulado</option>
                  </select>
                </td>
              </tr>
              <tr className="">
                <td className="">Forma de pago:</td>
                <td className="">
                  <select
                    className=" w-24 border-gray-500 pl-1 border-[0.1em]  rounded-md"
                    name="formaPago"
                    onChange={handleChangePresupuesto}
                    value={budget.formaPago}
                  >
                    <option>50% Contado,50% Entrega</option>
                    <option>60% Contado,40% Entrega</option>
                    <option>Credito 45 dias</option>
                    <option>Credito 15 dias</option>
                    <option>Credito 35 dias</option>
                    <option>Credito 50 dias</option>
                  </select>
                </td>
              </tr>
              <tr className="">
                <td className="">Refrencia:</td>
                <td>
                  <input
                    className="w-24 border-gray-500 pl-1 border-[0.1em]  rounded-md"
                    name="referencia"
                    placeholder="ref"
                    onChange={handleChangePresupuesto}
                    value={budget.referencia}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <table className="">
            <tbody>
              <tr className="">
                <td>Fecha</td>
                <td>
                  <input
                    type="date"
                    className="border-gray-500 pl-1 border-[0.1em] w-24  rounded-md"
                    name="fechaCreacion"
                    onChange={handleChangePresupuestoFecha}
                    value={budget.fechaCreacion}
                  />
                </td>
              </tr>
              <tr className="">
                <td>Validez</td>
                <td>
                  <input
                    type="date"
                    className="border-gray-500 pl-1 border-[0.1em] w-24 rounded-md"
                    name="fechaValidez"
                    onChange={handleChangePresupuestoFecha}
                    value={budget.fechaValidez}
                  />
                </td>
              </tr>
              <tr className="">
                <td className="">Precio</td>
                <td className="flex items-center h-full w-full font-semibold">
                  <input
                    type="checkbox"
                    className="my-auto"
                    name="precio"
                    onChange={handleChangePresupuesto}
                    value={budget.precio ? "true" : "false"}
                  />
                  Establecido
                </td>
              </tr>
              <tr className="">
                <td className="font-semibold">Tipo</td>
                <td>
                  <select
                    className="w-24 border-gray-500 pl-1 border-[0.1em]  rounded-md"
                    name="tipo"
                    onChange={handleChangePresupuesto}
                    value={budget.tipo}
                  >
                    <option>Estantar </option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex gap-3 ml-10">
          <table>
            <tbody>
              <tr>
                <td>Cliente</td>
                <td>
                  <input
                    placeholder="cliente"
                    className=" border-gray-500 pl-1 border-[0.1em] rounded-md w-24"
                    name="cliente"
                    onChange={handleChangePresupuesto}
                    value={budget.cliente}
                  />
                </td>
              </tr>
              <tr>
                <td>Nombre</td>
                <td>
                  <input
                    placeholder="nombre"
                    className=" border-gray-500 pl-1 border-[0.1em] rounded-md w-64"
                    name="nombre"
                    onChange={handleChangePresupuesto}
                    value={budget.nombre}
                  />
                </td>
              </tr>
              <tr>
                <td>Direccion</td>
                <td>
                  <input
                    placeholder="direccion"
                    className=" border-gray-500 pl-1 border-[0.1em] rounded-md w-64"
                    name="direccion"
                    onChange={handleChangePresupuesto}
                    value={budget.direccion}
                  />
                </td>
              </tr>
              <tr>
                <td>Atencion</td>
                <td>
                  <input
                    placeholder="atencion"
                    className=" border-gray-500 pl-1 border-[0.1em] rounded-md w-48 "
                    name="atencion"
                    onChange={handleChangePresupuesto}
                    value={budget.atencion}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className=" mt-2">
        <div>
          <button onClick={agregarServicio}>
            {<AiFillPlusCircle size={30} />}
          </button>
        </div>
        <table className="table-auto w-full">
          <thead className="w-full">
            <tr className="">
              <HeadersTablePresupuesto value="No" size={1} />
              <HeadersTablePresupuesto value="Codigo" size={2} />
              <HeadersTablePresupuesto value="Descripcion" size={50} />
              <HeadersTablePresupuesto value="Cantidad" size={2} />
              <HeadersTablePresupuesto value="U. Medida" size={1} />
              <HeadersTablePresupuesto value="P. Unitraio" size={1} />
              <HeadersTablePresupuesto value="Importe" size={1} />
            </tr>
          </thead>
          <tbody>
            {budget.servicios.map((servicio, index) => (
              <>
                <tr key={index} className=" hover:bg-slate-100">
                  <InputField
                    value={servicio.idN}
                    onChange={(value) =>
                      handleChangeServicio(index, "idN", value)
                    }
                  />
                  <InputField
                    value={servicio.codigo}
                    onChange={(value) =>
                      handleChangeServicio(index, "codigo", value)
                    }
                  />
                  <td className=" border-[0.15em] flex relative justify-between">
                    <textarea
                      rows={3}
                      value={servicio.descripcion}
                      onChange={(e) =>
                        handleChangeServicio(
                          index,
                          "descripcion",
                          e.target.value
                        )
                      }
                      className=" w-full bg-transparent border-none outline-none"
                    />
                    {!isEdit ? (
                      <>
                        <button
                          className="flex items-center"
                          onClick={(e: React.MouseEvent) =>
                            handleDeleteService(e, index)
                          }
                        >
                          <AiOutlineDelete size={20} />
                        </button>
                        <button
                          className="flex items-center"
                          onClick={(e: React.MouseEvent) => {
                            e.preventDefault();
                            openModal();
                          }}
                        >
                          <AiFillEdit size={20} />
                        </button>
                      </>
                    ) : (
                      <button
                        className="flex items-center"
                        onClick={(e: React.MouseEvent) => {
                          e.preventDefault();
                          openModal();
                        }}
                      >
                        <AiFillEdit size={20} />
                      </button>
                    )}
                  </td>
                  <InputField
                    value={servicio.cantidad}
                    onChange={(value) =>
                      handleChangeServicio(index, "cantidad", value)
                    }
                  />
                  <InputField
                    value={servicio.unidadMedida}
                    onChange={(value) =>
                      handleChangeServicio(index, "unidadMedida", value)
                    }
                  />
                  <InputField
                    value={servicio.precioUnitario}
                    onChange={(value) =>
                      handleChangeServicio(index, "precioUnitario", value)
                    }
                  />

                  <InputField
                    value={servicio.importe}
                    onChange={(value) =>
                      handleChangeServicio(index, "importe", value)
                    }
                  />
                </tr>
                <Modal
                  isOpen={isOpenModal}
                  closeModal={closeModal}
                  bgColor="bg-transparent"
                  height={50}
                  width={100}
                >
                  <h1>Presupuesto para el Item {servicio.idN}</h1>
                  <div className="text-[1em] ">
                    <table>
                      <tbody className="gap-5">
                        <tr>
                          <DetailService
                            column="Pedido"
                            value={servicio.pedido}
                            focus={false}
                          />
                          <DetailService
                            column="Cantidad"
                            value={servicio.cantidad}
                            focus={false}
                          />
                          <DetailService
                            column="Costo Total"
                            value={servicio.costoTotal}
                            focus={true}
                          />
                          <DetailService
                            column="Utilidad%"
                            value={servicio.utilidad}
                            focus={false}
                          />
                          <DetailService
                            column="Total"
                            value={servicio.total}
                            focus={true}
                          />
                          <DetailService
                            column="Plantilla"
                            value="Opt"
                            focus={false}
                          />
                        </tr>
                      </tbody>
                    </table>
                    <table>
                      <tbody>
                        <tr>
                          <th>
                            <ButtonModalItem
                              handleAttributeClick={handleAttributeClick}
                              name="Materiales"
                              value="materiales"
                              selectedAttribute={selectedAttribute}
                            />
                          </th>
                          <th>
                            <ButtonModalItem
                              handleAttributeClick={handleAttributeClick}
                              name="Mano de Obra"
                              value="manoObra"
                              selectedAttribute={selectedAttribute}
                            />
                          </th>
                          <th>
                            <ButtonModalItem
                              handleAttributeClick={handleAttributeClick}
                              name="Serv. Terceros"
                              value="serviciosTerceros"
                              selectedAttribute={selectedAttribute}
                            />
                          </th>
                          <th>
                            <ButtonModalItem
                              handleAttributeClick={handleAttributeClick}
                              name="Viaticos"
                              value="viaticos"
                              selectedAttribute={selectedAttribute}
                            />
                          </th>
                          <th>
                            <ButtonModalItem
                              handleAttributeClick={handleAttributeClick}
                              name="Impresiones"
                              value="impresiones"
                              selectedAttribute={selectedAttribute}
                            />
                          </th>
                        </tr>
                      </tbody>
                    </table>

                    {selectedAttribute === "impresiones" && (
                      <ItemTableImpresiones
                        item={servicio}
                        indexServicio={index}
                      />
                    )}
                    {selectedAttribute === "materiales" && (
                      <ItemTableMateriales
                        item={servicio}
                        indexServicio={index}
                      />
                    )}
                    {selectedAttribute === "viaticos" && (
                      <ItemTableViaticos
                        item={servicio}
                        indexServicio={index}
                      />
                    )}
                    {selectedAttribute === "serviciosTerceros" && (
                      <ItemTableServicioTerceros
                        item={servicio}
                        indexServicio={index}
                      />
                    )}
                    {selectedAttribute === "manoObra" && (
                      <ItemTableManoObra
                        item={servicio}
                        indexServicio={index}
                      />
                    )}
                  </div>
                </Modal>
              </>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={sendInfo}> SEND</button>
    </div>
  );
};
