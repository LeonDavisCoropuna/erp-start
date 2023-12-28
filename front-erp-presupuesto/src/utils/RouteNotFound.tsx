import { Route, Routes } from "react-router-dom";

export const RouteNotFound = ({children}:{children :JSX.Element | JSX.Element[]} ) => {
  return (
    <Routes>
      {children}
      <Route path="*" element={<div className="p-3 w-full bg-slate-400">NOT FOUND 404</div>}></Route>
    </Routes>
  );
}
