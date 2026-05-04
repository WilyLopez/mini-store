import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../firebase/config"
import ItemList from "./ItemList"

const ItemListContainer = () => {
  const [productos, setProductos] = useState([])
  const [categoria, setCategoria] = useState("Todas")
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('q') || ''

  useEffect(() => {
    getDocs(collection(db, "productos"))
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        setProductos(data)
      })
      .catch((err) => console.error("Error al obtener productos:", err))
      .finally(() => setLoading(false))
  }, [])

  const categorias = ["Todas", ...new Set(productos.map(p => p.categoria))]

  const productosFiltrados = productos
    .filter(p => categoria === "Todas" || p.categoria === categoria)
    .filter(p => !searchQuery || p.titulo.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <section className="container page-card">
      <div className="page-header">
        <div>
          <h1 className="title">Productos</h1>
          <p className="subtitle">
            {searchQuery
              ? `Resultados para: "${searchQuery}" (${productosFiltrados.length})`
              : "Filtra por categoría para encontrar lo que buscas."
            }
          </p>
        </div>
        <div className="filter-row">
          <label htmlFor="categoria">Categoría</label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="select"
          >
            {categorias.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <p className="loading">Cargando productos...</p>
      ) : productosFiltrados.length ? (
        <ItemList items={productosFiltrados} />
      ) : (
        <p className="loading">No se encontraron productos.</p>
      )}
    </section>
  )
}

export default ItemListContainer
