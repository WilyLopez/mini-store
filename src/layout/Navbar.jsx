import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'
import CartIcon from '../features/cart/CartIcon'

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <h1>LOGO</h1>
      </Link>

      <ul className="menu">
        <li><Link className="menu-link" to="/">Inicio</Link></li>
        <li><Link className="menu-link" to="/productos">Productos</Link></li>
        <li><Link className="menu-link" to="/nosotros">Nosotros</Link></li>
        <li><Link className="menu-link" to="/contacto">Contacto</Link></li>
      </ul>

      <div className="navbar-actions">
        <SearchBar />
        <CartIcon />
      </div>
    </nav>
  )
}

export default Navbar
