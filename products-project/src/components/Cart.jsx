import { useEffect, useState } from "react";
import CartItem from "./CartItem"
import { useSelector,useDispatch } from "react-redux";
import { updateTotalItems,clearCart } from "../store/cartSlice";


export function Cart({status}){
    const cartItems = useSelector((state)=> state.cart.cartItems)
    const itemCount = useSelector((state)=> state.cart.totalItems)
    const dispatch = useDispatch()
    const[amount,setAmount]=useState({
        amount:itemCount,
        totalPrice:0
    })
    
    useEffect(() => {
        const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

        setAmount({
            amount: itemCount,
            totalPrice: totalPrice.toFixed(2), 
        });

        dispatch(updateTotalItems()); 
    }, [cartItems]);



    async function placeOrder(){
        const mutation = `
        mutation PlaceOrder($items: [CartItemInput!]!) {
          placeOrder(items: $items)
        }`;

        const variables = {
            items: cartItems.map(item => ({
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              selectedAttributes: Object.entries(item.selectedAttributes).map(
                ([name, value]) => ({ name, value })
              )
            }))
        };

        

        try{
            const response = await fetch("http://localhost:4000/", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  query: mutation,
                  variables
                })
            });

            console.log("done",response)

            if(response.ok){
                localStorage.setItem("cartItems", JSON.stringify([]));
                dispatch(clearCart())
            }


        }catch(error){
            console.log(error)
        }



    }


    console.log(cartItems)





    return (
        <div style={{display: status? 'block' : 'none'}} className="cartContainer">
            <div className="cart">
                <h1>My Bag,{amount.amount} Items</h1>
                <div className="itemContainer">
                    {amount.amount !==0 ? (
                        cartItems.map((item,index)=>(
                            <CartItem
                                key={index}
                                name={item.name}
                                price={item.price}
                                image={item.image}
                                attributes={item.attributes}
                                selectedAttribute={item.selectedAttributes}
                                quantity={item.quantity}
                            />
                        ))

                    ):(
                        <div className="emptyCart">
                            CART IS EMPTY
                        </div>
                    )}
                </div>
                <div className="sumAmount">
                    <h5>Total</h5>
                    <h5>${amount.totalPrice}</h5>
                </div>
                <button onClick={placeOrder} style={{backgroundColor: amount.amount === 0? "#94979c" : "#5ECE7B"}} className="placeOrderBtn">PLACE ORDER</button>
            </div>
        </div>
    )
}