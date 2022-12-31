import React from 'react';
import startVideoHd1 from '../../Media/startVideoHd1.mp4';
import './Start.css'
import {Link} from 'react-router-dom';

const Start = () => {

	return (
		<div className='star-container'>
		<video className='video' src={startVideoHd1} autoPlay loop muted  />
		 <Link to='/home'>
		 <button className='btnStart'>
		 Browse Games
		 </button>
		 </Link>
		 <h1 className='titleh1'>Sigma Games</h1>
		 <p className='parrafo1'>Find your favorite game</p>				
		</div>

		
	);
}


export default Start;