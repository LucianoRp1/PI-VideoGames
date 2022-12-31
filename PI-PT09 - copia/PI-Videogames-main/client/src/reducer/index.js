const initialState = {
	videogames : [],
	allVideogames: [],
	genres: [],
	details: [],
}



function rootReducer(state= initialState, action){
	switch(action.type){
	case 'GET_VIDEOGAMES':
		return{
			...state,
			videogames: action.payload,
			allVideogames: action.payload
		}
	case 'FILTER_BY_GENRE':
       const allVideogames = state.allVideogames 
		const genreFilter = action.payload === 'all' ? allVideogames : allVideogames.filter(el => el.genre?.some(e => e.includes(action.payload)))
		 console.log(genreFilter)
		return{
			...state,
			videogames: genreFilter
		}
	case 'GET_GENRES':
		return{
			...state,
			genres: action.payload
		}
	case 'FILTER_CREATED':
		const games = state.allVideogames;
		const filterGameCreated = action.payload === 'created' ? 
		games.filter(el => el.createdInDb) :
		games.filter(el => !el.createdInDb)
		console.log(filterGameCreated)
		return{
			...state,
			videogames: action.payload === 'All' ?
			 state.allVideogames : filterGameCreated
		}
	case 'ORDER_BY_NAME':
		let orderArr = action.payload === 'asc' ?
		state.videogames.sort(function (a,b) {
			if(a.name > b.name){
				return 1;
			}
			if(b.name > a.name){
				return -1;
			}
			return 0;
		}) :
		state.videogames.sort( function (a, b){
			if(a.name > b.name){
				return -1;
			}
			if (b.name > a.name){
				return 1;
			}
			return 0;
		})
		console.log(orderArr)
		return{
			...state,
			videogames: orderArr 
		}
	case 'ORDER_BY_RATING':
		            let orderRating = action.payload === 'asc' ?
                state.videogames.sort(function (a, b) {
                    if (a.rating > b.rating) {
                        return 1;
                    }
                    if (b.rating > a.rating) {
                        return -1;
                    }
                    return 0
                }) :
                state.videogames.sort(function (a, b) {
                    if (a.rating > b.rating) {
                        return -1;
                    }
                    if (b.rating > a.rating) {
                        return 1
                    }
                    return 0
                })
            return {
                ...state,
                videogames: orderRating
            }
	case 'GET_NAME_VIDEOGAMES':
		return{
			...state,
			videogames: action.payload
		}
	case 'POST_VIDEOGAMES':
		return{
			...state
		}
	case 'GET_DETAILS':
		return{
			...state,
			details: action.payload
		}
	default:
		return state;
	}
}


export default rootReducer;