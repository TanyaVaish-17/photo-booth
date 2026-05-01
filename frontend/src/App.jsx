import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home        from "./pages/Home";
import Booth       from "./pages/Booth";
import Result      from "./pages/Result";
import AuthPage    from "./pages/AuthPage";
import MemoriesPage from "./pages/MemoriesPage";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/"         element={<Home />} />
        <Route path="/booth"    element={<Booth />} />
        <Route path="/result"   element={<Result />} />
        <Route path="/auth"     element={<AuthPage />} />
        <Route path="/memories" element={<MemoriesPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;