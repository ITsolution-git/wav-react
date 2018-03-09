import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { loadState, saveState } from '../storage/LocalStorage';

import { GoogleReducer, FacebookReducer, IdentityReducer } from '../reducers';



let store;



export default {


	// component = > action = > reducer > store >
	configure: (initialState) => {

		//the store is a combination of reducers
		//this is where you insert your reducers into the store
		const combinedReducers = combineReducers({
			google: GoogleReducer,
			facebook: FacebookReducer,
			identity: IdentityReducer
		});

		const persistedState = loadState();

		if (initialState){
			const state = Object.assign(initialState, persistedState);
			store = createStore(combinedReducers, state, applyMiddleware(thunk));
			return store
		}
		
		store  = createStore(combinedReducers, persistedState, applyMiddleware(thunk, logger));

		store.subscribe(() => {
			saveState({
				identity: {
					btwMakelist: {
						makelist: store.getState().identity.btwMakelist.makelist
					}
				}
			});
		})
		return  store
	}
}
