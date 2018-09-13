import React  from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import classNames from 'classnames';

import AddEditDialog from './AddEditDialog';
import ConfirmationDialog from '../shared/ConfirmationDialog';
import { updateVoter, deleteVoter } from '../../actions/VoterListAction';
import { replaceNumbersWithX } from '../../helpers/InputHelper';
import BaseComponent from '../shared/BaseComponent';
import Icon from "../shared/Icon";


class VoterItem extends BaseComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            expanded: false,
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
        const { expanded, showEditModal, showDeleteModal } = this.state;
        let {
            firstname,
            lastname,
            registration_metadata,
            address,
            city,
            state,
            zipcode
        } = this.props.voter;

        const isRegistered = (registration_metadata || {}).isRegistered;

        return (
            <Row className='voter-item'>
                <Col md={1}>
                    <div onClick={() => this.setState({ expanded: !expanded })}
                         className={classNames({'arrow-down': !expanded, 'arrow-up': expanded })} />
                </Col>
                <Col md={3}>
                    <div className="title-20-blue">{ firstname } { lastname }</div>
                    { expanded &&
                        <div className="more-info text-15-dark-blue-bold">
                            <div>{ replaceNumbersWithX(address) }</div>
                            <div>
                                { replaceNumbersWithX(city) }{ city ? ', ' : '' }
                                { replaceNumbersWithX(state) }
                            </div>
                            <div>{ zipcode }</div>
                        </div> }
                </Col>
                <Col md={1}>
                    { isRegistered
                        ? <Icon name='checkmark-green' width={14} height={14} />
                        : <Icon name='exclamation-mark' width={3} height={15} />
                    }
                </Col>
                <Col md={6}>
                    { !isRegistered
                        && <div className="not-registered-box text-15-dark-blue-bold">Not registered</div> }
                </Col>
                <Col md={1}>
                    <div className="edit-icon" onClick={() => this.setState({ showEditModal: true })}>
                        <Icon name='edit' width={30} height={30} />
                    </div>
                </Col>
                {/*<FontAwesome className='action-icon'*/}
                             {/*onClick={() => this.setState({ showDeleteModal: true })}*/}
                             {/*name='trash' />*/}

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
