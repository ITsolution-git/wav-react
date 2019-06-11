import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import BaseComponent from '../shared/BaseComponent';
import Checkbox from '../shared/Checkbox';
import Dialog from '../shared/Dialog';
import Button from '../shared/Button';
import VotersTable from '../shared/VotersTable';
import SearchInput from '../shared/SearchInput';
import VotersProgressBar from '../shared/VotersProgressBar';
import Typography from '../shared/Typography';
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
                    sex: 'Male',
                    social: {
                        twitter: false,
                        linkedIn: false,
                        facebook: true
                    },
                    status: 'infrequent'
                },
                {
                    id: 2,
                    name: 'Denis Damin 2',
                    street: 'New work Sr. 1289',
                    sex: 'Female',
                    social: {
                        twitter: true,
                        linkedIn: true,
                        facebook: true
                    },
                    status: 'Not registered'
                },
                {
                    id: 3,
                    name: 'Denis Damin 3',
                    street: 'New work Sr. 1289',
                    sex: 'Female',
                    social: {
                        twitter: true,
                        linkedIn: true,
                        facebook: true
                    },
                    status: 'Not registered'
                },
                {
                    id: 4,
                    name: 'Denis Damin 4',
                    street: 'New work Sr. 1289',
                    sex: 'Male',
                    social: {
                        twitter: true,
                        linkedIn: false,
                        facebook: true
                    },
                    status: 'Not registered'
                },
                {
                    id: 5,
                    name: 'Denis Damin 5',
                    street: 'New work Sr. 1289',
                    sex: 'Male',
                    social: {
                        twitter: true,
                        linkedIn: true,
                        facebook: true
                    },
                    status: 'Regular'
                },
                {
                    id: 6,
                    name: 'Denis Damin 6',
                    street: 'New work Sr. 1289',
                    sex: 'Male',
                    social: {
                        twitter: true,
                        linkedIn: true,
                        facebook: true
                    },
                    status: 'Regular'
                },
                {
                    id: 7,
                    name: 'Denis Damin 7',
                    street: 'New work Sr. 1289',
                    sex: 'Male',
                    social: {
                        twitter: true,
                        linkedIn: true,
                        facebook: true
                    },
                    status: 'Regular'
                },
                {
                    id: 8,
                    name: 'Denis Damin 8',
                    street: 'New work Sr. 1289',
                    sex: 'Male',
                    social: {
                        twitter: true,
                        linkedIn: true,
                        facebook: true
                    },
                    status: 'Regular'
                },
                {
                    id: 9,
                    name: 'Denis Damin 9',
                    street: 'New work Sr. 1289',
                    sex: 'Male',
                    social: {
                        twitter: true,
                        linkedIn: true,
                        facebook: true
                    },
                    status: 'Regular'
                },
                {
                    id: 10,
                    name: 'Denis Damin 10',
                    street: 'New work Sr. 1289',
                    sex: 'Male',
                    social: {
                        twitter: true,
                        linkedIn: true,
                        facebook: true
                    },
                    status: 'Regular'
                },
                {
                    id: 11,
                    name: 'Denis Damin 11',
                    street: 'New work Sr. 1289',
                    sex: 'Male',
                    social: {
                        twitter: false,
                        linkedIn: false,
                        facebook: true
                    },
                    status: 'infrequent'
                },
                {
                    id: 12,
                    name: 'Denis Damin 12',
                    street: 'New work Sr. 1289',
                    sex: 'Female',
                    social: {
                        twitter: true,
                        linkedIn: true,
                        facebook: true
                    },
                    status: 'Not registered'
                },
                {
                    id: 13,
                    name: 'Denis Damin 13',
                    street: 'New work Sr. 1289',
                    sex: 'Female',
                    social: {
                        twitter: true,
                        linkedIn: true,
                        facebook: true
                    },
                    status: 'Not registered'
                },
                {
                    id: 14,
                    name: 'Denis Damin 14',
                    street: 'New work Sr. 1289',
                    sex: 'Male',
                    social: {
                        twitter: true,
                        linkedIn: false,
                        facebook: true
                    },
                    status: 'Not registered'
                },
                {
                    id: 15,
                    name: 'Denis Damin 15',
                    street: 'New work Sr. 1289',
                    sex: 'Male',
                    social: {
                        twitter: true,
                        linkedIn: true,
                        facebook: true
                    },
                    status: 'Regular'
                },
                {
                    id: 16,
                    name: 'Denis Damin 16',
                    street: 'New work Sr. 1289',
                    sex: 'Male',
                    social: {
                        twitter: true,
                        linkedIn: true,
                        facebook: true
                    },
                    status: 'Regular'
                },
                {
                    id: 17,
                    name: 'Denis Damin 17',
                    street: 'New work Sr. 1289',
                    sex: 'Male',
                    social: {
                        twitter: true,
                        linkedIn: true,
                        facebook: true
                    },
                    status: 'Regular'
                },
                {
                    id: 18,
                    name: 'Denis Damin 18',
                    street: 'New work Sr. 1289',
                    sex: 'Male',
                    social: {
                        twitter: true,
                        linkedIn: true,
                        facebook: true
                    },
                    status: 'Regular'
                },
                {
                    id: 19,
                    name: 'Denis Damin 19',
                    street: 'New work Sr. 1289',
                    sex: 'Male',
                    social: {
                        twitter: true,
                        linkedIn: true,
                        facebook: true
                    },
                    status: 'Regular'
                },
                {
                    id: 20,
                    name: 'Denis Damin 20',
                    street: 'New work Sr. 1289',
                    sex: 'Male',
                    social: {
                        twitter: true,
                        linkedIn: true,
                        facebook: true
                    },
                    status: 'Regular'
                }
            ],
            selectVoters: [],
            showAlertModal: false
        }
    }

    checkHandler = event => {
        const { checked } = event.target;
        checked && this.setState({ selectVoters: this.state.votersList, showAlertModal: true });
    }

    searchInputHandler = value => {
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

        this.setState({ selectVoters });
    }

    nextHandler = () => {
    }

    closeModalHandler = () => {
        this.setState({ showAlertModal: false });
    }

    selectTableHandler = (selectVoters) => {
        this.setState({ selectVoters });
    }

    render() {
        const { selectVoters, showAlertModal, votersList } = this.state;
        return (
            <ContentLayout>
                <div className='btw-select-voters container'>
                    <Row>
                        <Col xs={12}>
                            <Row>
                                <Col xs={12}>
                                    <Typography>
                                        Add 10 voters to your list
                                    </Typography>
                                    <Typography variant='body' displayInline lightColor>
                                        Select 10 people among your social media friends or search
                                        for other people you know among all the voters of your district.
                                        Try to choose a few among regular voters, a few among infrequent voters,
                                        and a few unregistered voters.
                                    </Typography>
                                    <Checkbox onChange={(event) => this.checkHandler(event)} label='test check' />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={12} md={12} lg={9}>
                                    <SearchInput
                                        placeholder='Search by name or address'
                                        onChange={(value) => this.searchInputHandler(value)} />
                                    {/* <div className='btw-paper table-container'>
                                        <VotersTable
                                            data={votersList}
                                            selectData={selectVoters}
                                            onSelect={(selectVoters) => this.selectTableHandler(selectVoters)} />
                                    </div> */}
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={3}>
                                    <VotersProgressBar
                                        color='blue'
                                        selectVoters={selectVoters}
                                        onClear={this.clearSelectedVotersHandler}
                                        onNext={this.nextHandler} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div >
                <Dialog
                    id='selectedVotersAlertDialog'
                    title='Hurray! We matched you with 40 of your friends.'
                    show={showAlertModal}
                    actionButtons={
                        <Row>
                            <Col xs={12}>
                                <Button
                                    id="selectedVotersAlertDialog"
                                    onClick={() => this.closeModalHandler()}
                                    style={{ width: '100%' }}>
                                    Ok, got it!
                                </Button>
                            </Col>
                        </Row>
                    }
                    onClose={this.closeModalHandler}>
                    <div>
                        <Typography style={{ marginBottom: 30 }} variant='body' displayInline='div' lightColor>
                            Select 10 people among your social media friends or search
                            for other people you know among all the voters of your district.
                        </Typography>
                        <Typography variant='body' displayInline lightColor>
                            Try to choose a few among regular voters, a few among
                            infrequent voters, and a few unregistered voters.
                        </Typography>
                    </div>
                </Dialog>
            </ContentLayout >
        );
    }
}

// TODO: Remain these code for implementing API.
const mapDispatchToProps = (dispatch) => ({
});

export default connect(null, mapDispatchToProps)(withRouter(SelectVoters));