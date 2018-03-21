import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-bootstrap';

import BaseComponent from '../shared/BaseComponent';
import { makeListPersist } from "../../actions/VoterAction";
import routes from '../../constants/Routes';

class MatchList extends BaseComponent {
    onNameClick = (person) => {
        const routePage = person.voterstatus === 'active'
            ? routes.voterSuccess
            : routes.voterError;
        const { firstname, lastname } = person;
        const fullRoute = `${routePage}?firstname=${firstname}&lastname=${lastname}`;
        this.onLink(fullRoute);
    };

    onNotSureClick = () => {
        this.onLink(`${routes.voterDetail}?loadPrevious=true`);
    };

    render() {
        const { matchList } = this.props.voter;
        return (
            <div className='btw-voter btw-match-list'>
                { this.renderBackToHome() }
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
                        .map((person, i) => {
                        const {
                            firstname,
                            lastname,
                            regaddrline1,
                            regaddrline2,
                            regaddrcity,
                            regaddrstate
                        } = person;
                        return (
                            <Row className='name-row' key={i} onClick={() => this.onNameClick(person)}>
                                <Col mdOffset={2} md={4}>
                                    <div className='name-info'>
                                        { firstname } { lastname }
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div>{ regaddrline1 }, { regaddrline2 }</div>
                                    <div>{ regaddrcity }, { regaddrstate }</div>
                                </Col>
                            </Row>
                        )
                    })}
                </div>
                <div id="btn_not_sure">
                    <button className="btn btn-primary" onClick={this.onNotSureClick}>Not sure</button>
                </div>
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
    actions: bindActionCreators({ makeListPersist }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MatchList));