import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inquery from "./components/inqueryform/Inquery";
import AdminRoute from "./admin/admin-route";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inquery />} />
        <Route path="/admin" element={<AdminRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
