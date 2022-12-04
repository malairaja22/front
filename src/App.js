import { Signup } from './components/signup';
import { Signin } from './components/signin';
import {Home} from './components/home';
import './App.css';
import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom"

function App() {
  return <>
    
      <Routes>
    <Route path="/signup" element={<Signup />} />
    <Route path="/signin" element={<Signin />} />
    <Route path="/" element={<Home />} />
    </Routes>
    
    
    </>
}

export default App;
