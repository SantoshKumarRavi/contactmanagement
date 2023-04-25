import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./screens/Dashboard";
function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/dashboard/contact" replace />} />
    </Routes>
  );
}

export default App;
