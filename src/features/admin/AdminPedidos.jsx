import { useEffect, useState } from 'react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../../firebase/config'
import PedidoDetailModal from './PedidoDetailModal'

const ESTADO_CONFIG = {
  pendiente:   { label: 'Pendiente',   class: 'badge-pendiente' },
  en_proceso:  { label: 'En proceso',  class: 'badge-en-proceso' },
  enviado:     { label: 'Enviado',     class: 'badge-enviado' },
  entregado:   { label: 'Entregado',   class: 'badge-entregado' },
  cancelado:   { label: 'Cancelado',   class: 'badge-cancelado' },
}

const formatFecha = (fecha) => {
  if (!fecha) return '—'
  const date = fecha.toDate ? fecha.toDate() : new Date(fecha.seconds * 1000)
  return date.toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

const AdminPedidos = () => {
  const [pedidos, setPedidos]         = useState([])
  const [loading, setLoading]         = useState(true)
  const [selectedPedido, setSelected] = useState(null)

  const fetchPedidos = () => {
    setLoading(true)
    const q = query(collection(db, 'pedidos'), orderBy('fecha', 'desc'))
    getDocs(q)
      .then(snap => setPedidos(snap.docs.map(d => ({ id: d.id, ...d.data() }))))
      .catch(err => console.error('Error al cargar pedidos:', err))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchPedidos() }, [])

  const handleCloseModal = (refresh) => {
    setSelected(null)
    if (refresh) fetchPedidos()
  }

  const estado = (e) => ESTADO_CONFIG[e] ?? { label: e, class: 'badge-pendiente' }

  return (
    <div className="container">
      <div className="admin-header">
        <div>
          <h1 className="title">Pedidos</h1>
          <p className="subtitle">{pedidos.length} pedido{pedidos.length !== 1 ? 's' : ''} registrado{pedidos.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {loading ? (
        <p className="loading">Cargando pedidos...</p>
      ) : (
        <div className="admin-table-wrapper page-card">
          {pedidos.length === 0 ? (
            <div className="admin-empty">
              <p>Aún no hay pedidos registrados.</p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>N° Pedido</th>
                  <th>Cliente</th>
                  <th>Email</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map(p => (
                  <tr key={p.id}>
                    <td>
                      <span className="pedido-id">{p.id.slice(0, 8).toUpperCase()}…</span>
                    </td>
                    <td>
                      <p className="admin-table-title">{p.nombre} {p.apellido}</p>
                      <p className="admin-table-desc">{p.ciudad}</p>
                    </td>
                    <td className="pedido-email">{p.email}</td>
                    <td className="admin-table-price">s/. {Number(p.total).toFixed(2)}</td>
                    <td>
                      <span className={`estado-badge ${estado(p.estado).class}`}>
                        {estado(p.estado).label}
                      </span>
                    </td>
                    <td className="pedido-fecha">{formatFecha(p.fecha)}</td>
                    <td>
                      <button className="btn-edit" onClick={() => setSelected(p)}>
                        Ver detalle
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {selectedPedido && (
        <PedidoDetailModal pedido={selectedPedido} onClose={handleCloseModal} />
      )}
    </div>
  )
}

export default AdminPedidos
