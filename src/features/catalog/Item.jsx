import { Link } from "react-router-dom"
import { useCart } from "../../context/CartContext"

const Item = ({ item }) => {
  const { addItem } = useCart()

  return (
    <div className="producto">
      <img src={item.imagen} alt={item.titulo} className="producto-imagen" />
      <div className="producto-contenido">
        <span className="producto-categoria-badge">{item.categoria}</span>
        <h2 className="producto-titulo">{item.titulo}</h2>
        <p className="producto-descripcion">{item.descripcion}</p>
        <p className="producto-precio">s/. {item.precio}</p>
        <div className="item-actions">
          <Link className="ver-mas" to={`/item/${item.id}`}>Ver más</Link>
          <button className="btn-add-cart-quick" onClick={() => addItem(item, 1)}>
            + Carrito
          </button>
        </div>
      </div>
    </div>
  )
}

export default Item
