import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useCart } from '../../context/CartContext'
import OrderModal from './OrderModal'

const emptyForm = {
  nombre: '', apellido: '', email: '',
  telefono: '', direccion: '', ciudad: ''
}

const Checkout = () => {
  const { items, subtotal, envio, total, clearCart } = useCart()
  const [form, setForm]     = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [pedidoId, setPedidoId] = useState(null)
  const navigate = useNavigate()

  const validate = () => {
    const e = {}
    if (!form.nombre.trim())    e.nombre    = 'Campo requerido'
    if (!form.apellido.trim())  e.apellido  = 'Campo requerido'
    if (!form.email.trim())     e.email     = 'Campo requerido'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email inválido'
    if (!form.telefono.trim())  e.telefono  = 'Campo requerido'
    if (!form.direccion.trim()) e.direccion = 'Campo requerido'
    if (!form.ciudad.trim())    e.ciudad    = 'Campo requerido'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    try {
      const pedido = {
        ...form,
        items: items.map(({ id, titulo, precio, qty }) => ({ id, titulo, precio, qty })),
        subtotal, envio, total,
        estado: 'pendiente',
        fecha: serverTimestamp()
      }
      const ref = await addDoc(collection(db, 'pedidos'), pedido)
      setPedidoId(ref.id)
    } catch (err) {
      console.error('Error al guardar pedido:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCloseModal = () => {
    clearCart()
    navigate('/')
  }

  if (items.length === 0 && !pedidoId) {
    return (
      <div className="container page-card checkout-empty">
        <p>No tienes productos en el carrito.</p>
        <Link to="/productos" className="button">Ver productos</Link>
      </div>
    )
  }

  return (
    <>
      {pedidoId && (
        <OrderModal pedidoId={pedidoId} nombre={form.nombre} onClose={handleCloseModal} />
      )}

      <div className="container checkout-wrapper">
        <section className="page-card checkout-form-section">
          <h1 className="title">Datos de entrega</h1>
          <p className="subtitle">Completa tus datos para finalizar la compra.</p>

          <form onSubmit={handleSubmit} className="checkout-form" noValidate>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="nombre">Nombre *</label>
                <input id="nombre" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Juan" className={`form-input${errors.nombre ? ' form-input--error' : ''}`} />
                {errors.nombre && <span className="form-error">{errors.nombre}</span>}
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="apellido">Apellido *</label>
                <input id="apellido" name="apellido" value={form.apellido} onChange={handleChange} placeholder="Pérez" className={`form-input${errors.apellido ? ' form-input--error' : ''}`} />
                {errors.apellido && <span className="form-error">{errors.apellido}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email *</label>
                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="juan@email.com" className={`form-input${errors.email ? ' form-input--error' : ''}`} />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="telefono">Teléfono *</label>
                <input id="telefono" name="telefono" value={form.telefono} onChange={handleChange} placeholder="987 654 321" className={`form-input${errors.telefono ? ' form-input--error' : ''}`} />
                {errors.telefono && <span className="form-error">{errors.telefono}</span>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="direccion">Dirección *</label>
              <input id="direccion" name="direccion" value={form.direccion} onChange={handleChange} placeholder="Av. Ejemplo 123, Dpto. 4B" className={`form-input${errors.direccion ? ' form-input--error' : ''}`} />
              {errors.direccion && <span className="form-error">{errors.direccion}</span>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="ciudad">Ciudad *</label>
              <input id="ciudad" name="ciudad" value={form.ciudad} onChange={handleChange} placeholder="Lima" className={`form-input${errors.ciudad ? ' form-input--error' : ''}`} />
              {errors.ciudad && <span className="form-error">{errors.ciudad}</span>}
            </div>

            <button type="submit" className="checkout-submit-btn" disabled={loading}>
              {loading ? 'Procesando...' : `Confirmar pedido · s/. ${total.toFixed(2)}`}
            </button>
          </form>
        </section>

        <aside className="page-card checkout-summary">
          <h2 className="checkout-summary-title">Resumen del pedido</h2>
          <div className="checkout-items-list">
            {items.map(item => (
              <div key={item.id} className="checkout-item">
                <img src={item.imagen} alt={item.titulo} className="checkout-item-img" />
                <div className="checkout-item-info">
                  <p className="checkout-item-name">{item.titulo}</p>
                  <p className="checkout-item-qty">Cantidad: {item.qty}</p>
                </div>
                <span className="checkout-item-price">s/. {(item.precio * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="checkout-totals">
            <div className="cart-summary-row">
              <span>Subtotal</span><span>s/. {subtotal.toFixed(2)}</span>
            </div>
            <div className="cart-summary-row">
              <span>Envío</span>
              <span>{envio === 0 ? <span className="free-shipping">Gratis</span> : `s/. ${envio.toFixed(2)}`}</span>
            </div>
            {envio > 0 && <p className="shipping-note">Envío gratis en compras mayores a s/. 200</p>}
            <div className="cart-summary-row cart-summary-total">
              <span>Total</span><span>s/. {total.toFixed(2)}</span>
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}

export default Checkout
