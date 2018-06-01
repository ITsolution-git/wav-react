import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from "react-redux";

import BaseComponent from '../../shared/BaseComponent';
import imgPhone from '../../../resources/images/phone.png';
import imgReward from '../../../resources/images/reward.png';
import imgCheck from '../../../resources/images/checkmark.png'
import imgLightBulb from '../../../resources/images/lightbulb.png'
import States_Special from "../../../constants/States_Special";


class InformationSection extends BaseComponent {
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
            group_info = {},
            voter_metaData = {}
        } = {} } = this.props;

        return (
            <Col
                md={3}
                xs={ this.isMobile() ? 12 : 8 }
                xsOffset={ this.isMobile() ? 1 : 0 }
                className="btw-task-info"
                style={{marginLeft: (this.isMobile() ? "0" : "80px")}}>
                <Row className="section">
                    <Col xs={2}>
                        <img src={imgReward} alt="" width={50} height={50} />
                    </Col>
                    <Col xs={10}>
                        <span className="title"><b>Rewards Points</b></span><br />
                        <span className="description">This task is worth {group_info.value} points</span>
                    </Col>
                </Row>

                <hr />

                <Row className="section">
                    <Col xs={2}>
                        <img src={imgPhone} alt="" width={50} height={50} />
                    </Col>
                    <Col xs={10}>
                        <span className="title"><b>Need help?</b></span><br />
                        <span className="description">hi@bethewave.vote</span><br/>
                        <span className="description">(707) 408-8437</span>
                    </Col>
                </Row>

                <hr />

                <Row className="section">
                    <Col xs={2}>
                        <img src={imgLightBulb} alt="" width={50} height={50} />
                    </Col>
                    <Col xs={10}>
                        <span className="title"><b>Relevant voting information that may apply to {voter_metaData.firstname + ' ' + voter_metaData.lastname}</b></span>
                    </Col>
                </Row>

                <br/>
                {
                    Object.keys(this.getStateInfo()).map((e, index) => {
                        return <Row key={index} className="section">
                            <Col xs={2} style={{padding:"0"}}>
                                <img src={imgCheck} className="pull-right" alt="" width={20} height={20} />
                            </Col>
                            <Col xs={10}>
                                <span><b>{e}</b></span><br />
                                <span>{ this.getStateInfo()[e] }</span>
                            </Col>
                        </Row>
                    })
                }
                <br/>
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