import { useState } from 'react';

export default function Nav() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    void: false,
    endearing: false,
    funny: false
  })
  
  const handleSearch = (event) => {
    const value = event.target.value
    setSearchTerm(value)

    /*dispatch({
      type: type, payload: {
        searchTerm: searchTerm, filters: filters
      }
    })*/
  }

  const handleCheckbox = (event) => {
    const id = event.target.id
    setFilters({
      ...filters,
      [id]: !filters[id]
    })

    /*dispatch({
      type: type, payload: {
        searchTerm: searchTerm, filters: filters
      }
    })*/
  }

  return (
    <form>
      <input type="text" name="searchTerm" value={searchTerm} onChange={handleSearch}/>
      <div className="filters-container">
        <label>
          <input type="checkbox" id="endearing" checked={filters.endearing} onChange={handleCheckbox} name="endearing" />
          Endearing
        </label>
        <label>
          <input type="checkbox" id="void" name="void"  checked={filters.void} onChange={handleCheckbox} />
          Void
        </label>
        <label>
          <input type="checkbox" id="funny" name="funny"  checked={filters.funny} onChange={handleCheckbox} />
          Funny
        </label>
        
        
        
      </div>
    </form>
  );
}