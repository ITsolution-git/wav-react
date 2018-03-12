import React, { Component } from 'react';

import SignedOffHeader from './SignedOffHeader';
import SignedOnHeader from './SignedOnHeader';
import authStorage from '../../storage/AuthStorage';

export default class Header extends Component {

	render() {
		return (
			<div className="btw-header">
				{ authStorage.isAuthenticated()
					? <SignedOnHeader />
					: <SignedOffHeader />
				}
			</div>
		);
	}
}