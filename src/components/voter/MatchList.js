import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-bootstrap';

import BaseComponent from '../shared/BaseComponent';
import { makeListPersist, registerVoter } from "../../actions/VoterAction";
import routes from '../../constants/Routes';
import MatchItem from './shared/MatchItem';
import ConfirmationDialog from '../shared/ConfirmationDialog';

class MatchList extends BaseComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
          showConfirmModal: false
        };
    }

    onNameClick = (person) => {
        this.currentPerson = person;
        if (person.voterstatus === 'active') {
            this.setState({ showConfirmModal: true });
            return;
        }
        this.redirectToPage(routes.voterError);
    };

    redirectToPage(route) {
        const { firstname, lastname } = this.currentPerson;
        const fullRoute = `${route}?firstname=${firstname}&lastname=${lastname}`;
        this.onLink(fullRoute);
    }

    onNotSureClick = () => {
        this.onLink(`${routes.voterDetail}?loadPrevious=true`);
    };

    onCloseConfirmModal = () => {
        this.setState({ showConfirmModal: false });
    };

    render() {
        const { matchList } = this.props.voter;
        const { showConfirmModal } = this.state;
        return (
            <div className='btw-voter btw-match-list'>
                { this.isDesktop() && this.renderBackToHome() }
                <div className="intro">
                    <p className="intro-title">
                        Possible match
                    </p>
                    <p className="intro-desc">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                </div>
                <div className='match-list'>
                    { matchList.sort((person1, person2) => person2.matchRate - person1.matchRate)
                        .map((person, i) => <MatchItem key={i}
                                                       onClick={() => this.onNameClick(person)}
                                                       person={person} />
                    )}
                </div>
                <Row>
                    <Col xs={6}>
                        { this.isMobile() && this.renderBackToHome()}
                    </Col>
                    <Col xs={6} md={12}>
                        <div id="btn_not_sure">
                            <button className="btn btn-primary" onClick={this.onNotSureClick}>Not sure</button>
                        </div>
                    </Col>
                </Row>
                <ConfirmationDialog show={showConfirmModal}
                                    title='Register voter'
                                    description='Are you sure you want to register this voter?'
                                    submitText='Yes'
                                    onSubmit={() => {
                                        this.props.actions.registerVoter();
                                        this.redirectToPage(routes.voterSuccess);
                                        this.onCloseConfirmModal();
                                    } }
                                    onClose={this.onCloseConfirmModal} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        voter: state.voter
    }
};


const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ makeListPersist, registerVoter }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MatchList));