import React  from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import classNames from 'classnames';

import AddEditDialog from './AddEditDialog';
import { updateVoter, deleteVoter } from '../../actions/VoterListAction';
import { replaceNumbersWithX } from '../../helpers/InputHelper';
import BaseComponent from '../shared/BaseComponent';
import Icon from "../shared/Icon";
import Dialog from '../shared/Dialog';
import Button from "../shared/Button";


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

    getViewProps = () => {
        if (this.isDesktop()) {
            return {
                titleClass: 'title-24-blue'
            }
        }
        return {
            titleClass: 'title-24-light-blue'
        }
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

        const viewProps = this.getViewProps();
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
                <AddEditDialog show={showEditModal}
                               title='Edit'
                               isEdit={true}
                               voter={this.props.voter}
                               disableEmail
                               onUpdate={data => {
                                   const { _id, registration_metadata, voter_characteristics,
                                       ...voterToUpdate} = data;
                                   this.props.actions.updateVoter(voterToUpdate);
                                   this.closeEditModal();
                               } }
                               onDelete={() => this.setState({ showDeleteModal: true, showEditModal: false })}
                               onClose={this.closeEditModal} />
                <Dialog show={showDeleteModal} onClose={this.closeDeleteModal}>
                    <div id="delete-voter-modal">
                        <div className={viewProps.titleClass}>
                            Delete
                        </div>
                        <div id="description" className="text-18-dark-blue-bold">
                            This will remove the voter’s information from your records. You will have to enter their information again if you want to re-add them. Confirm?
                        </div>
                        <Row id="buttons" className="no-margin">
                            <Col>
                                <Button color="red" onClick={() => {
                                    this.props.actions.deleteVoter(this.props.voter);
                                    this.closeDeleteModal();
                                }}>Yes</Button>
                            </Col>
                            <Col>
                                <Button onClick={this.closeDeleteModal}>No</Button>
                            </Col>
                        </Row>
                    </div>
                </Dialog>
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
