import React from 'react';
import { Row, Col } from 'react-bootstrap';

import BaseComponent from '../../shared/BaseComponent';

export default class UserItem extends BaseComponent {
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
        } = this.props.user;
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
        } = this.props.user;

        return (
            <div>
                <div>Username: { username }</div>
                <div>Role: { role }</div>
                <div>Phone: { phonenumber }</div>
                <div>Address: { address }</div>
                <div>Date of birth: { dateofbirth }</div>
                <div>ZipCode: { zipcode } </div>
            </div>
        )
    };

    render() {
        const { moreEnabled } = this.state;
        const {
            user: {
                firstname,
                lastname,
                email
            },
            isVoter = true
        } = this.props;
        return (
            <Row className='name-row'>
                <Col md={8}>
                    <div className='name-info'>
                        { firstname } { lastname }, { email }
                    </div>
                </Col>
                <Col md={4} className='no-padding'>
                    { moreEnabled &&
                    <div className='more-info'>
                        { isVoter ? this.renderDetailedVoterInfo() : this.renderDetailedCaptainInfo() }
                    </div> }
                    <div className='link' onClick={e => {
                        e.stopPropagation();
                        this.setState({ moreEnabled: !moreEnabled });
                    }}>{ moreEnabled ? 'Show less' : 'Show more' }</div>
                </Col>
            </Row>
        );
    }
}