import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col } from 'react-bootstrap';

import BaseComponent from '../../shared/BaseComponent';
import { deleteUser } from '../../../actions/UserAction';

class UserItem extends BaseComponent {
    state = {
      moreEnabled: false
    };

    renderDetailedVoterInfo = () => {
        const {
            state,
            gender,
            city,
            address,
            phonenumber,
            registration_metadata: {
                isRegistered,
                isCompleted,
                voterStatus
            }
        } = this.props.user.user;
        return (
            <div>
                <div>State: { state }</div>
                <div>Gender: { gender }</div>
                <div>City: { city}</div>
                <div>Address: { address }</div>
                <div>Phone: { phonenumber }</div>
                <div>Is Registered: { isRegistered }</div>
                <div>Is Completed: { isCompleted } </div>
                <div>Status: { voterStatus }</div>
            </div>
        )
    };

    renderDetailedCaptainInfo = () => {
        const {
            username,
            role,
            address,
            phonenumber,
            dateofbirth,
            zipcode
        } = this.props.user.user;

        return (
            <div>
                <div>Username: { username }</div>
                <div>Role: { role }</div>
                <div>Phone: { phonenumber }</div>
                <div>Address: { address }</div>
                <div>Date of birth: { dateofbirth.date }</div>
                <div>ZipCode: { zipcode } </div>
            </div>
        )
    };

    onDeleteUser = (userid) => {
        this.props.actions.deleteUser({userid:userid})
    }

    render() {
        const { moreEnabled } = this.state;
        const {
            user: {
                user : {
                    firstname,
                    lastname,
                    email
                },
                _id
            },
            isVoter = true
        } = this.props;
        return (
            <Row className='name-row'>
                <Col md={7} xs={12}>
                    <div className='name-info'>
                        { firstname } { lastname }, { email }
                    </div>
                </Col>
                <Col md={3} xs={6} className='no-padding'>
                    { moreEnabled &&
                    <div className='more-info'>
                        { isVoter ? this.renderDetailedVoterInfo() : this.renderDetailedCaptainInfo() }
                    </div> }
                    <div className='link' onClick={e => {
                        e.stopPropagation();
                        this.setState({ moreEnabled: !moreEnabled });
                    }}>{ moreEnabled ? 'Show less' : 'Show more' }</div>
                </Col>
                <Col md={2} xs={6}>
                    <div className="link" onClick={this.onDeleteUser.bind(this,_id)}>Delete</div>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ deleteUser }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserItem);