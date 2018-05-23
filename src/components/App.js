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