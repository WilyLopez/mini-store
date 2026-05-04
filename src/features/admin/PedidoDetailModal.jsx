import { useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'

const ESTADOS = ['pendiente', 'en_proceso', 'enviado', 'entregado', 'cancelado']
const ESTADO_LABELS = {
  pendiente:  'Pendiente',
  en_proceso: 'En proceso',
  enviado:    'Enviado',
  entregado:  'Entregado',
  cancelado:  'Cancelado',
}
const ESTADO_CLASSES = {
  pendiente:  'badge-pendiente',
  en_proceso: 'badge-en-proceso',
  enviado:    'badge-enviado',
  entregado:  'badge-entregado',
  cancelado:  'badge-cancelado',
}

const formatFecha = (fecha) => {
  if (!fecha) return '—'
  const date = fecha.toDate ? fecha.toDate() : new Date(fecha.seconds * 1000)
  return date.toLocaleString('es-PE', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
}

const PedidoDetailModal = ({ pedido, onClose }) => {
  const [estado, setEstado]     = useState(pedido.estado ?? 'pendiente')
  const [saving, setSaving]     = useState(false)
  const [saved, setSaved]       = useState(false)

  const handleSaveEstado = async () => {
    if (estado === pedido.estado) { onClose(false); return }
    setSaving(true)
    try {
      await updateDoc(doc(db, 'pedidos', pedido.id), { estado })
      setSaved(true)
      setTimeout(() => onClose(true), 800)
    } catch (err) {
      console.error('Error al actualizar estado:', err)
    } finally {
      setSaving(false)
    }
  }

  const items  = pedido.items  ?? []
  const envio  = Number(pedido.envio  ?? 0)
  const total  = Number(pedido.total  ?? 0)
  const subtotal = Number(pedido.subtotal ?? 0)

  return (
    <>
      <div className="modal-overlay" onClick={() => onClose(false)} />

      <div className="modal modal-detail" role="dialog" aria-modal="true">
        {/* ── Header ── */}
        <div className="modal-detail-header">
          <div>
            <h2 className="modal-form-title">Detalle del pedido</h2>
            <p className="modal-detail-id">ID: {pedido.id}</p>
          </div>
          <button className="cart-close-btn" onClick={() => onClose(false)}>×</button>
        </div>

        <div className="modal-detail-body">
          {/* ── Estado ── */}
          <div className="detail-section">
            <h3 className="detail-section-title">Estado del pedido</h3>
            <div className="estado-row">
              <span className={`estado-badge ${ESTADO_CLASSES[estado]}`}>
                {ESTADO_LABELS[estado]}
              </span>
              <select
                value={estado}
                onChange={e => { setEstado(e.target.value); setSaved(false) }}
                className="form-input estado-select"
              >
                {ESTADOS.map(e => (
                  <option key={e} value={e}>{ESTADO_LABELS[e]}</option>
                ))}
              </select>
            </div>
          </div>

          {/* ── Datos del cliente ── */}
          <div className="detail-section">
            <h3 className="detail-section-title">Datos del cliente</h3>
            <div className="detail-info-grid">
              <div className="detail-info-item">
                <span className="detail-info-label">Nombre</span>
                <span className="detail-info-value">{pedido.nombre} {pedido.apellido}</span>
              </div>
              <div className="detail-info-item">
                <span className="detail-info-label">Email</span>
                <span className="detail-info-value">{pedido.email}</span>
              </div>
              <div className="detail-info-item">
                <span className="detail-info-label">Teléfono</span>
                <span className="detail-info-value">{pedido.telefono}</span>
              </div>
              <div className="detail-info-item">
                <span className="detail-info-label">Ciudad</span>
                <span className="detail-info-value">{pedido.ciudad}</span>
              </div>
              <div className="detail-info-item detail-info-full">
                <span className="detail-info-label">Dirección</span>
                <span className="detail-info-value">{pedido.direccion}</span>
              </div>
              <div className="detail-info-item">
                <span className="detail-info-label">Fecha del pedido</span>
                <span className="detail-info-value">{formatFecha(pedido.fecha)}</span>
              </div>
            </div>
          </div>

          {/* ── Productos ── */}
          <div className="detail-section">
            <h3 className="detail-section-title">Productos ({items.length})</h3>
            <table className="detail-items-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio unit.</th>
                  <th>Cant.</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={item.id ?? i}>
                    <td className="detail-item-name">{item.titulo}</td>
                    <td>s/. {Number(item.precio).toFixed(2)}</td>
                    <td className="detail-item-qty">{item.qty}</td>
                    <td className="detail-item-sub">s/. {(Number(item.precio) * item.qty).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Totales ── */}
          <div className="detail-section detail-totals">
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
            <div className="cart-summary-row cart-summary-total">
              <span>Total</span>
              <span>s/. {total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="modal-detail-footer">
          <button className="button button-secondary" onClick={() => onClose(false)}>
            Cerrar
          </button>
          <button
            className="checkout-submit-btn form-submit-btn"
            onClick={handleSaveEstado}
            disabled={saving}
          >
            {saved ? '✓ Guardado' : saving ? 'Guardando...' : 'Guardar estado'}
          </button>
        </div>
      </div>
    </>
  )
}

export default PedidoDetailModal
