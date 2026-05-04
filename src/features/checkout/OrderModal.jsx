const OrderModal = ({ pedidoId, nombre, onClose }) => {
  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal" role="dialog" aria-modal="true">
        <div className="modal-success-icon">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h2 className="modal-title">¡Gracias por tu compra, {nombre}!</h2>
        <p className="modal-text">Tu pedido fue registrado exitosamente.</p>

        <div className="modal-order-box">
          <span className="modal-order-label">N° de pedido</span>
          <span className="modal-order-id">{pedidoId}</span>
        </div>

        <p className="modal-subtext">
          Te contactaremos pronto para coordinar la entrega.
        </p>

        <button className="modal-btn" onClick={onClose}>Volver al inicio</button>
      </div>
    </>
  )
}

export default OrderModal
