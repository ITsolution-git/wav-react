import React from 'react';
import { withRouter } from 'react-router-dom';
import PubSub from "pubsub-js";
import Header from './layout/Header';
import Router from './Router';
import '../styles/App.css';
import '../extensions';
import pubsubConstants from "../constants/PubSubConstants";
import BaseComponent from './shared/BaseComponent';

class App extends BaseComponent {

	componentWillReceiveProps(props) {
        PubSub.publish(pubsubConstants.onLocationChange, props.location.pathname);
	}

	render() {

		let isHideHeader = this.isOnBoarding();
		return (
			<div className='btw-app'>
				{ !isHideHeader && <Header /> }
				<div className='btw-content'>
                    <Router />
				</div>
			</div>
		);
	}
}

export default withRouter(App);
