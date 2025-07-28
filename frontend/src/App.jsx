import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Booth from './pages/Booth';
import Result from './pages/Result';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/booth" element={<Booth />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  );
}

export default App;
