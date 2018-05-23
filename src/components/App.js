import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import Header from './layout/Header';
import Footer from './layout/Footer';
import Router from './Router';
import '../styles/App.css';
import '../extensions';

class App extends Component {

	render() {

		let isHideHeader = this.props.location.pathname === "/captainProfile/Makelist"
		return (
			<div className='btw-app'>
				{ !isHideHeader && <Header /> }
				<div className='btw-content'>
                    <Router />
				</div>
				{ !isHideHeader && <Footer /> }
			</div>
		);
	}
}

export default withRouter(App);