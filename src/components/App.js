import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PubSub from "pubsub-js";

import Header from './layout/Header';
import Footer from './layout/Footer';
import Router from './Router';
import '../styles/App.css';
import '../extensions';
import pubsubConstants from "../constants/PubSubConstants";

class App extends Component {
	
	componentWillReceiveProps(props) {
        PubSub.publish(pubsubConstants.onLocationChange, props.location.pathname);
	}

	render() {
		return (
			<div className='btw-app'>
				<Header />
				<div className='btw-content'>
                    <Router />
				</div>
				<Footer />
			</div>
		);
	}
}

export default withRouter(App);