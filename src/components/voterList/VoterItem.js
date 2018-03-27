import React  from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";

import FontAwesome from 'react-fontawesome';
import { loadVoterList } from '../../actions/VoterListAction';
import BaseComponent from '../shared/BaseComponent';


class VoterItem extends BaseComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            moreEnabled: false
        }
    }

    render() {
        const { moreEnabled } = this.state;
        let {
            firstname,
            lastname,
            email,
            phonenumber,
            gender,
            registration_metadata,
            address,
            city,
            state,
        } = this.props.voter;

        const isRegistered = (registration_metadata || {}).isRegistered;

        return (
            <Row className='name-row'>
                <Col md={4}>
                    <div className='name-info'>
                        { firstname } { lastname }
                    </div>
                </Col>
                <Col md={4}>
                    <div>{ address }, { city }, { state }</div>
                    { moreEnabled &&
                    <div className='more-info'>
                        <div>Email: { email } </div>
                        <div>Phone: { phonenumber }</div>
                        <div>Status: { isRegistered ? 'Registered' : 'Not registered'}</div>
                        <div>Gender: { gender }</div>
                    </div> }
                    <div className='link' onClick={e => {
                        e.stopPropagation();
                        this.setState({ moreEnabled: !moreEnabled });
                    }}>{ moreEnabled ? 'Show less' : 'Show more' }</div>
                </Col>
                <Col md={2}>
                    { isRegistered
                        ? <FontAwesome className='registered-icon' name='check-circle' />
                        : <FontAwesome className='not-registered-icon' name='exclamation-circle' /> }
                </Col>
                <Col md={2}>
                    <FontAwesome className='action-icon' name='pencil' />
                    <FontAwesome className='action-icon' name='trash' />
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ loadVoterList }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VoterItem));