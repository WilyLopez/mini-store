const DeleteConfirmModal = ({ nombre, onConfirm, onCancel }) => {
  return (
    <>
      <div className="modal-overlay" onClick={onCancel} />
      <div className="modal modal-confirm" role="dialog" aria-modal="true">
        <div className="modal-delete-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
          </svg>
        </div>

        <h2 className="modal-title">¿Eliminar producto?</h2>
        <p className="modal-text">
          Estás a punto de eliminar <strong>{nombre}</strong>.
          Esta acción no se puede deshacer.
        </p>

        <div className="modal-confirm-actions">
          <button className="button button-secondary" onClick={onCancel}>
            Cancelar
          </button>
          <button className="btn-delete-confirm" onClick={onConfirm}>
            Sí, eliminar
          </button>
        </div>
      </div>
    </>
  )
}

export default DeleteConfirmModal
