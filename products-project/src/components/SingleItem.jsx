import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

export default function SingleItem() {
  const itemId = useSelector((state) => state.id);
  const [product, setProduct] = useState(null); 
  const [imageIndex,setIndex] = useState(0)
  const imageRef = useRef([])
  const query = `
    query SingleItem($singleItemId: String) {
      singleItem(id: $singleItemId) {
        id
        name
        brand
        category
        description
        price
        in_stock
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
    setIndex((prev) => {
      const nextIndex = prev === product.images.length - 1 ? 0 : prev + 1;
      const el = imageRef.current[nextIndex]; 
  
      if (el) {
        el.scrollIntoView({
          behavior: 'smooth',
          inline: 'nearest',
          block: 'nearest',
        });
      }
  
      return nextIndex;
    });
  }
  
  function substractIndex() {
    setIndex((prev) => {
      const nextIndex = prev === 0 ? product.images.length - 1 : prev - 1;
      const el = imageRef.current[nextIndex];
  
      if (el) {
        el.scrollIntoView({
          behavior: 'smooth',
          inline: 'nearest',
          block: 'nearest',
        });
      }
  
      return nextIndex;
    });
  }

  



  if (!product) {
    return <h1>Loading...</h1>; 
  }





  return (
    <div className="singleItemContainer">
      <div className="innerContainer">
        <div className="imageSelectors">
          {product.images.map((item,index)=>(
            <div ref={(el) => (imageRef.current[index] = el)}  className={imageIndex === index ? "imgSelectOptions selected" : "imgSelectOptions"} >
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
            atr.atr_name != 'blank' && 
              <div key={atr.id} className="attribute">
                <h2>{atr.atr_name.toUpperCase()}:</h2>
                <div className="attrItems">
                  {atr.item.map((atrItem)=>( 
                    atr.atr_name === "color" ? (
                      <div className="color" key={atrItem.id} style={{'backgroundColor' : atrItem.value,'border':'none'}}></div>
                    ):(
                      <div key={atrItem.id}>{atrItem.value.toUpperCase()}</div>
                    )
                  ))}
                </div>
              </div>
            
          ))}
          <h2>PRICE:</h2>
          <h4>${product.price}</h4>
          {product.in_stock ? (
            <button>ADD TO CART</button>
          ):(
            <button style={{'backgroundColor' : "#777978"}}>OUT OF STOCK</button>
          )}
          <p dangerouslySetInnerHTML={{ __html:product.description }} className="itemDescription"></p>
      </div>
    </div>
  );
}
