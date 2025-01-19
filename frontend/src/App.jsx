import {Routes , Route , Navigate} from "react-router-dom";
import Login from "./Pages/Login"
import Home from "./Pages/Home"
import Signup from "./Pages/Signup"
import Refreshhandler from "./Refreshhandler";
import './App.css'
import { useState } from "react";

function App() {
 
  const [isAuthenticated , setIsAuthenticated] = useState(false);

  const PrivateRoute = ({element})=>{
    return isAuthenticated?element:<Navigate to="/login"></Navigate>
  }



  return (
    <div className="App">
      <Refreshhandler setIsAuthenticated = {setIsAuthenticated}></Refreshhandler>
    <Routes>
      <Route path='/' element={<Navigate to ="/login" />}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/home' element={<PrivateRoute element={<Home></Home>}/>}></Route>

    </Routes>
    </div>
  )
}

export default App
