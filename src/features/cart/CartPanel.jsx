import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import CartItem from './CartItem'

const CartPanel = () => {
  const { items, isOpen, setIsOpen, subtotal, envio, total, clearCart } = useCart()
  const navigate = useNavigate()

  const handleCheckout = () => {
    setIsOpen(false)
    navigate('/checkout')
  }

  return (
    <>
      {isOpen && (
        <div className="cart-overlay" onClick={() => setIsOpen(false)} />
      )}

      <aside className={`cart-panel${isOpen ? ' cart-panel--open' : ''}`}>
        <div className="cart-panel-header">
          <h2 className="cart-panel-title">Tu carrito</h2>
          <button className="cart-close-btn" onClick={() => setIsOpen(false)} aria-label="Cerrar carrito">×</button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <p>Tu carrito está vacío</p>
          </div>
        ) : (
          <>
            <div className="cart-items-list">
              {items.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <div className="cart-summary">
              <div className="cart-summary-row">
                <span>Subtotal</span>
                <span>s/. {subtotal.toFixed(2)}</span>
              </div>
              <div className="cart-summary-row">
                <span>Envío</span>
                <span>
                  {envio === 0
                    ? <span className="free-shipping">Gratis</span>
                    : `s/. ${envio.toFixed(2)}`
                  }
                </span>
              </div>
              {envio > 0 && (
                <p className="shipping-note">Envío gratis en compras mayores a s/. 200</p>
              )}
              <div className="cart-summary-row cart-summary-total">
                <span>Total</span>
                <span>s/. {total.toFixed(2)}</span>
              </div>
              <button className="cart-checkout-btn" onClick={handleCheckout}>
                Proceder al pago →
              </button>
              <button className="cart-clear-btn" onClick={clearCart}>
                Vaciar carrito
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}

export default CartPanel
