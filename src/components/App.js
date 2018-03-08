import React, { Component } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Router from './Router';
import '../resources/App.css';


class App extends Component {


	render() {
		return (
			<div className="App">
				<Navbar />
				<Router />
				<Footer />
			</div>
		);
	}
}



export default App;