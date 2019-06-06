import React from 'react';
import { withRouter } from 'react-router-dom';
import PubSub from 'pubsub-js';
import Header from './layout/Header';
import Router from './Router';
import { ThemeProvider } from '@material-ui/styles';

import '../styles/App.css';
import '../extensions';
import pubsubConstants from "../constants/PubSubConstants";
import BaseComponent from './shared/BaseComponent';
import theme from '../theme';

class App extends BaseComponent {

	componentWillReceiveProps(props) {
        PubSub.publish(pubsubConstants.onLocationChange, props.location.pathname);
	}

	render() {

		let isHideHeader = this.isOnBoarding();
		return (
			<ThemeProvider theme={theme}>
				<div className='btw-app'>
					{ !isHideHeader && <Header /> }
					<div className='btw-content'>
						<Router />
					</div>
				</div>
			</ThemeProvider>
		);
	}
}

export default withRouter(App);
