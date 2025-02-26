import { useEffect, useState } from "react";
import ItemsContainer from "./ItemsContainer";
import ProductItem from "./ProductItem";

export default function AllItems() {
  const [products, setProducts] = useState([]);

  async function fetchProducts() {
    const query = `
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
    `;

    try {
      const response = await fetch("http://localhost/graph/index.php", {
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
    fetchProducts();
  }, []);

  return (
    <ItemsContainer title={"All Items"}>
      {products.map((item) => (
        <ProductItem
          key={item.id}
          imageUrl={item.images?.[0]?.image_url || "default-image-url.jpg"}
          title={item.name}
          price={item.amount}
        />
      ))}
    </ItemsContainer>
  );
}
