import './App.css'
import AppToolbar from "./components/appBar/AppToolbar";
import {Route, Routes} from "react-router-dom";
import Register from "./components/User/Register";
import Login from "./components/User/Login"
import AddPhotoForm from "./components/AddPhoto/AddPhotoForm";
import Gallery from "./components/AddPhoto/Gallery";

function App() {
  return (
      <>
        <header>
          <AppToolbar/>
        </header>
        <main>
          <Routes>
              <Route path='/' element={<Gallery/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path={'/new-photo'} element={<AddPhotoForm/>}/>
          </Routes>
        </main>
      </>
  )
}

export default App
