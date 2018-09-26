import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Table, Row, Col } from 'react-bootstrap';

import BaseComponent from '../shared/BaseComponent';
import {
    loadVotingInfo
} from '../../actions/VoterListAction';
import { replaceNumbersWithX } from '../../helpers/InputHelper';

const dataTypes = {
    referendum: 'referendum',
    electionContest: 'electionContest',
    pollingLocation: 'pollingLocation'
};

class VotingInfo extends BaseComponent {
    componentWillMount() {
        const { votingInfo, email, actions } = this.props;
        Object.values(dataTypes).forEach(type => {
            const { isFetching, isSuccess, error } = (votingInfo || {})[type] || {};
            if (!isFetching && !isSuccess && !error) {
                actions.loadVotingInfo(email, type);
            }
        })
    }

    render() {
        const {
            referendum = {},
            electionContest = {},
            pollingLocation = {}
        } = this.props.votingInfo;

        console.log(electionContest);

        return (
            <div className="voting-info">
                { pollingLocation.isSuccess && pollingLocation.data.length > 0 &&
                    <div className='block'>
                        <div className='title text-18-dark-blue-bold'>Polling Info</div>
                        { pollingLocation.data.map((info, i) => {
                            const {
                                address: {
                                    city, line1, locationName, state, zip
                                },
                                notes,
                                pollingHours
                            } = info;
                            return (
                                <div key={i}>
                                    <div className='section'>
                                        <div className='title-16-blue'>Address:</div>
                                        <div className='text-15-dark-blue-bold'>{ locationName }</div>
                                        <div className='text-15-dark-blue-bold'>{ replaceNumbersWithX(line1) }, { city }, { state }, { zip } </div>
                                    </div>
                                    <div className='section'>
                                        <div className='title-16-blue'>Notes:</div>
                                        <div className='text-15-dark-blue-bold'>{ notes }</div>
                                    </div>
                                    <div className='section'>
                                        <div className='title-16-blue'>Polling hours:</div>
                                        <div className='text-15-dark-blue-bold'>{ pollingHours }</div>
                                    </div>
                                </div>
                                )
                            })
                        }
                    </div>
                }
                { referendum.isSuccess && referendum.data.count > 0 &&
                    <div className='block'>
                        <div className='title text-18-dark-blue-bold'>Referendum Info</div>
                        <Table striped bordered >
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Subtitle</th>
                            </tr>
                            </thead>
                            <tbody>
                            { referendum.data.list.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td width="40%">{item.referendumTitle}</td>
                                        <td width="60%">{item.referendumSubtitle}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </Table>
                    </div>
                }
                { electionContest.isSuccess && electionContest.data.length > 0 &&
                    <div className='block'>
                        <div className='title text-18-dark-blue-bold'>Election Contest Info</div>
                        <Table striped bordered >
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Party</th>
                                <th>Web Site</th>
                            </tr>
                            </thead>
                            <tbody>
                            { electionContest.data.map(item => {
                                return item.candidates.map((candidate, i) => {
                                    const { name, party, candidateUrl } = candidate;
                                    return (
                                        <tr key={i}>
                                            <td width="40%">{ name }</td>
                                            <td width="40%">{ party }</td>
                                            <td width="20%">
                                                { candidateUrl && <a target="_blank" href={candidateUrl}>Site</a> }
                                            </td>
                                        </tr>
                                    )
                                });
                            })}
                            </tbody>
                        </Table>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        votingInfo: state.votingInfo[ownProps.email] || {},
        email: ownProps.email
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ loadVotingInfo }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VotingInfo));
