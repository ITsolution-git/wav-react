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

    replaceNumbersWithX = (str, isAddress = false) => {

        if (isAddress) {
            str = str || '';
            str = str.replace(new RegExp("[0-9]", "g"), "X");
            let arr = str.split(',');

            if (arr.length === 1) {
                return str;
            } else {
                return arr[0] + ',' + arr[1].replace(new RegExp("[0-9a-zA-Z]", "g"), "X");
            }
        } else {
            str = str || '';
            return str.replace(new RegExp("[0-9]", "g"), "X");
        }
        
    };

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
                        ? <div className="tooltip">
                            <FontAwesome className='registered-icon' name='check-circle' />
                            <span className="tooltiptext">This person is registered</span>
                          </div>
                        : <div className="tooltip">
                            <FontAwesome className='not-registered-icon' name='exclamation-circle' />
                            <span className="tooltiptext">This person is not registered</span>
                          </div> }
                </Col>
                <Col md={5} xs={12} className='no-padding'>
                    <div>{ this.replaceNumbersWithX(address, true) }{ address ? ', ' : ''}{ this.replaceNumbersWithX(city) }{ city ? ', ':'' }{ this.replaceNumbersWithX(state) }</div>
                    { moreEnabled &&
                    <div className='more-info'>
                        <div>Email: { email } </div>
                        <div>Phone: { phonenumber }</div>
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
                               submitText='Save'
                               disableEmail
                               onSubmit={data => {
                                   const { _id, registration_metadata, voter_characteristics,
                                       ...voterToUpdate} = data;
                                   this.props.actions.updateVoter(voterToUpdate);
                                   this.closeEditModal();
                               } }
                               onClose={this.closeEditModal} />
                <ConfirmationDialog show={showDeleteModal}
                                    title='Delete voter'
                                    description='This will remove the voter’s information from your records. You will have to enter their information again if you want to re-add them. Confirm?'
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