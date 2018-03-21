import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { loadState, saveState } from '../storage/StateStorage';
import reducers from '../reducers';

let store;

export default {


	// component = > action = > reducer > store >
	configure: (initialState) => {

		//the store is a combination of reducers
		const combinedReducers = combineReducers(reducers);

		const persistedState = loadState();

		if (initialState){
			const state = Object.assign(initialState, persistedState);
			store = createStore(combinedReducers, state, applyMiddleware(thunk));
			return store
		}
		
		store  = createStore(combinedReducers, persistedState, applyMiddleware(thunk, logger));

		store.subscribe(() => {
			saveState({
				voter: store.getState().voter
			});
		});
		return  store
	}
}
