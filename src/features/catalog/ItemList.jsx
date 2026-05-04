import Item from "./Item"

const ItemList = ({ items }) => {
  return (
    <div className="item-list-container">
      <h2 className="products-title">Productos</h2>
      <div className="productos">
        {items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default ItemList
