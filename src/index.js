import React from 'react';
import ReactDOM from 'react-dom';

import store from './store/index'
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import App from './components/App';


import registerServiceWorker from './registerServiceWorker';


const app = (
	<Provider store={store.configure(null)}>
		<BrowserRouter>
			<App/>
		</BrowserRouter>
	</Provider>
);


ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
