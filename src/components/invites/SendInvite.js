import React, {Component} from 'react';
import {connect} from 'react-redux'


class SendInvite extends Component {

	constructor() {
		super();
		this.state = {
			captainEmail : '',
			captainMessage: ''
		}
	}

	componentDidMount(){

	}

	updateInviteFields(event, field) {

	}

	sendInvite(event, field){

	}


	render() {

		return (
			<div>
				<div className="btw-login-container">
					<div className="input-field col s6">
						<label htmlFor="captainEmail">Captain Invite</label>
						<br/>
						<br/>
						<input id="captainEmail" type="state" className="btw-input-field" ref="captainEmail"
						       style={{color: 'black'}}
						       onChange={this.updateInviteFields.bind(this, 'captainEmail')}></input>
					</div>

					<div className='btw-container'>
						<div id='loginbtn' className="btn-general btn"
						     onClick={this.sendInvite.bind(this, 'sendInvite')}>
							<span className="btw-buttonText">Send Invite</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {

	return {

	}
}

const mapDispatchToProps = (dispatch) => ({

})

export default connect(null, null)(SendInvite);