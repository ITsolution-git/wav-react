import React from 'react';
import PubSub from 'pubsub-js';
import { withRouter } from 'react-router-dom';

import pubsubConstants from '../../constants/PubSubConstants';
import { SignedOnHeader, SignedOffHeader, OnBoardingHeader } from './'
import authStorage from '../../storage/AuthStorage';
import BaseComponent from '../shared/BaseComponent';

class Header extends BaseComponent {
	constructor(props, context) {
		super(props, context);
		this.state = {
			authenticated: authStorage.isAuthenticated()
		};
	}

	componentWillMount() {
       this.authSubscription = PubSub.subscribe(pubsubConstants.onAuthChange, (type, value) => {
       		this.setState({ authenticated: value });
	   });
	}

	componentWillUnmount() {
        PubSub.unsubscribe(this.authSubscription);
	}

	render() {
		const { authenticated } = this.state;

		return (
			<div className='btw-header'>
				{ authenticated
					? this.isOnBoarding()
							? <OnBoardingHeader />
							: <SignedOnHeader />
					: <SignedOffHeader />
				}
			</div>
		);
	}
}

export default withRouter(Header);