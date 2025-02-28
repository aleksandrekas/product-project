


export function CartItem({status}){
    return (
        <div style={{display: status? 'block' : 'none'}} className="cartContainer">
            <div className="cart">

            </div>
        </div>
    )
}