import {NavLink} from 'react-router-dom'



export default function NavBar(){


    return(
        <nav className='navbar'>
            <div className="navLinks">
                <NavLink to="/" >ALL</NavLink>
                <NavLink to='clothes'>CLOTHES</NavLink>
                <NavLink to='tech'>TECH</NavLink>
            </div>
            <img className='logo'  src="src\assets\a-logo.svg" alt="logo" />
            <img src="src\assets\Empty Cart.svg" alt="logo" />
        </nav>
    )
}