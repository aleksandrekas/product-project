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


  function addIndex() {
    setIndex(prev => (prev === product.images.length - 1 ? 0 : prev + 1));
  }
  
  function substractIndex() {
    setIndex(prev => (prev === 0 ? product.images.length - 1 : prev - 1));
  }
  
  



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
            <div style={{visibility: imageIndex === 0 ? "hidden":"visible"}} onClick={substractIndex}><img src="src\assets\CaretLeft.svg" alt="left" /></div>
            <div style={{visibility: imageIndex === product.images.length - 1 ? "hidden":"visible"}}  onClick={addIndex}><img src="src\assets\CaretLeft.svg" alt="right" /></div>
          </div>
          <img className="displayImage" src={product.images[imageIndex].image_url} alt="" />
        </div>
      </div>
      <div className="innerContainer right">
          <h1>{product.name}</h1>
          {product.attributes.map((atr)=>(
            <div key={atr.id} className="attribute">
              <h4>{atr.atr_name}</h4>
              <div className="attrItems">
                {atr.item.map((atrItem)=>(
                  <div key={atrItem.id}>{atrItem.value}</div>
                ))}
              </div>
            </div>
          ))}
          <div className="attributes"></div>
          <h2>Price</h2>
          <h4>${product.price}</h4>
          <button>ADD TO CART</button>
          <p className="itemDescription">{product.description}</p>
      </div>
    </div>
  );
}
