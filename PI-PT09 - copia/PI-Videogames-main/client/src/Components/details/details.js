import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { Link} from "react-router-dom";
import {getDetails} from '../../actions/index.js';



const Details = ({id}) => {

	
	const dispatch = useDispatch()
	const myVideogame = useSelector((state) => state.details)


	useEffect(() =>{
		dispatch(getDetails(id))
	}, [id, dispatch])
	console.log(myVideogame)
	
	return (
		<div>
		{ myVideogame && myVideogame.name?
			<div>
			<h1>{myVideogame.name}</h1>
			<p><h2>Descripción:</h2> {myVideogame.description}</p>
			<img src={myVideogame.background_image? myVideogame.background_image : myVideogame.img} alt="Img Not Found" />
			<h3>Plataformas: {myVideogame.createdInDb? myVideogame.plataform + ' ' : myVideogame.platform.map(el => el.name  + (' '))}</h3>
			<h3>Generos: {!myVideogame.createdInDb? myVideogame.genre + ' ': myVideogame.genre.map(el => el.name  + (' ')) }</h3>
			<h4>Rating: {myVideogame.rating}</h4>
			<h4>Fecha de lanzamiento: {myVideogame.released}</h4>
				</div>: <p>Loading...</p>

			}
			<Link to='/home'>
			<button>Back</button>
			</Link>
		</div> 
		
	)
}



export default Details