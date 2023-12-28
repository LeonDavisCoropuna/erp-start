import { Route, Routes } from "react-router-dom";

export const RouteNotFound = ({children}:{children :JSX.Element | JSX.Element[]} ) => {
  return (
    <Routes>
      {children}
      <Route path="*" element={<div className="p-3 w-full bg-green-400">IN PROGESS</div>}></Route>
    </Routes>
  );
}
