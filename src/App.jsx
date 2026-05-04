import { BrowserRouter } from "react-router-dom"
import { CartProvider } from "./context/CartContext"
import Navbar    from "./layout/Navbar"
import CartPanel from "./features/cart/CartPanel"
import AppRoutes from "./routes/AppRoutes"
import "./index.css"

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />
        <CartPanel />
        <AppRoutes />
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
