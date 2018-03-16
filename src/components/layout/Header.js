import React from 'react';

import SignedOffHeader from './SignedOffHeader';
import SignedOnHeader from './SignedOnHeader';
import authStorage from '../../storage/AuthStorage';
import BaseComponent from '../shared/BaseComponent';

export default class Header extends BaseComponent {

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