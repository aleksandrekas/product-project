import { BrowserRouter,Routes,Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import AllItems from "./components/AllItems"
import ClothItems from "./components/ClothItems"
import TechItems from "./components/TechItems"

function App() {
  return (
    <BrowserRouter>

      <main>
        <NavBar/>
          <Routes>
            <Route index element={<AllItems />} />
            <Route path="clothes" element={<ClothItems/>} />
            <Route path="tech" element={<TechItems/>} />
          </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
