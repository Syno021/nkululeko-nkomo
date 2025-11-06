import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Portfolio3D from './pages/Portfolio3D';
import Skills3D from './pages/Skills3D';
import Projects3D from './pages/Projects3D';
import Services3D from './pages/Services3D';
import Contact3D from './pages/Contact3D';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/scene" element={<Portfolio3D />} />
        <Route path="/skills" element={<Skills3D />} />
        <Route path="/projects" element={<Projects3D />} />
        <Route path="/services" element={<Services3D />} />
        <Route path="/contact" element={<Contact3D />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
