import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home'
import Cadastro from './pages/Cadastro/Cadastro';



function App() {
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route  path="/cadastro" element={<Cadastro/ >}></Route>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
