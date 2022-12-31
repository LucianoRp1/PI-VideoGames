import React from 'react'
import './paginated.css'

const Paginated = ({videogamesPerPage, allVideogames, paginado}) => {
	const pageNumbers = [];

	for( let i = 1 ; i <= Math.ceil(allVideogames/videogamesPerPage) ; i++){
		pageNumbers.push(i)
	}
	return (
		
		<div className='pagination_container'>
                { pageNumbers && pageNumbers.map(number => (
                   <div className='pages'> <a  key={number} href onClick={() => paginado(number)}>{number}</a></div>
                  ))}
        </div>
	)
}

export default Paginated;