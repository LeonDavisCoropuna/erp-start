import { useState, useEffect } from "react";
import { Loading } from "@/components/Loading";
import { Table, TableCell, TableRow } from "@/components/Table";
import { FaSearch } from "react-icons/fa";
import { Proforma, keysProforma } from "./interfaces/proforma.interface";
import { fetchProformas } from "./services/fetchProformas";
import { useModal } from "@/hooks/useModal";
import Modal from "@/components/Modal";
import { useNavigate } from "react-router-dom";

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
        return prevSelectedColumns.filter((col) => col !== column);
      } else {
        return [...prevSelectedColumns, column];
      }
    });
  };
  const router = useNavigate();
  const handleSearchClick = (id: string) => {
    router("/system/procesos/presupuesto/"+id)
    setSelectedProforma(id);
  };
  const formatFecha = (date: Date): string => {
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
                      {proforma[key]}
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
