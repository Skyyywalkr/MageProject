import React from 'react'

export default function SearchBox({ placeHolder , handleChange}) {
    return (
        <div>

<input type='search' 
        placeholder={placeHolder} 
        onChange={handleChange}/>
            
        </div>
    )
}
