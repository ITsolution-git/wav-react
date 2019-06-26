import React from 'react';
import { withRouter } from 'react-router-dom';
import PubSub from "pubsub-js";

import Header from './layout/Header';
import Router from './Router';
import '../styles/App.css';
import pubsubConstants from "../constants/PubSubConstants";
import BaseComponent from './shared/BaseComponent';

class App extends BaseComponent {

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
			</div>
		);
	}
}

export default withRouter(App);
