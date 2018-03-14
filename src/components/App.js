import React, { Component } from 'react';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Router from './Router';
import '../styles/App.css';

class App extends Component {

	render() {
		return (
			<div className="App">
				<Header />
					<Router />
				<Footer />
			</div>
		);
	}
}

export default App;