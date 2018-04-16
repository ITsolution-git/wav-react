import React from 'react';
import PubSub from 'pubsub-js';

import pubsubConstants from '../../constants/PubSubConstants';
import SignedOffHeader from './SignedOffHeader';
import SignedOnHeader from './SignedOnHeader';
import authStorage from '../../storage/AuthStorage';
import BaseComponent from '../shared/BaseComponent';

export default class Header extends BaseComponent {
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
			<div className="btw-header">
				{ authenticated
					? <SignedOnHeader />
					: <SignedOffHeader />
				}
			</div>
		);
	}
}