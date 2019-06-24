import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import _ from 'lodash';

import routes from '../../../constants/Routes';
import BaseComponent from '../../shared/BaseComponent';
import Dialog from '../../shared/Dialog';
import Button from '../../shared/Button';
import VotersTable from '../../shared/VotersTable';
import SearchInput from '../../shared/SearchInput';
import VotersProgressBar from '../../shared/VotersProgressBar';
import Typography from '../../shared/Typography';
import ContentLayout from '../../layout/ContentLayout';
import SocialInfo from './SocialInfo';
import VoterNotFound from './VoterNotFound';

class SelectVoters extends BaseComponent {
    constructor() {
        super();
        this.state = {
            user: {
                firstname: 'Denis',
                lastname: 'Damin',
                social: {
                    twitter: true,
                    linkedIn: false,
                    facebook: false
                }
            },
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
                    status: 'Infrequent'
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
                    status: 'Regular'
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
                    status: 'Infrequent'
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
            selectedVoters: [],
            showAlertModal: false,
            searchString: ''
        }
    }

    isNotConnected = () => {
        const { user: { social: { twitter, linkedIn, facebook } } } = this.state;
        return !(twitter || linkedIn || facebook);
    }

    getSearchData = () => {
        const { searchString, votersList } = this.state;

        return !!searchString ?
            votersList.filter(item => item.name.toLowerCase().includes(searchString.toLowerCase())) :
            votersList;
    }

    searchInputHandler = value => {
        this.setState({ searchString: value });
    }

    clearSelectedVotersHandler = (id) => {
        let { selectedVoters } = this.state;

        if (id === 'all') {
            selectedVoters = [];
        } else {
            _.remove(selectedVoters, { id: id });
        }

        this.setState({ selectedVoters });
    }

    nextHandler = () => {
    }

    closeModalHandler = () => {
        this.setState({ showAlertModal: false });
    }

    selectTableHandler = (selectedVoters) => {
        this.setState({ selectedVoters });
    }

    socialConnectHandler = () => {
        this.onLink(routes.socialConnect);
    }

    renderDescription = () => {

        return (
            <>
                <Typography className='title'>
                    Add 10 voters to your list
                </Typography>
                <Typography variant='body' className='page-description'>
                    Select <b>10 people</b> among your social media friends or search
                    for other people you know among all the voters of your district.
                    Try to choose a few among <b>regular voters</b>, a few among
                    <b> infrequent voters</b>, and a few <b>unregistered voters</b>.
                </Typography>
                {this.isNotConnected() &&
                    <Typography variant='body' className='page-no-connect-description'>
                        To ease your searching process
                        <span onClick={this.socialConnectHandler}> connect your social media accounts.</span>
                    </Typography>
                }
            </>
        );
    }

    renderSocialInfo = (device) => {
        const { user } = this.state;

        if (!this.isNotConnected()) {
            return (
                <SocialInfo
                    social={user.social}
                    onSocialConnect={this.socialConnectHandler}
                    className={`social-info-${device}`} />
            );
        }
    }

    renderVotersProgressBar = (device) => {
        const { selectedVoters } = this.state;

        return (
            <VotersProgressBar
                color='blue'
                selectedVoters={selectedVoters}
                onClear={this.clearSelectedVotersHandler}
                onNext={this.nextHandler}
                className={`voter-progress-bar-${device}`} />
        );
    }

    renderNoDataText = (isNotConnected, isNoData) => {
        const { user } = this.state;

        return isNoData ?
            (<div className='social-no-data'>
                <VoterNotFound />
            </div>) :
            (<div className='social-no-connect'>
                <SocialInfo
                    social={user.social}
                    onSocialConnect={this.socialConnectHandler}
                    noConnect={isNotConnected} />
            </div>);
    }

    renderTable = () => {
        const { selectedVoters, searchString } = this.state;
        const data = this.getSearchData();
        const isNotConnected = this.isNotConnected();
        const isNoData = data.length === 0;

        return isNotConnected || isNoData ?
            this.renderNoDataText(isNotConnected, isNoData) :
            (
                <div className='btw-paper table-container'>
                    <Typography variant='body' className='table-description'>
                        {!!searchString ?
                            `We found ${data.length} results for “${searchString}”` :
                            `Hurray! We matched you with ${data.length} of your friends.`
                        }
                    </Typography>
                    <VotersTable
                        data={data}
                        selectedData={selectedVoters}
                        onSelect={this.selectTableHandler} />
                </div>
            );
    }

    renderDialog = () => {
        const { showAlertModal } = this.state;

        return (
            <Dialog
                id='selectedVotersAlertDialog'
                title='Hurray! We matched you with 40 of your friends.'
                show={showAlertModal}
                actionButtons={
                    <Row>
                        <Col xs={12}>
                            <Button
                                fullWidth
                                id='selectedVotersAlertDialog'
                                onClick={this.closeModalHandler}>
                                Ok, got it!
                            </Button>
                        </Col>
                    </Row>
                }
                onClose={this.closeModalHandler}>
                <div>
                    <Typography variant='body' displayInline lightColor>
                        Select 10 people among your social media friends or search
                        for other people you know among all the voters of your district.
                    </Typography>
                    <Typography variant='body' displayInline lightColor>
                        Try to choose a few among regular voters, a few among
                        infrequent voters, and a few unregistered voters.
                    </Typography>
                </div>
            </Dialog>
        );
    }

    render() {

        return (
            <ContentLayout>
                <Row className='btw-select-voters container'>
                    <Col xs={12}>
                        <Row>
                            <Col xs={12} lg={9}>
                                {this.renderSocialInfo('tablet')}
                                {this.renderDescription()}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} lg={9}>
                                <Row>
                                    <Col xs={12}>
                                        <SearchInput
                                            placeholder='Search by name or address'
                                            onChange={this.searchInputHandler}
                                            className='search-input' />
                                    </Col>
                                    <Col xs={12}>
                                        {this.renderTable()}
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={3}>
                                {this.renderVotersProgressBar('desktop')}
                                {this.renderSocialInfo('desktop')}
                            </Col>
                        </Row>
                    </Col>
                    {this.renderVotersProgressBar('tablet')}
                </Row >
                {this.renderDialog()}
            </ContentLayout >
        );
    }
}

// TODO: Remain these code for implementing API.
const mapDispatchToProps = (dispatch) => ({
});

export default connect(null, mapDispatchToProps)(withRouter(SelectVoters));