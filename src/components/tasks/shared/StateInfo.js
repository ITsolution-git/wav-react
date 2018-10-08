import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import BaseComponent from '../../shared/BaseComponent';

class StateInfo extends BaseComponent {
    getStateInfo = () => {
        const { taskData, stateInfo } = this.props;

        if (!stateInfo) return "";

        // if (taskData.voter_metaData.age && taskData.voter_metaData.age > 17 && taskData.voter_metaData.age < 23) {}
        // if (States_Special.includes(stateInfo.state)) {}

        return {
            "Next Election": stateInfo['nextElection'],
            "Online voter registration": stateInfo["onlineRegistration"] ? "Yes" : "No",
            "Voter registration deadline": stateInfo['absoluteRegistrationDeadlineByMail'],
            "Vote by mail option": stateInfo["voteByMail"] ? "Yes" : "No",
            "Vote by mail application deadline": stateInfo["absoluteAbsenteeBallotApplicationDeadline"],
            "ID needed at polls": stateInfo["idNeeded"] ? "Yes" : "No"
        }
    };

    render() {
        return (
            <div className="info">
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
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        stateInfo: state.taskList.stateInfo
    }
};

export default connect(mapStateToProps)(StateInfo);