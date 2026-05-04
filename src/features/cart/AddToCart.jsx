import { useState } from 'react'
import { useCart } from '../../context/CartContext'

const AddToCart = ({ product }) => {
  const [qty, setQty] = useState(1)
  const { addItem } = useCart()

  const handleAdd = () => {
    addItem(product, qty)
    setQty(1)
  }

  return (
    <div className="add-to-cart">
      <div className="qty-selector">
        <button onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Reducir">−</button>
        <span className="qty-value">{qty}</span>
        <button onClick={() => setQty(q => q + 1)} aria-label="Aumentar">+</button>
      </div>
      <button className="btn-add-cart" onClick={handleAdd}>
        Agregar al carrito
      </button>
    </div>
  )
}

export default AddToCart
