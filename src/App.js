import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NovoCliente from "./pages/NovoCliente";
import EditarCliente from "./pages/EditarCliente";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
        <Route path="/novo" element={<PrivateRoute> <NovoCliente /> </PrivateRoute>} />
        <Route path="/editar/:id" element={<PrivateRoute> <EditarCliente/> </PrivateRoute>}/>
      </Routes>
      </AuthProvider>
    </Router>
  );
}