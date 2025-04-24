import { useSelector,useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { addItem } from "../store/cartSlice";


export default function SingleItem() {
  const itemId = useSelector((state) => state.id);
  const cartState = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [imageIndex,setIndex] = useState(0)
  const [storageproduct,setStorageProduct] = useState({
    name:"",
    price:"",
    image:"",
    attributes:{},
    selectedAttributes:{},
    quantity: null
  }) 
  
  useEffect(() => {      
    if (product?.attributes) {
      const defaults = product.attributes.reduce((acc, attr) => {
        acc[attr.atr_name] = attr.item?.[0]?.value || null;
        return acc;
      }, {});

      setStorageProduct({
        name:product.name,
        price:product.price,
        image:product.images[0].image_url,
        attributes:product.attributes,
        selectedAttributes:defaults,
        quantity: 1
      });
    }

    

  }, [product]);
  

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartState));
  }, [cartState]);
  
  

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

  function selectAttribute(atr, value) {
    setStorageProduct((prev) => ({
      ...prev,
      selectedAttributes: {
        ...prev.selectedAttributes,
        [atr]: value
      }
    }));
  }
  
  function addCartItem(){
      dispatch(addItem(storageproduct))
  }


  if (!product) {
    return <h1>Loading...</h1>; 
  }

  // console.log(storageproduct)



  return (
    <div className="singleItemContainer">
      <div className="innerContainer">
        <div className="imageSelectors">
          {product.images.map((item,index)=>(
            <div key={item.id} ref={(el) => (imageRef.current[index] = el)}  className={imageIndex === index ? "imgSelectOptions selected" : "imgSelectOptions"} >
              <img   src={item.image_url} alt="" />
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
                {atr.item.map((atrItem) => {
                  const content = atr.atr_name === "color" ? (
                    <div onClick={()=> selectAttribute('color',atrItem.value)} className={storageproduct.selectedAttributes.color === atrItem.value ? "color colorSelected":" color"} style={{ backgroundColor: atrItem.value, border: 'none' }}></div>
                  ) : (
                    <div onClick={()=> selectAttribute(atr.atr_name,atrItem.value)} className={storageproduct.selectedAttributes[atr.atr_name] === atrItem.value ? "attributeItem selectedAttribute" : "attributeItem"}>{atrItem.value.toUpperCase()}</div>
                  );

                  return (
                    <div  key={atrItem.id}>
                      {content}
                    </div>
                  );
                })}

                </div>
              </div>
            
          ))}
          <h2>PRICE:</h2>
          <h4>${product.price}</h4>
          {product.in_stock ? (
            <button onClick={addCartItem}>ADD TO CART</button>
          ):(
            <button  style={{'backgroundColor' : "#777978"}}>OUT OF STOCK</button>
          )}
          <p dangerouslySetInnerHTML={{ __html:product.description }} className="itemDescription"></p>
      </div>
    </div>
  );
}
