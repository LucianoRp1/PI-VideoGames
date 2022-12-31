import React from 'react'
import './card.css'
const Card = ({img, name, genre}) => {  //no necesito traerme ningun estado por que hago la logica en home

	return (
		<div className='containerCard1'>
		<h2 className='nameCard'>{name}</h2>
		
		<img className='imgCss' src={img} alt='img not found' />
		
		<h3 className='genreCard'>Genre : {genre} </h3>

		</div>
	)
}

export default Card;