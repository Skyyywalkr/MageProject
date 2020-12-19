import React from 'react'

export default function SearchBox({ placeHolder , handleChange}) {
    return (
        <div className="search-center">

<input className="search" type='search' 
        placeholder={placeHolder} 
        onChange={handleChange}/>
            
        </div>
    )
}
