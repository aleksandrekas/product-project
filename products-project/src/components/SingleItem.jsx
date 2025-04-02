import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function SingleItem() {
  const itemId = useSelector((state) => state.id);
  const [product, setProduct] = useState(null); 
  const [imageIndex,setIndex] = useState(0)
  const query = `
    query SingleItem($singleItemId: String) {
      singleItem(id: $singleItemId) {
        id
        name
        brand
        category
        description
        price
        images {
          id
          image_url
        }
        attributes {
          id
          atr_name
          item {
            id
            display_value
            value
          }
        }
      }
    }
  `;

  async function fetchProducts() {
    if (!itemId) {
      console.warn("No itemId provided.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables: { singleItemId: itemId },
        }),
      });

      const result = await response.json();
      

      if (result.errors) {
        console.error("GraphQL Errors:", result.errors);
      } else {
        setProduct(result.data.singleItem[0]); 
        

      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [itemId]); 






  if (!product) {
    return <h1>Loading...</h1>; 
  }





  return (
    <div className="singleItemContainer">
      <div className="innerContainer">
        <div className="imageSelectors">
          {product.images.map((item,index)=>(
            <div onClick={()=> setIndex(index)} className={imageIndex === index ? "imgSelectOptions selected" : "imgSelectOptions"} >
              <img key={item.id}  src={item.image_url} alt="" />
            </div>
          ))}
        </div>
        <div className="displayImageDiv">
          <div className="buttons">
            <div></div>
            <div></div>
          </div>
          <img className="displayImage" src={product.images[imageIndex].image_url} alt="" />
        </div>
      </div>
      <div className="innerContainer"></div>
    </div>
  );
}
