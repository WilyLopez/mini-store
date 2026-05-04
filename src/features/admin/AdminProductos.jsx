import { useEffect, useState } from 'react'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import ProductoForm from './ProductoForm'
import DeleteConfirmModal from './DeleteConfirmModal'

const AdminProductos = () => {
  const [productos, setProductos]     = useState([])
  const [loading, setLoading]         = useState(true)
  const [formOpen, setFormOpen]       = useState(false)
  const [editando, setEditando]       = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const fetchProductos = () => {
    setLoading(true)
    getDocs(collection(db, 'productos'))
      .then(snap => setProductos(snap.docs.map(d => ({ id: d.id, ...d.data() }))))
      .catch(err => console.error('Error al cargar productos:', err))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchProductos() }, [])

  const handleEditar = (producto) => {
    setEditando(producto)
    setFormOpen(true)
  }

  const handleNuevo = () => {
    setEditando(null)
    setFormOpen(true)
  }

  const handleFormClose = (refresh) => {
    setFormOpen(false)
    setEditando(null)
    if (refresh) fetchProductos()
  }

  const handleDeleteConfirm = async () => {
    try {
      await deleteDoc(doc(db, 'productos', deleteTarget.id))
      setDeleteTarget(null)
      fetchProductos()
    } catch (err) {
      console.error('Error al eliminar:', err)
    }
  }

  return (
    <div className="container">
      <div className="admin-header">
        <div>
          <h1 className="title">Gestión de Productos</h1>
          <p className="subtitle">{productos.length} productos registrados</p>
        </div>
        <button className="btn-admin-add" onClick={handleNuevo}>
          + Agregar producto
        </button>
      </div>

      {loading ? (
        <p className="loading">Cargando productos...</p>
      ) : (
        <div className="admin-table-wrapper page-card">
          {productos.length === 0 ? (
            <div className="admin-empty">
              <p>No hay productos registrados.</p>
              <button className="btn-admin-add" onClick={handleNuevo}>Agregar el primero</button>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Título</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map(p => (
                  <tr key={p.id}>
                    <td>
                      <img src={p.imagen} alt={p.titulo} className="admin-table-img" />
                    </td>
                    <td>
                      <p className="admin-table-title">{p.titulo}</p>
                      <p className="admin-table-desc">{p.descripcion}</p>
                    </td>
                    <td>
                      <span className="producto-categoria-badge">{p.categoria}</span>
                    </td>
                    <td className="admin-table-price">s/. {p.precio}</td>
                    <td>
                      <div className="admin-table-actions">
                        <button className="btn-edit" onClick={() => handleEditar(p)}>
                          Editar
                        </button>
                        <button className="btn-delete" onClick={() => setDeleteTarget(p)}>
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {formOpen && (
        <ProductoForm producto={editando} onClose={handleFormClose} />
      )}

      {deleteTarget && (
        <DeleteConfirmModal
          nombre={deleteTarget.titulo}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  )
}

export default AdminProductos
