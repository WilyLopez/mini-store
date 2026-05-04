import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const SearchBar = () => {
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    setQuery(searchParams.get('q') || '')
  }, [searchParams])

  const handleSubmit = (e) => {
    e.preventDefault()
    const q = query.trim()
    navigate(`/productos${q ? `?q=${encodeURIComponent(q)}` : ''}`)
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Buscar productos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-btn" aria-label="Buscar">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </button>
    </form>
  )
}

export default SearchBar
