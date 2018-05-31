import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Modal from 'material-ui/Modal';

import BaseComponent from '../../shared/BaseComponent';

export default class UserItem extends BaseComponent {
    state = {
      moreEnabled: false,
      openImageModal: false
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
                <div>Is Registered: { isRegistered ? 'True' : 'False' }</div>
                <div>Is Completed: { isCompleted ? 'True' : 'False' } </div>
                <div>Status: { voterStatus ? voterStatus : '' }</div>
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
                <div>Date of birth: { dateofbirth.date }</div>
                <div>ZipCode: { zipcode } </div>
            </div>
        )
    };

    handleImageOpen = () => {
        this.setState({ openImageModal: true });
    };
    
    handleImageClose = () => {
        this.setState({ openImageModal: false });
    };

    render() {
        const { moreEnabled } = this.state;
        const {
            user: {
                firstname,
                lastname,
                email,
                image
            },
            isVoter = true
        } = this.props;
        console.log(this.props)
        return (
            <Row className='name-row'>
                <Col md={6} xs={12}>
                    <div className='name-info'>
                        { firstname } { lastname }, { email }
                    </div>
                </Col>
                <Col md={3} xs={6}>
                    <br/>
                    { moreEnabled && 
                        <div onClick={this.handleImageOpen}>
                            { image && <img src={image} width={140} height={140}/> }
                        </div> }
                </Col>
                <Col md={3} xs={6} className='no-padding'>
                    { moreEnabled &&
                    <div className='more-info'>
                        { this.renderDetailedVoterInfo() }
                    </div> }
                    <div className='link' onClick={e => {
                        e.stopPropagation();
                        this.setState({ moreEnabled: !moreEnabled });
                    }}>{ moreEnabled ? 'Show less' : 'Show more' }</div>
                </Col>

                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.openImageModal}
                    onClose={this.handleImageClose}
                >
                    <div className="image-modal">
                        <img src={image} />
                    </div>
                </Modal>
            </Row>
        );
    }
}