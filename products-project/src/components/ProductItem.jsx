import { useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"
import { setId } from "../store/itemSlice"

export default function ProducItem({imageUrl,title,price,stock,productId}){
    const dispatch = useDispatch()





    return (
        <div className="productItem">
            <div style={{display : stock? 'none': 'flex'}} className="out-of-stock">
                <h1>OUT OF STOCK</h1>
            </div>
            <img style={{opacity:stock? '1': '0.5'}} src={imageUrl} alt="" className="prevImage" />
            <NavLink onClick={()=>dispatch(setId(productId))}  className="singleItemNavLink" to="/singleItem">
                <p className="prevTitle">{title}</p>
            </NavLink>
            <p className="prevPrice">${price}</p>
            <button  style={{background:stock? '#5ECE7B':'#777978'}} ><img  src="src\assets\Vector.svg" alt="" /></button>
        </div>
    )
}