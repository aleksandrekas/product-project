


export default function ProducItem({imageUrl,title,price,stock}){




    return (
        <div className="productItem">
            <div style={{display : stock? 'none': 'flex'}} className="out-of-stock">
                <h1>OUT OF STOCK</h1>
            </div>
            <img style={{opacity:stock? '1': '0.5'}} src={imageUrl} alt="" className="prevImage" />
            <p className="prevTitle">{title}</p>
            <p className="prevPrice">${price}</p>
            <button style={{background:stock? '#5ECE7B':'#777978'}} ><img  src="src\assets\Vector.svg" alt="" /></button>
        </div>
    )
}