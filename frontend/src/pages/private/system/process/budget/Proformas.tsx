import { useState, useEffect } from "react";
import { Loading } from "@/components/Loading";
import { Table, TableCell, TableRow } from "@/components/Table";
import { FaSearch } from "react-icons/fa";
import { Proforma, keysProforma } from "./interfaces/proforma.interface";
import { fetchProformas } from "./services/fetchProformas";
import { useModal } from "@/hooks/useModal";
import Modal from "@/components/Modal";

export const Proformas = () => {
  const [proformas, setProformas] = useState<Proforma[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedProforma, setSelectedProforma] = useState<string | null>(null);
  const [selectedColumns, setSelectedColumns] = useState<(keyof Proforma)[]>(keysProforma.slice(0, 10));

  const [isOpenModal, openModal, closeModal] = useModal();
  useEffect(() => {
    const fetchData = async () => {
      const { proformas, status } = await fetchProformas();
      if (status === 200 || status === 204) {
        setProformas(proformas);
        setMessage("Updated articles");
      } else {
        status === 401
          ? setMessage("Invalid Access")
          : setMessage("Internal Server Error");
      }
    };
    setLoading(false);
    fetchData();
  }, []);
  const toggleColumn = (column: keyof Proforma) => {
    setSelectedColumns((prevSelectedColumns) => {
      if (prevSelectedColumns.includes(column)) {
        // Si la columna está seleccionada, la eliminamos
        return prevSelectedColumns.filter((col) => col !== column);
      } else {
        // Si la columna no está seleccionada, la añadimos
        return [...prevSelectedColumns, column];
      }
    });
  };
  // Manejador de clic en el icono de búsqueda
  const handleSearchClick = (id: string) => {
    // Guarda el ID del artículo en el contexto o donde desees
    // setTuContexto(id);
    setSelectedProforma(id);
  };
  const formatFecha = (date: Date): string => {
    // Puedes personalizar este formato según tus necesidades
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="relative">
          {message && proformas.length === 0 ? <div>{message}</div> : null}
          <h3 onClick={() => openModal()}>Seleccionar Columnas:</h3>
          <Modal
            closeModal={closeModal}
            isOpen={isOpenModal}
            bgColor="bg-transparent"
            height={10}
            width={15}
          >
            <div className="flex flex-col gap-2">
              {keysProforma.map((key) => (
                <label key={key} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedColumns.includes(key)}
                    onChange={() => toggleColumn(key)}
                  />
                  <span className="px-1">{key}</span>
                </label>
              ))}
            </div>
          </Modal>
          <Table>
            <thead>
              {selectedColumns.map((key) => (
                <TableCell key={key}>{key.toLocaleUpperCase()}</TableCell>
              ))}
              <TableCell>INF</TableCell>
            </thead>
            <tbody>
              {proformas.map((proforma, index) => (
                <TableRow key={index}>
                  {selectedColumns.map((key) => (
                    <TableCell key={key}>
                      {key === "fecha" ||
                      key === "fechaAprobacion" ||
                      key === "fechaEntrega" ||
                      key === "creado" ||
                      key === "fechaActualizado" ||
                      key === "fechaTermino"
                        ? formatFecha(proforma[key] as Date)
                        : proforma[key]} 
                    </TableCell>
                  ))}
                  <TableCell>
                    <FaSearch onClick={() => handleSearchClick(proforma.idN)} />
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
};
