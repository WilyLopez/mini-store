import { Link } from "react-router-dom"
import AddToCart from "../cart/AddToCart"

const ItemDetail = ({ item, prevItem, nextItem }) => {
  return (
    <div className="producto-detalle">
      <img src={item.imagen} alt={item.titulo} className="detalle-imagen" />
      <div className="detalle-contenido">
        <span className="detalle-categoria-badge">{item.categoria}</span>
        <h3 className="detalle-titulo">{item.titulo}</h3>
        <p className="detalle-descripcion">{item.descripcion}</p>
        <p className="detalle-precio">s/. {item.precio}</p>
        <AddToCart product={item} />
        <div className="detail-actions">
          <Link to="/productos" className="button button-secondary">← Volver</Link>
          {prevItem && <Link to={`/item/${prevItem.id}`} className="button button-secondary">‹ Anterior</Link>}
          {nextItem && <Link to={`/item/${nextItem.id}`} className="button button-secondary">Siguiente ›</Link>}
        </div>
      </div>
    </div>
  )
}

export default ItemDetail
