import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";

export default function ItemsPage({query,pageTitle}){
    const [products, setProducts] = useState([]);

    async function fetchProducts(query) {

        try {
          const response = await fetch("http://localhost:4000/index.js", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query }),
          });
    
          const result = await response.json();
    
          if (result.errors) {
            console.error("GraphQL Errors:", result.errors);
          } else {
            setProducts(result.data.products); 
          }
        } catch (error) {
          console.error("Fetch Error:", error);
        }
    }


    useEffect(() => {
        fetchProducts(query);
    }, []);


    console.log(products);

    return (
        <div className="container">
          <h1>{pageTitle}</h1>
          <div className="itemsListed">
            {products.map((item) => (
                <ProductItem
                key={item.id}
                stock={item.in_stock}
                imageUrl={item.images?.[0]?.image_url || "default-image-url.jpg"}
                title={item.name}
                price={item.price}
                />
            ))}
          </div>
        </div>
    );
}