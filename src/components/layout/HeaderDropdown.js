import React, {Component} from 'react';
import {connect} from "react-redux";
import GoogleAction from "../../actions/GoogleAction";

class HeaderDropdown extends Component {

	constructor(props){
		super(props);
		this.state = {
			username: props.displayName,
			id: props.id
		}
	}

	handleSignOut(){
		this.props.googleSignOut()
	}

	render() {
		return (
			<div className="dropdown">
				<a className="btw-dropdown btn btn-secondary dropdown-toggle"
				                href="#" role="button"
				                id="dropdownMenuLink"
				                data-toggle="dropdown"
				                aria-haspopup="true"
				                aria-expanded="false">Signed in as {this.state.username}
				</a>

				<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
					<a className="dropdown-item" href="#">Action</a>
					<button onClick={this.handleSignOut.bind(this, 'signout')}>Log Out</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const { username, isAuthenticated } = state.google.getGoogleUserProfile;
	return {
		username,
		isAuthenticated
	}
}

const mapDispatchToProps = (dispatch) => ({
	isSignedIn: (component) => dispatch(GoogleAction.isSignedIn(component)),
	googleSignOut: ()=> dispatch(GoogleAction.googleSignOut())
	//add facebook and btw signOut
})

export default connect(mapStateToProps, mapDispatchToProps) (HeaderDropdown);