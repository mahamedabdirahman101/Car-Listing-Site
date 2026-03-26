import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import SignIn from "./pages/signin";
import SignUp from "./pages/SignUp";
import Profile from "./pages/profile";


const App = () => {
  return
  ( 
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/sign-in" element={<SignIn />} />
    <Route path="/sign-up" element={<SignUp />} />
    <Route path="/profile" element={<Profile />} />
  </Routes>
  )
}

export default App;