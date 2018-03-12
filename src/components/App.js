import React, { Component } from 'react';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Router from './Router';
import '../styles/App.css';

import ErrorBoundary from 'react-error-boundary';
import GeneralErrorPage from './errorPages/GeneralErrorPage';

class App extends Component {

	render() {
		return (
			<div className="App">
				<Header />
				
				<ErrorBoundary FallbackComponent={ GeneralErrorPage }>
					<Router />
				</ErrorBoundary>

				<Footer />
			</div>
		);
	}
}

export default App;