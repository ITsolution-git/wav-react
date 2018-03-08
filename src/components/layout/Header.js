import React, { Component } from 'react';
import { connect } from 'react-redux'

import GoogleAction from '../../actions/GoogleAction';
import SignedOffHeader from './SignedOffHeader';
import SignedOnHeader from './SignedOnHeader';
import authStorage from '../../storage/AuthStorage';

class Header extends Component {

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

const mapStateToProps = (state) => {
	const { response } = state.identity.getBtwUserProfile;
	return {
		response
	}
};

const mapDispatchToProps = (dispatch) => ({
	isSignedIn: (component) => dispatch(GoogleAction.isSignedIn(component))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);