


export default function ItemsContainer({title,children}){
    return(
        <div className="container">
            <h1>{title}</h1>
            <div className="itemsListed">
                {children}
            </div>

        </div>
    )
}