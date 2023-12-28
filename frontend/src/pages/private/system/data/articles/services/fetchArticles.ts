import { AxiosError } from "axios";
import axios from "@/config/axios";
import { Article } from "../interfaces/article.interface";

export const fetchArticles = async (): Promise<{
  articles: Article[];
  status: number;
}> => {
  try {
    const res = await axios.get<Article[]>("/api/elector/save-vote");
    const articles: Article[] = res.data;
    return { articles, status: res.status };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        const status = error.response.status;
        return { articles: [], status };
      }
    }
    //return { articles: [], status: 500 };
    return {
      articles: [
        {
          idN: 1,
          nombre: "Artículo 1",
          categoria: "Electrónica",
          tipo: "Electrodoméstico",
          precio: 49.99,
          impuesto: 0.1,
          stock: 100,
          stockMin: 10,
          stockMax: 200,
          estado: "Activo",
        },
        {
          idN: 2,
          nombre: "Artículo 2",
          categoria: "Ropa",
          tipo: "Camiseta",
          precio: 19.99,
          impuesto: 0.05,
          stock: 50,
          stockMin: 5,
          stockMax: 100,
          estado: "Activo",
        },
        {
          idN: 3,
          nombre: "Artículo 3",
          categoria: "Hogar",
          tipo: "Lámpara",
          precio: 29.99,
          impuesto: 0.08,
          stock: 75,
          stockMin: 8,
          stockMax: 150,
          estado: "Activo",
        },
      ],
      status: 200,
    };
  }
};
