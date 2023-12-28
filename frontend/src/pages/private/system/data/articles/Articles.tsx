import { Article, keysArticulo } from "./interfaces/article.interface";
import { useState, useEffect } from "react";
import { fetchArticles } from "./services/fetchArticles";
import { Loading } from "@/components/Loading";
import { Table, TableCell, TableRow } from "@/components/Table";
import { FaSearch } from "react-icons/fa";
import { useModal } from "@/hooks/useModal";
import Modal from "@/components/Modal";

export const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(
    null
  );
  
  const [selectedColumns, setSelectedColumns] = useState<(keyof Article)[]>(keysArticulo.slice(0, 10));
  const [isOpenModal, openModal, closeModal] = useModal();

  useEffect(() => {
    const fetchData = async () => {
      const { articles, status } = await fetchArticles();
      if (status === 200 || status === 204) {
        setArticles(articles);
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

  const toggleColumn = (column: keyof Article) => {
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
  const handleSearchClick = (id: number) => {
    // Guarda el ID del artículo en el contexto o donde desees
    // setTuContexto(id);
    setSelectedArticleId(id);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {message && articles.length === 0 ? <div>{message}</div> : null}
          <h3 onClick={() => openModal()}>Seleccionar Columnas:</h3>
          <Modal
            closeModal={closeModal}
            isOpen={isOpenModal}
            bgColor="bg-transparent"
            height={10}
            width={15}
          >
            <div className="flex flex-col gap-2">
              {keysArticulo.map((key) => (
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
              {articles.map((article, index) => (
                <TableRow key={index}>
                  {selectedColumns.map((key) => (
                    <TableCell key={key}>{article[key]}</TableCell>
                  ))}
                  <TableCell>
                    <FaSearch onClick={() => handleSearchClick(article.idN)} />
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
