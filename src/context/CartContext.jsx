import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const addItem = (product, qty = 1) => {
    setItems(prev => {
      const found = prev.find(i => i.id === product.id)
      if (found) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i)
      }
      return [...prev, { ...product, qty }]
    })
    setIsOpen(true)
  }

  const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id))

  const updateQty = (id, qty) => {
    if (qty <= 0) { removeItem(id); return }
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }

  const clearCart = () => setItems([])

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0)
  const subtotal = items.reduce((sum, i) => sum + i.precio * i.qty, 0)
  const envio = subtotal > 0 && subtotal < 200 ? 15 : 0
  const total = subtotal + envio

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQty, clearCart,
      isOpen, setIsOpen,
      totalItems, subtotal, envio, total
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
