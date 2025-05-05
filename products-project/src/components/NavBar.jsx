import {NavLink} from 'react-router-dom'
import { Cart } from './Cart'
import { useState } from 'react'
import { useSelector } from 'react-redux'


export default function NavBar(){
    const [cartStatus,setCartStatus] = useState(false)
    const itemCount = useSelector((state)=> state.cart.totalItems)



    function handleCartBtn(){
        setCartStatus((prev)=>{
            return  !prev;
        })
    }

    return(
        <nav className='navbar'>
            <div className="navLinks">
                <NavLink to="/" >ALL</NavLink>
                <NavLink to='clothes'>CLOTHES</NavLink>
                <NavLink to='tech'>TECH</NavLink>
            </div>
            <img className='logo'  src="/a-logo.svg" alt="logo" />
            <button className='cartBtn' onClick={handleCartBtn}>
                <img src="/Empty Cart.svg" alt="logo" />
                <div style={{display: itemCount > 0 ? "flex" : "none"}} className="cartBtnQuantity">{itemCount}</div>
            </button>
            <Cart status={cartStatus} />
        </nav>
    )
}