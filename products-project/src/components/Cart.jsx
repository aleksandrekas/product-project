import CartItem from "./CartItem"
import { useSelector,useDispatch } from "react-redux";

export function Cart({status}){
    const cartItems = useSelector((state)=> state.cart.cartItems)


    return (
        <div style={{display: status? 'block' : 'none'}} className="cartContainer">
            <div className="cart">
                <h1>My Bag,</h1>
                <div className="itemContainer">
                    {cartItems.map((item,index)=>(
                        <CartItem
                            key={index}
                            name={item.name}
                            price={item.price}
                            image={item.image}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}