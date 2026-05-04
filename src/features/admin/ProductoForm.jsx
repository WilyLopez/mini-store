import { useState } from 'react'
import { collection, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase/config'

const CATEGORIAS = ['Tecnologia', 'Accesorios', 'Audio', 'Hogar', 'Ropa', 'Otro']

const emptyForm = {
  titulo: '', descripcion: '', categoria: 'Tecnologia', precio: '', imagen: ''
}

const ProductoForm = ({ producto, onClose }) => {
  const isEditing = Boolean(producto)

  const [form, setForm] = useState(
    isEditing
      ? {
          titulo:      producto.titulo,
          descripcion: producto.descripcion,
          categoria:   producto.categoria,
          precio:      String(producto.precio),
          imagen:      producto.imagen
        }
      : emptyForm
  )
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.titulo.trim())       e.titulo      = 'Campo requerido'
    if (!form.descripcion.trim())  e.descripcion = 'Campo requerido'
    if (!form.categoria)           e.categoria   = 'Campo requerido'
    if (!form.precio || isNaN(Number(form.precio)) || Number(form.precio) <= 0)
                                   e.precio      = 'Ingresa un precio válido'
    if (!form.imagen.trim())       e.imagen      = 'Campo requerido'
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
      const data = {
        titulo:      form.titulo.trim(),
        descripcion: form.descripcion.trim(),
        categoria:   form.categoria,
        precio:      Number(form.precio),
        imagen:      form.imagen.trim(),
      }
      if (isEditing) {
        await updateDoc(doc(db, 'productos', producto.id), data)
      } else {
        await addDoc(collection(db, 'productos'), {
          ...data,
          fechaCreacion: serverTimestamp()
        })
      }
      onClose(true)
    } catch (err) {
      console.error('Error al guardar producto:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="modal-overlay" onClick={() => onClose(false)} />
      <div className="modal modal-form" role="dialog" aria-modal="true">
        <div className="modal-form-header">
          <h2 className="modal-form-title">
            {isEditing ? 'Editar producto' : 'Nuevo producto'}
          </h2>
          <button className="cart-close-btn" onClick={() => onClose(false)}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="checkout-form" noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="p-titulo">Título *</label>
            <input
              id="p-titulo" name="titulo" value={form.titulo}
              onChange={handleChange} placeholder="Nombre del producto"
              className={`form-input${errors.titulo ? ' form-input--error' : ''}`}
            />
            {errors.titulo && <span className="form-error">{errors.titulo}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="p-descripcion">Descripción *</label>
            <textarea
              id="p-descripcion" name="descripcion" value={form.descripcion}
              onChange={handleChange} placeholder="Descripción del producto"
              rows={3}
              className={`form-input form-textarea${errors.descripcion ? ' form-input--error' : ''}`}
            />
            {errors.descripcion && <span className="form-error">{errors.descripcion}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="p-categoria">Categoría *</label>
              <select
                id="p-categoria" name="categoria" value={form.categoria}
                onChange={handleChange} className="form-input"
              >
                {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="p-precio">Precio (s/.) *</label>
              <input
                id="p-precio" name="precio" value={form.precio}
                onChange={handleChange} placeholder="0.00"
                type="number" min="0" step="0.01"
                className={`form-input${errors.precio ? ' form-input--error' : ''}`}
              />
              {errors.precio && <span className="form-error">{errors.precio}</span>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="p-imagen">URL de imagen *</label>
            <input
              id="p-imagen" name="imagen" value={form.imagen}
              onChange={handleChange} placeholder="https://..."
              className={`form-input${errors.imagen ? ' form-input--error' : ''}`}
            />
            {errors.imagen && <span className="form-error">{errors.imagen}</span>}
            {form.imagen && (
              <img
                src={form.imagen} alt="Vista previa"
                className="form-img-preview"
                onError={e => { e.target.style.display = 'none' }}
              />
            )}
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="button button-secondary"
              onClick={() => onClose(false)}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="checkout-submit-btn form-submit-btn"
              disabled={loading}
            >
              {loading ? 'Guardando...' : isEditing ? 'Guardar cambios' : 'Crear producto'}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default ProductoForm
