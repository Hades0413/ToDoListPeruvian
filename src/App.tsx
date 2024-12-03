import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/dashboard/Home";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/protected/ProtectedRoute";
import Error404 from "./pages/errors/Error404";
import Proyecto from "./pages/proyecto/Proyecto";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Ruta protegida */}
        <Route element={<Layout />}>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/proyecto/:idProyecto"
            element={
              <ProtectedRoute>
                <Proyecto />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default App;
