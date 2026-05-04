import { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase/config'

const emptyForm = { nombre: '', email: '', asunto: '', mensaje: '' }

const Contacto = () => {
  const [form, setForm]       = useState(emptyForm)
  const [errors, setErrors]   = useState({})
  const [loading, setLoading] = useState(false)
  const [enviado, setEnviado] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.nombre.trim())  e.nombre  = 'Campo requerido'
    if (!form.email.trim())   e.email   = 'Campo requerido'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email inválido'
    if (!form.asunto.trim())  e.asunto  = 'Campo requerido'
    if (!form.mensaje.trim()) e.mensaje = 'Campo requerido'
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
      await addDoc(collection(db, 'mensajes'), { ...form, fecha: serverTimestamp() })
      setEnviado(true)
      setForm(emptyForm)
    } catch (err) {
      console.error('Error al enviar mensaje:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="contact-layout">
        <aside className="contact-info page-card">
          <h1 className="title">Contacto</h1>
          <p className="subtitle">Escríbenos y te responderemos a la brevedad.</p>
          <div className="contact-details">
            <div className="contact-detail-item">
              <span className="contact-detail-icon">📍</span>
              <div>
                <p className="contact-detail-label">Dirección</p>
                <p className="contact-detail-value">Av. Principal 123, Lima, Perú</p>
              </div>
            </div>
            <div className="contact-detail-item">
              <span className="contact-detail-icon">📧</span>
              <div>
                <p className="contact-detail-label">Email</p>
                <p className="contact-detail-value">contacto@tienda.com</p>
              </div>
            </div>
            <div className="contact-detail-item">
              <span className="contact-detail-icon">📞</span>
              <div>
                <p className="contact-detail-label">Teléfono</p>
                <p className="contact-detail-value">+51 987 654 321</p>
              </div>
            </div>
            <div className="contact-detail-item">
              <span className="contact-detail-icon">🕐</span>
              <div>
                <p className="contact-detail-label">Horario</p>
                <p className="contact-detail-value">Lun – Vie: 9:00 am – 6:00 pm</p>
              </div>
            </div>
          </div>
        </aside>

        <section className="page-card contact-form-section">
          {enviado ? (
            <div className="contact-success">
              <div className="contact-success-icon">✓</div>
              <h2>¡Mensaje enviado!</h2>
              <p>Gracias por escribirnos. Te responderemos pronto.</p>
              <button className="button" onClick={() => setEnviado(false)}>Enviar otro mensaje</button>
            </div>
          ) : (
            <>
              <h2 className="contact-form-title">Envíanos un mensaje</h2>
              <form onSubmit={handleSubmit} className="checkout-form" noValidate>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="c-nombre">Nombre *</label>
                    <input id="c-nombre" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Tu nombre" className={`form-input${errors.nombre ? ' form-input--error' : ''}`} />
                    {errors.nombre && <span className="form-error">{errors.nombre}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="c-email">Email *</label>
                    <input id="c-email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="tu@email.com" className={`form-input${errors.email ? ' form-input--error' : ''}`} />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="c-asunto">Asunto *</label>
                  <input id="c-asunto" name="asunto" value={form.asunto} onChange={handleChange} placeholder="¿En qué podemos ayudarte?" className={`form-input${errors.asunto ? ' form-input--error' : ''}`} />
                  {errors.asunto && <span className="form-error">{errors.asunto}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="c-mensaje">Mensaje *</label>
                  <textarea id="c-mensaje" name="mensaje" value={form.mensaje} onChange={handleChange} placeholder="Escribe tu mensaje aquí..." rows={5} className={`form-input form-textarea${errors.mensaje ? ' form-input--error' : ''}`} />
                  {errors.mensaje && <span className="form-error">{errors.mensaje}</span>}
                </div>
                <button type="submit" className="checkout-submit-btn" disabled={loading}>
                  {loading ? 'Enviando...' : 'Enviar mensaje'}
                </button>
              </form>
            </>
          )}
        </section>
      </div>
    </div>
  )
}

export default Contacto
