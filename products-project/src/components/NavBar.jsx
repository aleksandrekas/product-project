import {NavLink} from 'react-router-dom'
import { CartItem } from './CartItem'
import { useState } from 'react'


export default function NavBar(){
    const [cartStatus,setCartStatus] = useState(false)

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
            <img className='logo'  src="src\assets\a-logo.svg" alt="logo" />
            <button onClick={handleCartBtn}><img src="src\assets\Empty Cart.svg" alt="logo" /></button>
            <CartItem status={cartStatus} />
        </nav>
    )
}