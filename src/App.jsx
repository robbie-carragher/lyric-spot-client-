
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.scss';
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Albums from "./pages/Albums/Albums";



function App() {
  const code = new URLSearchParams(window.location.search).get("code");
 

  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect based on the presence of 'code' */}
        <Route path="/" element={code ? <Navigate to="/dashboard" /> : <Login />} />

        {/* Dashboard route, passing 'code' as a prop */}
        <Route path="/dashboard" element={<Dashboard code={code} />} />
        <Route path="/albums" element={<Albums  />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;

