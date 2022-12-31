import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {getVideogamesName} from '../../actions/index.js'
import './searchBar.css'

const SearchBar = () => {
	const dispatch = useDispatch()
	const [name, setName] = useState('')

	function handleInputChange(e){
		e.preventDefault()
		setName(e.target.value)
		// console.log(name)
	}


	function handleSubmit(e){
		e.preventDefault()
		dispatch(getVideogamesName(name))
		setName('')
	}
	return (
		<div>
			<input
			className='searchInput'
			type= 'text'
			placeholder= 'Buscar' 
			onChange={(e) => handleInputChange(e)}
			required
			/>
			<button className='btnSearch' type='submit' onClick={(e) => handleSubmit(e)}>Buscar</button>
		</div>
	)
}



export default SearchBar