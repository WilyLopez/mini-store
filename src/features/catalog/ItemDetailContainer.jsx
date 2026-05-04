import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../firebase/config"
import ItemDetail from "./ItemDetail"

const ItemDetailContainer = () => {
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const [productos, setProductos] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDocs(collection(db, "productos"))
      .then((snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setProductos(data)
        const found = data.find(p => p.id === id)
        if (found) {
          setItem(found)
        } else {
          setError("Producto no encontrado")
        }
      })
      .catch(() => setError("Error al cargar el producto"))
      .finally(() => setLoading(false))
  }, [id])

  const index = productos.findIndex(p => p.id === id)
  const prevItem = index > 0 ? productos[index - 1] : null
  const nextItem = index >= 0 && index < productos.length - 1 ? productos[index + 1] : null

  if (loading) return <div className="container"><p className="loading">Cargando detalle...</p></div>
  if (error)   return <div className="container"><p className="error-message">{error}</p></div>

  return (
    <div className="container detail-container">
      <ItemDetail item={item} prevItem={prevItem} nextItem={nextItem} />
    </div>
  )
}

export default ItemDetailContainer
