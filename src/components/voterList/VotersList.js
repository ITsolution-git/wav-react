import React  from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { Button, Row, Col } from 'react-bootstrap';
import classNames from 'classnames';

import { loadVoterList, addVoter } from '../../actions/VoterListAction';
import BaseComponent from '../shared/BaseComponent';
import VoterItem from './VoterItem';
import AddEditDialog from './AddEditDialog';

class VotersList extends BaseComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
          showAddDialog: false
        };
    }

    componentWillMount() {
        const { actions, voterList: { isSuccess, error } } = this.props;
        if (!isSuccess && !error) {
            actions.loadVoterList();
        }
    }

    closeAddModal = () => {
        this.setState({ showAddDialog: false });
    };

    render() {
        const { showAddDialog } = this.state;
        const { voterList: { voters = []}} = this.props;
        return (
            <div className='btw-voter btw-voter-list'>
                { !this.isMobile() && this.renderBackToHome()}
                <div className="intro">
                    <p className="intro-title">
                        Generate Lorem Ipsum placeholder text
                    </p>
                    <p className="intro-desc">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <div style={{clear: 'both'}}></div>
                    <div className='voters-list'>
                        { voters.map((voter, i) => <VoterItem key={i} voter={voter} />)}
                    </div>
                    <Row>
                        <Col md={6} xs={6}>
                            { this.isMobile() && this.renderBackToHome()}
                        </Col>
                        <Col md={6} xs={6} className={classNames({'no-padding': this.isMobile()})}>
                            <Button className='pull-right btn btn-primary'
                                    onClick={() => this.setState({ showAddDialog: true })}>
                                Add Voter
                            </Button>
                        </Col>
                    </Row>
                </div>
                <AddEditDialog show={showAddDialog}
                               title='Add Voter'
                               submitText='Add'
                               onSubmit={data => {
                                   this.props.actions.addVoter(data);
                                   this.closeAddModal();
                               } }
                               onClose={this.closeAddModal} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        voterList: state.voterList
    }
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ loadVoterList, addVoter }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VotersList));