import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {postVideogames, getGenres} from '../../actions/index.js';
import {useDispatch, useSelector} from 'react-redux'
import Swal from 'sweetalert2';
import './createVideogame.css'

const CreateVideogame = () => {
	const history = useHistory()
	const dispatch = useDispatch()
	const allGenres = useSelector((state) => state.genres)
	const [errors,setErrors] = useState({})
	//console.log(genres)

	let plataformas = ["Pc" ,
 "PlayStation 5",
  "Xbox One",
   "PlayStation 4",
    "Xbox Series S/X",
     "Nintendo Switch",
      "iOS",
       "Android",
       "macOS",
        "Linux",
         "Xbox 360", 
         "PlayStation 3", 
         "PlayStation 2",
         "PlayStation 1" 
         ]



	const checkIfValidDate = (str) => {
  // regex to check if string is valid date
  const dateRegexp =
    /^[1-2][089]\d{2}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/;
  return dateRegexp.test(str);
};
console.log(checkIfValidDate)



	function validate (input) {
  let errors = {};
  if (input.name === '   ' ){
  	errors.name = Swal.fire('Error Demasiados Espacios')
  } if (!input.name) {
    errors.name = 'Nombre Requerido';
  } else if (input.name.trim() === '') {
    errors.name = ('El Nombre No Puede Estar Vacio');
  } if (input.description.length > 250){
  	errors.description = Swal.fire('A Superado El Numero De Caracteres')
  } if (!input.description) {
    errors.description = 'Descripcion Requerida';
  } else if (input.description.length > 5) {
    errors.description = 'Descripcion No Puede Tener Un Maximo De 250 Caracteres';
  }
  if (checkIfValidDate(input.released) === false) {
    errors.released = 'Invalid date ';
  } if (input.rating > 5){
  	errors.rating = Swal.fire('Supero El Rango Del Rating')
  } if (input.rating < 0){
  	errors.rating = Swal.fire('Supero El Rango Minimo Del Rating')
  } if (input.rating > 5) {
    errors.rating = 'Rating Debe Ser Menor A 5';
  } else if (input.rating <= 0) {
    errors.rating = 'Rating Debe Ser Mayor De 1';
  } else if (isNaN(parseInt(input.rating))) {
    errors.rating = 'only Numbers allowed';
  } if(input.image.length === +1){
  	errors.image = 'Inserte URL'
  }if (!input.image) {
    errors.image = 'Inserte URL';
  } if (input.genre.length < 1) {
    errors.genre = 'You have to choose at least one genre';
  }
  if (input.platforms.length < 1) {
    errors.platforms = 'You have to choose at least one platform';
  }

  return errors;
};


	
	const [input, setInput]= useState({
		name: "",
		image: "",
		description: "",
		released: "",
		rating: "",
		genre: [],
		platforms: [],
		
	})



	function handleChange(e){
		e.preventDefault()
		setInput({
			...input,
			[e.target.name] : e.target.value
		})
		//console.log(input)

		setErrors(validate({
			...input,
			[e.target.name] : e.target.value
		}));
	};


	function handleSelect(e){
setInput({
	...input,
	genre: [...input.genre,e.target.value]
})
//console.log(input)
	}



	function handleSelectPlatform(e){
setInput({
	...input,
	platforms: [...input.platforms,e.target.value]
})
	}



	function handleSubmit(e){
		e.preventDefault();
		dispatch(postVideogames(input))
		Swal.fire(
            'Good job!',
            'You Created Videogame.',
            'Success'
          )
		setInput({
        name: "",
		image: "",
		description: "",
		released: "",
		rating: "",
		genre: [],
		platforms: [],
        })
        history.push('/home')
	}



	function handleDeleteGenre (el) {
		setInput({
			...input,
			genre: input.genre.filter( g => g !== el)
		})
	}

		function handleDeletePlatforms (el) {
		setInput({
			...input,
			platforms: input.platforms.filter( g => g !== el)
		})
	}
	

	useEffect(() => {
		dispatch(getGenres());
	}, [dispatch]);


	return (
		<div>
		<div>
		<Link to='/home'><button className='btnBack'>Back</button></Link>
		</div>
		<div>
		<h1 className='createTitle'>Create Your Videogame</h1>
		</div>
		<div >
		<form onSubmit={(e) => handleSubmit(e)}>
		<button className='btnSubmit' type='submit'>Submit</button>
		<div className='formName'>
		<label>Name: </label>
		<input
		 type='text'
		 value={input.name} 
		 name='name'
		 onChange={(e) => handleChange(e)}
		 required
		 />
		 {errors.name && (
		 	<p>{errors.name}</p>
		 	)}	
		</div>
		<div className='formImg'>
		<label>Image: </label>
		<input
		 type='img'
		 value={input.image} 
		 name='image'
		 alt='not found'
		 onChange={(e) => handleChange(e)}
		 required
		 />
		 {errors.image && (
		 	<p>{errors.image}</p>
		 	)}	
		</div>
		<div className='formDsp'>
		<label>Description: </label>
		<input
		 type='text'
		 value={input.description} 
		 name='description'
		 onChange={(e) => handleChange(e)}
		 required
		 />
		 {errors.description && (
		 	<p>{errors.description}</p>
		 	)}	
		</div>
		<div className='formRld'>
		<label>Released: </label>
		<input
		 type='date'
		 value={input.released} 
		 name='released'
		 onChange={(e) => handleChange(e)}
		 required
		 />
		 {errors.released && (
		 	<p>{errors.released}</p>
		 	)}	
		</div>
		<div className='formRtg'>
		<label>Rating: </label>
		<input
		 type='number'
		 value={input.rating} 
		 name='rating'
		 onChange={(e) => handleChange(e)}
		 required
		 />
		 {errors.rating && (
		 	<p>{errors.rating}</p>
		 	)}	
		</div>
		<div className='formPlt'>
		<label>Platform: </label>
		<select onChange={(e) => {handleSelectPlatform(e)}} required>
		{plataformas?.map((platform, i) => (
			<option key={i} value={platform} required>{platform}</option>
		))}
		</select>
		{errors.platforms && (
		 	<p>{errors.platforms}</p>
		 	)}
		<ul><li>{input.platforms.map(el => el + ', ')}</li></ul>	
		</div>
		<div>
				{input.platforms.map(p => 
                <div  className='deletePlt' >
                <label className='labelPlt' >{p} </label>
                <button className='btnDelete' onClick={() => handleDeletePlatforms(p)}>X</button>  
                </div>  
            )}
            </div>
		 

		<div className='formGnr'>
		<label>Genre: </label>
		<select onChange={(e) => handleSelect(e)} required>
		{allGenres?.map((g, i) => (
			<option key={i} value={g} required>{g}</option>
		))}
		</select>
		{errors.genre && (
		 	<p>{errors.genre}</p>
		 	)}
			<ul><li>{input.genre.map(el => el + ', ')}</li></ul>
		</div>


		


		</form>
		</div>

		{input.genre.map(g => 
                <div className='deletePlt'>
                <label className='labelPlt' >{g} </label>
                <button className='btnDelete' onClick={() => handleDeleteGenre(g)}>X</button>  
                </div>  
            )}

		</div>
	)
}



export default CreateVideogame