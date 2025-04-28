

export default function CartItem({name,price,image,attributes,selectedAttribute,quantity}){

 

    return (
        <div className="cartItem">
            <div className="cartLeft">
                <div className="itemInfo">
                    <h1>{name}</h1>
                    <h6>${price}</h6>
                    {Array.isArray(attributes) && attributes.map((atr) => (
                        atr.atr_name != 'blank' && (
                            <div key={atr.id} className="cartAttribute">
                            <h4>{atr.atr_name}:</h4>
                            <div className="items">
                                {atr.item.map((item) => {
                                    const isSelected = selectedAttribute?.[atr.atr_name] === item.value;
                                    const content = atr.atr_name === 'color' ? (
                                        <div
                                        className={isSelected ? 'cartColorSelected' : 'cartColorAtr'}
                                        style={{ backgroundColor: item.value }}
                                        />
                                    ) : (
                                        <div className={isSelected ? "cartAtr chosen" : "cartAtr"}>{item.value}</div>
                                    );
                                    return (
                                        <div className="cartAtrItem" key={item.id}>{content}</div>
                                    );
                                })}
                            </div>
                            </div>
                    )
                    ))}
                </div>
                <div className="quantityControl">
                    <div className="plus">
                        <img src="src\assets\add-outline.svg" alt="" />
                    </div>
                    <h4>{quantity}</h4>
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