

export default function CartItem({name,price,image,attributes,selectedAttribute}){
    return (
        <div className="cartItem">
            <div className="cartLeft">
                <div className="itemInfo">
                    <h1>{name}</h1>
                    <h4>${price}</h4>
                </div>
                <div className="quantityControl">
                    <div className="plus">
                        <img src="src\assets\add-outline.svg" alt="" />
                    </div>
                    <h4>1</h4>
                    <div className="minus">
                        <img src="src\assets\remove-outline.svg" alt="" />
                    </div>
                </div>
            </div>
            <div className="cartRight">
                <img className="cartImage" src={image} alt="item image" />
            </div>
        </div>
    )
}