import { useCart } from '../../context/CartContext'

const CartItem = ({ item }) => {
  const { removeItem, updateQty } = useCart()

  return (
    <div className="cart-item">
      <img src={item.imagen} alt={item.titulo} className="cart-item-img" />
      <div className="cart-item-info">
        <p className="cart-item-title">{item.titulo}</p>
        <p className="cart-item-price">s/. {item.precio}</p>
        <div className="cart-item-qty">
          <button onClick={() => updateQty(item.id, item.qty - 1)} aria-label="Reducir cantidad">−</button>
          <span>{item.qty}</span>
          <button onClick={() => updateQty(item.id, item.qty + 1)} aria-label="Aumentar cantidad">+</button>
        </div>
      </div>
      <div className="cart-item-right">
        <button className="cart-item-remove" onClick={() => removeItem(item.id)} aria-label="Eliminar">×</button>
        <span className="cart-item-subtotal">s/. {(item.precio * item.qty).toFixed(2)}</span>
      </div>
    </div>
  )
}

export default CartItem
