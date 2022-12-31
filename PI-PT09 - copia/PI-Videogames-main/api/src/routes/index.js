const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const {Videogame, Genre} = require('../db')
const path = require('path')


const router = Router(); 

let API_KEY = 'b661c80b4cf1448482908f1c21651511';

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const apiGamesInfo = async () => {
		let urlGames =  await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=100`, { headers: { "accept-encoding": null }
    });
        const pageOne = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=1&page_size=50`, { headers: { "accept-encoding": null }});
        const pageTwo = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2&page_size=50`, { headers: { "accept-encoding": null }});
        const pageThree = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3&page_size=50`, { headers: { "accept-encoding": null }});
        await Promise.all([pageOne, pageTwo, pageThree])
                    .then(function(values) {
                       urlGames = values[0].data.results.concat(values[1].data.results).concat(values[2].data.results)
                    })
	const infoGame = urlGames.map( el => {
		return  {
			id: el.id,
			name: el.name,
			background_image: el.background_image,
			description: el.description,
			released: el.released,
			rating: el.rating,
			genre: el.genres.map(el => el.name),
			plataform: el.platforms.map(el => el.platform.name),
		};
	});
	return  infoGame;

};

let apiDbInfo = async () => {
	return await Videogame.findAll({ // consulta los datos de la tabla
		include:{
		model: Genre,  // crear otro modelo en platform   // usar otros endpoint para traer mas info de ahi	model: Genre,
		 attributes: ['name'],
			through: {
				attributes: [],
			},
		},
})
}

// let apiDbInfoPlatf = async () => {
// 	return await Videogame.findAll({ // consulta los datos de la tabla
// 		include:{
// 		model: Platform ,  // crear otro modelo en platform   // usar otros endpoint para traer mas info de ahi	model: Genre,
// 		 attributes: ['name'],
// 			through: {
// 				attributes: [],
// 			},
// 		},
// })
// }



    // let apiDbInfo = async () => {
    //   return await Videogame.findAll({
    //     include: [Genre, Platform], // traigo el nombre del genero 
    // });
    // };


const getAllVideoGames = async () => {
	const infoGame = await apiGamesInfo();
	const infoDb = await apiDbInfo();
	const apiTotal = infoGame.concat(infoDb);
    return apiTotal;
}



router.get('/videogames', async (req , res) =>{
    const name = req.query.name;
    const id = req.params.id;
    const gamesTotal = await getAllVideoGames();
	if(name){
		let gameName = await gamesTotal?.filter((el) => el.name.toLowerCase().includes(name.toLowerCase()))
		gameName.length ?
		res.status(200).send(gameName) :
		res.status(404).send('Error Macro');
	}else{
		res.status(200).send(gamesTotal)
	}

})



//router.get('/videogames/:id', async (req, res) =>{
//	const id = req.params.id;
//	let gamesApi = await getAllVideoGames()   
//	try{
//		let gameId = await gamesApi?.filter((el) => el.id == id)
//		gameId.length?
//		res.status(200).send(gameId) :
//        res.status(404).send('No se encontro el Juegos')
//
//	} catch (error){
//     console.log('error')
//	} 
//
//})

router.get('/videogames/:id', async (req, res) =>{
	const {id} = req.params;
  //  let gamesApi = await getAllVideoGames()
	const url = `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
	try{
     if(id.includes('-')) {//detectar UUID en BD
        const gameDb = await Videogame.findOne({
                where: {id},
                include: Genre,
            });
            return res.status(200).send(gameDb)
       } 
		const urlInfo = await axios.get(url, { headers: { "accept-encoding": null }})
		const game = {
        id: urlInfo.data.id,
        name: urlInfo.data.name,
        img: urlInfo.data.background_image,
        genre: urlInfo.data.genres.map((el) => el.name),
        released: urlInfo.data.released,
        rating: urlInfo.data.rating,
        platform: urlInfo.data.platforms.map((el) => el.platform.name),
        description: urlInfo.data.description_raw,

      }
      res.status(200).send(game)
       
	}catch(error){
		res.status(404).send('error')
	}
})


router.get('/genres', async (req, res) =>{
  try{  
  const apiUrl = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`, { headers: { "accept-encoding": null }})
  const infoApiUrl = apiUrl.data.results.map(g => g.name)
         infoApiUrl.forEach(el => {
                Genre.findOrCreate({
                    where: {name: el}
                })
            })

  let otraInfo = await Genre.findAll()
  let utilInfo = otraInfo.map(d => d.name)
            
  res.status(200).send(utilInfo)
}catch(error){
	res.status(404).send('Genre Not Found')
}
        
})




// router.get('/platforms', async (req, res) =>{
//   try{  
//   const hola = await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`, { headers: { "accept-encoding": null }})
//   const chau = hola.data.results.map((d) => d.slug)
//          chau.forEach(el => {
//                 Platform.findOrCreate({
//                     where: {name: el}
//                 })
//             })

//   let infoPlat = await Platform.findAll()
//   let platInfo = infoPlat.map(d => d.name)
            
//   res.status(200).send(platInfo)
// }catch(error){
// 	res.status(404).send('platforms Not Found')
// }
        
// })





router.post('/videogames', async (req, res) => {
    let {name, image, description, released, rating, genre, platforms, createdInDb} = req.body
try{
    let newGame = await Videogame.create({
        name,
        image,
        description,
        released,
        rating,
        platforms,
        createdInDb,
    })

  	let genreDb = await Genre.findAll({
        where: {name : genre}

    })

    // let platformDb = await Platform.findAll({
    // 	where: {name : platform}
    // })
   newGame.addGenre(genreDb);
  // newGame.addPlatform(platformDb);
  // console.log(newGame)

    res.status(200).json(newGame)
  }catch (error){
     console.log(error)
   }});
  










module.exports = router;
