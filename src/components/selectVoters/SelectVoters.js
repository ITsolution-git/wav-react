import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import BaseComponent from '../shared/BaseComponent';
import Checkbox from '../shared/Checkbox';
import SearchInput from '../shared/SearchInput';
import VotersProgressBar from '../shared/VotersProgressBar';
import ContentLayout from '../layout/ContentLayout';

class SelectVoters extends BaseComponent {
    constructor() {
        super();
        this.state = {
            votersList: [
                { 
                    id: 1,
                    name: 'Denis Damin 1',
                    street: 'New work Sr. 1289',
                    sex: 'Male'
                },
                { 
                    id: 2,
                    name: 'Denis Damin 2',
                    street: 'New work Sr. 1289',
                    sex: 'Male'
                },
                { 
                    id: 3,
                    name: 'Denis Damin 3',
                    street: 'New work Sr. 1289',
                    sex: 'Male'
                },
                { 
                    id: 4,
                    name: 'Denis Damin 4',
                    street: 'New work Sr. 1289',
                    sex: 'Male'
                },
                { 
                    id: 5,
                    name: 'Denis Damin 5',
                    street: 'New work Sr. 1289',
                    sex: 'Male'
                },
                { 
                    id: 6,
                    name: 'Denis Damin 6',
                    street: 'New work Sr. 1289',
                    sex: 'Male'
                },
                { 
                    id: 7,
                    name: 'Denis Damin 7',
                    street: 'New work Sr. 1289',
                    sex: 'Male'
                },
                { 
                    id: 8,
                    name: 'Denis Damin 8',
                    street: 'New work Sr. 1289',
                    sex: 'Male'
                },
                { 
                    id: 9,
                    name: 'Denis Damin 9',
                    street: 'New work Sr. 1289',
                    sex: 'Male'
                },
                { 
                    id: 10,
                    name: 'Denis Damin 10',
                    street: 'New work Sr. 1289',
                    sex: 'Male'
                }
            ],
            selectVoters: []
        }
    }

    checkHandler = event => {
        const { checked } = event.target;
        checked && this.setState({selectVoters: this.state.votersList});
    }

    searchInputHandler = value => {
        console.log(value);
    }

    clearSelectedVotersHandler = (id) => {
        let { selectVoters } = this.state;

        if (id === 'all') {
            selectVoters = [];
        } else {
            const targetIndex = selectVoters.findIndex(voter => (
                voter.id === id
            ));

            selectVoters = [
                ...selectVoters.slice(0, targetIndex), 
                ...selectVoters.slice(targetIndex + 1)
            ];
        }

        this.setState({selectVoters});
    }

    nextHandler = () => {
        console.log('nextHandler');
    }

    render() {
        const {selectVoters} = this.state;
        return (
            <ContentLayout>
                <div className='btw-select-voters container'>
                    <Row>
                        <Col xs={12}>
                            <Row>
                                <Col xs={12}>
                                    <div className='title'>Add 10 voters to your list</div>
                                    <div className='description'>
                                        Select 10 people among your social media friends or search
                                        for other people you know among all the voters of your district.
                                        Try to choose a few among regular voters, a few among infrequent voters,
                                        and a few unregistered voters.
					                </div>
                                    <Checkbox onChange={(event) => this.checkHandler(event)} label='test check' />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={12} md={12} lg={9}>
                                     <SearchInput
                                        placeholder='Search by name or address'
                                        onChange={(value) => this.searchInputHandler(value)} />
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={3}>
                                    {/* <VotersProgressBar 
                                        selectVoters={selectVoters}
                                        onClear={this.clearSelectedVotersHandler}
                                        onNext={this.nextHandler} /> */}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div >
                <VotersProgressBar 
                    selectVoters={selectVoters}
                    onClear={this.clearSelectedVotersHandler}
                    onNext={this.nextHandler} />
            </ContentLayout >
        );
    }
}

// TODO: Remain these code for implementing API.
const mapDispatchToProps = (dispatch) => ({
});

export default connect(null, mapDispatchToProps)(withRouter(SelectVoters));