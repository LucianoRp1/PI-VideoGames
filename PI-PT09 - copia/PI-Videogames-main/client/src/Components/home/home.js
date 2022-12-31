import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getVideogames, getGenres, filterVideogamesByGenre, filterCreated, orderByName, orderByRating } from '../../actions/index.js'
import { Link } from 'react-router-dom';
import Card from '../card/card.js'
import Paginated from '../paginated/paginated.js'
import SearchBar from '../searchBar/searchBar.js'
import './home.css'



const Home = () => {
	const dispatch = useDispatch(); //despacho mis actions
	const allVideogames = useSelector((state) => state.videogames);//con useSelector hago q me traiga todo lo q está en el estado de videogame, sustituye al mapStateToProps
	
	const [currentPage, setCurrentPage] = useState(1); //pagina actual arranca en 1
	const [videogamesPerPage, setVideogamesPerPage] = useState(16); //juegos  por pagina
	const indexOfLasVideogames = currentPage * videogamesPerPage; // indice del ultimo juego. Mi pagina por los juegos por pagina
	const indexOfFirstVideogames = indexOfLasVideogames - videogamesPerPage; // indice del ultimo juego menos la cant de juegos por pagina
	const currentVideogames = allVideogames.slice(indexOfFirstVideogames, indexOfLasVideogames) // me traigo del reducer el estado videogames
	const [order, setOrder] = useState('')
	const [rating, setRating] = useState('')



	const paginado = (pageNumber) =>{
		setCurrentPage(pageNumber) // seteo la pagina a un numero de pagina
	}


	useEffect(() =>{
		dispatch(getVideogames())
		dispatch(getGenres())
	}, [dispatch]); //arreglo vacío para que no dependa de nada



function handleClick(e){
	e.preventDefault(); //Cancela la acción del evento, evita que se recargue la pagina ante un evento
	dispatch(getVideogames());
};


function handlefilterVideogamesByGenre(e){
	e.preventDefault();
	if(e.target.value === 'all'){
		dispatch(getVideogames())
	}else{
		dispatch(filterVideogamesByGenre(e.target.value));
		setCurrentPage(1)
	}
	
		
	
};


function handleFilterCreated(e){
	e.preventDefault();
	dispatch(filterCreated(e.target.value)) 
}

function handleOrderByName(e){
	e.preventDefault();
	if(e.target.value === 'All'){
		dispatch(getVideogames())
	} else {
		dispatch(orderByName(e.target.value))
		setCurrentPage(1)
		setOrder(`Ordenado, ${e.target.value}`)
	}
	// dispatch(orderByName(e.target.value))
	 
	// setOrder(`Ordenado ${e.target.value}`)
}


function handleOrderByRating(e){
	e.preventDefault()
	if( e.target.value === 'All') {
		dispatch(getVideogames())
	}else{
		dispatch(orderByRating(e.target.value))
		setCurrentPage(1)
		setRating(`('Ordenado', ${e.target.value})`)
	}
}





	return (

		<div>
				<div ><h1 className='titleStyle'></h1></div>
		<div className='searchBar'>
		<SearchBar/>
		</div>
		<div>
			
			<button className='btnReload' onClick={(e) => {handleClick(e)}}>Reload Page</button>
			
			
			</div>
		<div className='containerCreate' >
			<Link className='createBtn' to='/create'>Create Videogames</Link>
			</div>
			<div className='optionsStyle'>
			<select className='selectGame' onChange={ e => handleFilterCreated(e)}>
			<option value='All'>TODOS</option>
			<option value='created'>Creados</option>
			<option value='api'>Existentes</option>
			</select>
			<select className='selectGame2' onChange={ e => handleOrderByName(e)}>
			<option  value='All'>ALPHABE ORDER</option>
			<option value='asc'>A-Z</option>
			<option value='desc'>Z-A</option>
			</select>
			<select className='selectGame3' onChange={(e) => handleOrderByRating(e)}>
			<option value='All'>RATINGS</option>
			<option value='asc'>MAYOR</option>
			<option value='desc'>MENOR</option>
			</select>
			<select className='selectGame4' onChange={ e => handlefilterVideogamesByGenre(e)}>
			<option value="all">GENRES</option>
			<option value="Strategy">Strategy</option>
			<option value="Shooter">Shooter</option>
			<option value="Racing">Racing</option>
			<option value="Educational">Educational</option>
			<option value="Indie">Indie</option>
			<option value="Adventure">Adventure</option>
			<option value="Simulation">Simulation</option>
			<option value="Casual">Casual</option>
			<option value="RPG">RPG</option>
			<option value="Massively Multiplayer">Massively Multiplayer</option>
			<option value="Family">Family</option>
			<option value="Card">Card</option>
			<option value="Arcade">Arcade</option>
			<option value="Fighting">Fighting</option>
			<option value="Board Games">Board Games</option>
			<option value="Action">Action</option>
			<option value="Puzzle">Puzzle</option>
			<option value="Sports">Sports</option>
			</select>
			</div>
			


		<div className='pagination'>
			<Paginated
			videogamesPerPage ={videogamesPerPage}
			allVideogames= {allVideogames.length}
			paginado = {paginado}
			/>
			</div>
			
			<div className='containerCard'>

			{
				currentVideogames?.map((el) =>{
					return(
					
					<Link className='linkCard' to={'/videogames/' + el.id} >
					<Card
					 key={el.id} 
					id={el.id}
					img={el.background_image ? el.background_image : el.image} 
					name={el.name} 
					genre={el.genre + "  "}
					 
					/>
					</Link>
					
					
					);
				})
			}
			</div>


			<div className='pagination'>
			<Paginated
			videogamesPerPage ={videogamesPerPage}
			allVideogames= {allVideogames.length}
			paginado = {paginado}
			/>
			</div>
			
		</div>
	)
}



export default Home;
