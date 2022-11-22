import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer/Footer';
import NavBar from './Components/Navbar/NavBarr'

function App() {

  return (
    <BrowserRouter>
    <div className="App">
      <NavBar/>
      <Footer/>
    </div>
    </BrowserRouter>
  );
}

export default App;
