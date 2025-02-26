


export default function ProducItem({imageUrl,title,price}){
    return (
        <div className="productItem">
            <img src={imageUrl} alt="" className="prevImage" />
            <p className="prevTitle">{title}</p>
            <p className="prevPrice">${price}</p>
            <button><img src="src\assets\Vector.svg" alt="" /></button>
        </div>
    )
}