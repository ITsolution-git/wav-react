import React  from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import FontAwesome from 'react-fontawesome';

import AddEditDialog from './AddEditDialog';
import ConfirmationDialog from '../shared/ConfirmationDialog';
import { updateVoter, deleteVoter } from '../../actions/VoterListAction';
import BaseComponent from '../shared/BaseComponent';


class VoterItem extends BaseComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            moreEnabled: false,
            showEditModal: false,
            showDeleteModal: false
        }
    }

    closeEditModal = () => {
      this.setState({ showEditModal: false });
    };

    closeDeleteModal = () => {
      this.setState({ showDeleteModal: false });
    };

    render() {
        const { moreEnabled, showEditModal, showDeleteModal } = this.state;
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
                <Col md={3} xs={10}>
                    <div className='name-info'>
                        { firstname } { lastname }
                    </div>
                </Col>
                <Col md={2} xs={2}>
                    { isRegistered
                        ? <FontAwesome className='registered-icon' name='check-circle' />
                        : <FontAwesome className='not-registered-icon' name='exclamation-circle' /> }
                </Col>
                <Col md={5} xs={12} className='no-padding'>
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
                <Col md={2} xs={12}>
                    <FontAwesome className='action-icon'
                                 onClick={() => this.setState({ showEditModal: true })}
                                 name='pencil' />
                    <FontAwesome className='action-icon'
                                 onClick={() => this.setState({ showDeleteModal: true })}
                                 name='trash' />
                </Col>
                <AddEditDialog show={showEditModal}
                               title='Edit Voter'
                               voter={this.props.voter}
                               submitText='Edit'
                               disableEmail
                               onSubmit={data => {
                                   this.props.actions.updateVoter(data);
                                   this.closeEditModal();
                               } }
                               onClose={this.closeEditModal} />
                <ConfirmationDialog show={showDeleteModal}
                                    title='Delete voter'
                                    description='Are you sure you want to delete voter?'
                                    submitText='Yes'
                                    onSubmit={() => {
                                        this.props.actions.deleteVoter(this.props.voter);
                                        this.closeDeleteModal();
                                    } }
                                    onClose={this.closeDeleteModal} />
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ updateVoter, deleteVoter }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VoterItem));