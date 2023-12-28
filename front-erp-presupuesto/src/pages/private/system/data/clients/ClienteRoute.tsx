import RouteNotFound from "@/utils/RouteNotFound";
import { Route } from "react-router-dom";
import Clientes from "./Clientes";
import ClienteDetalle from "./ClienteDetalle";
function IndexCliente() {
  return (
    <RouteNotFound>
      <Route path="" element={<Clientes />} />
      <Route path=":id" element={<ClienteDetalle />} />
    </RouteNotFound>
  );
}

export default IndexCliente;
