import { Routes, Route } from "react-router-dom"
import Home                from "../pages/Home"
import Nosotros            from "../pages/Nosotros"
import Contacto            from "../pages/Contacto"
import ItemListContainer   from "../features/catalog/ItemListContainer"
import ItemDetailContainer from "../features/catalog/ItemDetailContainer"
import Checkout            from "../features/checkout/Checkout"
import AdminProductos      from "../features/admin/AdminProductos"
import AdminPedidos        from "../features/admin/AdminPedidos"

const AppRoutes = () => (
  <Routes>
    <Route path="/"                element={<Home />} />
    <Route path="/productos"       element={<ItemListContainer />} />
    <Route path="/item/:id"        element={<ItemDetailContainer />} />
    <Route path="/checkout"        element={<Checkout />} />
    <Route path="/nosotros"        element={<Nosotros />} />
    <Route path="/contacto"        element={<Contacto />} />
    <Route path="/admin/productos" element={<AdminProductos />} />
    <Route path="/admin/pedidos"   element={<AdminPedidos />} />
  </Routes>
)

export default AppRoutes
