import { useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"
import { addItem,updateTotalItems } from "../store/cartSlice";

export default function ProducItem({item}){
    const dispatch = useDispatch()

    const selectedAttributes = item.attributes?.reduce((acc, attr) => {
        acc[attr.atr_name] = attr.item?.[0]?.value || null;
        return acc;
      }, {}) || {};
    
    const itemObj = {
        name:item.name,
        price:item.price,
        image:item.images[0].image_url,
        attributes:item.attributes,
        selectedAttributes:selectedAttributes,
        quantity: 1
    };

    function add(){
        dispatch(addItem(itemObj))
        dispatch(updateTotalItems())
    }


    return (
        <div className="productItem">
            <div style={{display : item.in_stock? 'none': 'flex'}} className="out-of-stock">
                <h1>OUT OF STOCK</h1>
            </div>
            <img style={{opacity:item.in_stock? '1': '0.5'}} src={item.images?.[0]?.image_url || "default-image-url.jpg"} alt="" className="prevImage" />
            <NavLink   className="singleItemNavLink" to={`/singleItem/${item.id}`}>
                <p className="prevTitle">{item.name}</p>
            </NavLink>
            <p className="prevPrice">${item.price}</p>
            <button disabled={item.in_stock? false : true} onClick={add}  style={{background:item.in_stock? '#5ECE7B':'#777978'}} ><img  src="/Vector.svg" alt="" /></button>
        </div>
    )
}