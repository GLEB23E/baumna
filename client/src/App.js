import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Thirdblock from './pages/login/thirdblock/thirdblock';
import Firstblock from './pages/login/firstblock/firstblock';
import Secondblock from './pages/login/secondblock/secondblock';
import Fourthblock from './pages/login/fourthblock/fourthblock';
import Fithblock from './pages/login/fifthblock/fithblock';
import Sixthblock from './pages/login/sixthblock/sixthblock';
import Footer from './footer/footer';
import Register from './pages/login/loginorregister/register';
import Login from './pages/login/loginorregister/login';
import MainPage from './pages/mainpage/mainpage.tsx'; 
function OntutorPage() {
  return (
    <div>
      <Firstblock />
      <Secondblock />
      <Thirdblock />
      <Fourthblock />
      <Fithblock />
      <Sixthblock />
    </div>
  );
}

function RegisterW() {
  return (
    <div>
      <Register />
    </div>
  );
}

function LoginW() {
  return (
    <div>
      <Login />
    </div>
  );
}


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/home" element={<OntutorPage />} />
        </Routes>
        <Routes>
          <Route path="/register" element={<RegisterW />} />
        </Routes>
        <Routes>
          <Route path="/login" element={<LoginW />} />
        </Routes>
        <Routes>
          <Route path="/main" element={<MainPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
