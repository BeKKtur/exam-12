import './App.css'
import AppToolbar from "./components/appBar/AppToolbar";
import {Route, Routes} from "react-router-dom";
import Register from "./components/User/Register";
import Login from "./components/User/Login"

function App() {
  return (
      <>
        <header>
          <AppToolbar/>
        </header>
        <main>
          <Routes>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>
        </main>
      </>
  )
}

export default App
