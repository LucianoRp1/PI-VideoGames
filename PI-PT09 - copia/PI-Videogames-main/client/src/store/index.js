import {applyMiddleware, createStore} from 'redux';//store almacena toda la informacion (mantiene el estado de la aplicacion)
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducer'

export const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));