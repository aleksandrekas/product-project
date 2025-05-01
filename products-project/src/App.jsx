import { BrowserRouter,Routes,Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import AllItems from "./components/AllItems"
import ItemsPage from "./components/ItemsPage"
import SingleItem from "./components/SingleItem"


function App() {
  return (
    <BrowserRouter>
      <main>
        <NavBar/>
          <Routes>
            <Route index element={
                <AllItems/>
              } />
            <Route path="clothes" element={<ItemsPage category={"clothes"} pageTitle={"CLOTHES"}/>} />
            <Route path="tech" element={<ItemsPage category={"tech"} pageTitle={"TECH"}/>} />
            <Route path="singleItem/:id"  element={<SingleItem />} />
          </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
