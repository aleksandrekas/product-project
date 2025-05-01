import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";

export default function ItemsPage({category,pageTitle}){
    const [products, setProducts] = useState([]);

    const query = `
      query($category: String!){
        productByCategory(category: $category) {
          id
          name
          category
          in_stock
          price
          images{
            id
            image_url
          }
        }
      }
    `


    async function fetchProducts(query) {


        try {
          const response = await fetch("http://localhost:4000/index.js", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
              query,
              variables:{category}}),
          });
    
          const result = await response.json();
    
          if (result.errors) {
            console.error("GraphQL Errors:", result.errors);
          } else {
            setProducts(result.data.productByCategory); 
          }
        } catch (error) {
          console.error("Fetch Error:", error);
        }
    }


    useEffect(() => {
        fetchProducts(query);
    }, [category]);


    // console.log(products); 

    return (
        <div className="container">
          <h1>{pageTitle}</h1>
          <div className="itemsListed">
            {products.map((item) => (
                <ProductItem
                  key={item.id}
                  item={item}
                />
            ))}
          </div>
        </div>
    );
}