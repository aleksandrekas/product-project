import { BrowserRouter,Routes,Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import ClothItems from "./components/ClothItems"
import TechItems from "./components/TechItems"
import ItemsPage from "./components/ItemsPage"



function App() {
  return (
    <BrowserRouter>
      <main>
        <NavBar/>
          <Routes>
            <Route index element={
              <ItemsPage
              pageTitle={"All Items"}
                query={
                  `
                  {
                    products {
                      id
                      name
                      in_stock
                      description
                      category
                      brand
                      amount
                      currency_symbol
                      images {
                        id
                        product_id
                        image_url
                      }
                    }
                  }
                `
                }
              />
              } />
            <Route path="clothes" element={<ClothItems/>} />
            <Route path="tech" element={<TechItems/>} />
          </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
