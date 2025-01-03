import logo from './logo.svg';
import './App.css';
import Thirdblock from './pages/login/thirdblock/thirdblock';
import Firstblock from './pages/login/firstblock/firstblock';
import Secondblock from './pages/login/secondblock/secondblock';
import Fourthblock from './pages/login/fourthblock/fourthblock';
import Fithblock from './pages/login/fifthblock/fithblock';
function App() {
  return (
    <div className="App">
      <Firstblock />
      <Secondblock />
      <Thirdblock />
      <Fourthblock />
      <Fithblock />
    </div>
  );
}

export default App;
