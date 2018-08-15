import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { bindActionCreators } from "redux";
import { unsubscribeUser } from '../../actions/UserAction';

import BaseComponent from '../shared/BaseComponent';
import Spinner from '../../components/shared/Spinner';
import Button from "../shared/Button";

class Unsubscribe extends BaseComponent {
	constructor() {
		super();
  }

  // call api for unsubscribe
  onConfirm = () => {
    let email = this.props.match.params.email
    this.props.actions.unsubscribeUser(email)
  }

	render() {
		return (
			<div>
				<div className='btw-change-password btw-verify container'>
					<div className="intro">
						<p className="intro-title">Please confirm to unsubscribe from our alerts.</p>
            {
              this.props.success && 
              <span style={{ fontSize: "18px", color: "green" }}>{this.props.data.message}</span>
            }
					</div>
					<br/>
					<Row>
						<Col md={12}>
							<div id="btn_signup">
								<Button onClick={this.onConfirm}>Confirm</Button>
							</div>
							<Spinner loading={this.props.inProcess} size={50} />
						</Col>
					</Row>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
  return {
    inProcess : state.user.isUnsubscribing,
    success   : state.user.isUnsubscribed,
    data      : state.user.data
  }
};


const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ unsubscribeUser }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Unsubscribe));