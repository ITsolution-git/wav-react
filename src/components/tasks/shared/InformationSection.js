import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import BaseComponent from '../../shared/BaseComponent';
import States_Special from '../../../constants/States_Special';
import Icon from '../../shared/Icon';

class InformationSection extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        }
    }

    onArrowClick = () => {
        this.setState({ expanded: !this.state.expanded });
    };

    getStateInfo = () => {
        const { taskData, stateInfo } = this.props;

        if (!stateInfo) return "";

        if (taskData.voter_metaData.age && taskData.voter_metaData.age > 17 && taskData.voter_metaData.age < 23) {
            return {
                "2018 Primary Election voting date":    stateInfo['2018PrimaryElectionVotingDate'],
                "Registration deadline by mail":        stateInfo['registrationDeadlineByMail'],
                "Online registration deadline":         stateInfo['registrationDeadlineOnline'],
                "Is ID needed":                         stateInfo['idNeeded'] ? "YES" : "NO",
                "Is ID required for first-time voters": stateInfo['idRequiredForFirstTimeVoters'] ? "YES" : "NO",
                "Student id accepted":                  stateInfo['studentIdAccepted'] ? "YES" : "NO",
            }
        }

        if (States_Special.includes(stateInfo.state)) {
            return {
                "2018 Primary Election voting date":        stateInfo['2018PrimaryElectionVotingDate'],
                "Registration deadline by mail":            stateInfo['registrationDeadlineByMail'],
                "Absentee Ballot application deadline":     stateInfo['absenteeBallotApplicationDeadline'],
                "Absentee Ballot deadline":                 stateInfo['absenteeBallotDeadline'],
                "Is Absentee with cause allowed":           stateInfo['absenteeWithCause'] ? "YES" : "NO",
                "Is Absentee without cause allowed":        stateInfo['absenteeWithoutCause'] ? "YES" : "NO",
                "Is ID needed":                             stateInfo['idNeeded'] ? "YES" : "NO",
            }
        }

        return {
            "2018 Primary Election voting date":    stateInfo['2018PrimaryElectionVotingDate'],
            "Registration deadline by mail":        stateInfo['registrationDeadlineByMail'],
            "Online registration deadline":         stateInfo['registrationDeadlineOnline'],
            "Is early voting allowed":              stateInfo['earlyVotingAllowed'] ? "YES" : "NO",
            "Is all mail (voting) allowed":         stateInfo['allMailVoting'] ? "YES" : "NO",
            "Is ID needed":                         stateInfo['idNeeded'] ? "YES" : "NO",
        }
    };

    render () {
        const { taskData: {
            group_info = {}
        } = {} } = this.props;

        const { expanded } = this.state;

        return (
            <Col
                md={4}
                xsHidden
                className="btw-task-info">
                <div className="title-20-blue">
                    Pssst. Need a cheat sheet on voting info? We got you covered
                </div>
                { expanded &&
                 <div className="info">
                    <Row className="section">
                        <Col xs={12} md={12}>
                            <span className="title-16-dark-blue">Rewards Points: </span>
                            <span className="text-15-dark-blue-bold">This task is worth {group_info.value} points</span>
                        </Col>
                    </Row>
                    {
                        Object.keys(this.getStateInfo()).map((e, index) => {
                            return <Row key={index} className="section">
                                <Col xs={12} md={12}>
                                    <span className="title-16-dark-blue">{ e }: </span>
                                    <span className="text-15-dark-blue-bold">{ this.getStateInfo()[e] }</span>
                                </Col>
                            </Row>
                        })
                    }
                </div> }
                <div id="arrow-icon" onClick={this.onArrowClick}>
                    { expanded
                        ? <Icon name="arrow-up-dark" width="20px" height="12px" />
                        : <Icon name="arrow-down-dark" width="20px" height="12px" />
                    }
                </div>
            </Col>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        stateInfo: state.taskList.stateInfo
    }
};

export default connect(mapStateToProps)(InformationSection);