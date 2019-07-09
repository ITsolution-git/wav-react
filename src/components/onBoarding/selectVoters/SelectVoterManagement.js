import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import _ from 'lodash';

import routes from '../../../constants/Routes';
import AuthStorage from '../../../storage/AuthStorage'
import { storageKeys, LocalStorageManager as lsManager } from '../../../storage';
import {
    BaseComponent, Button, Typography, Dialog, VotersTable, SearchInput,
    VotersProgressBar, SocialInfo, VoterNotFound, ConnectListInfo, UploadFileDialog
} from '../../shared';
import { updateProfile, updateOnboardingByVoter } from '../../../actions';

class SelectVoterManagement extends BaseComponent {
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
                }
            ],
            selectedVoters: [],
            showAlertModal: false,
            isUploadDialogShow: false,
            searchString: '',
            files: [
                {
                    name: 'voters_list.csv',
                    isOn: true
                },
                {
                    name: 'voters_list.xls',
                    isOn: true
                }
            ]
        }
    }

    isNotConnected = () => {
        const { user: { social: { twitter, linkedIn, facebook } } } = this.state;
        return !(twitter || linkedIn || facebook);
    };

    getSearchData = () => {
        const { searchString, votersList } = this.state;

        return !!searchString ?
            votersList.filter(item => item.name.toLowerCase().includes(searchString.toLowerCase())) :
            votersList;
    };

    searchInputHandler = value => {
        this.setState({ searchString: value });
    };

    clearSelectedVotersHandler = (id) => {
        let { selectedVoters } = this.state;

        if (id === 'all') {
            selectedVoters = [];
        } else {
            _.remove(selectedVoters, { id: id });
        }

        this.setState({ selectedVoters });
    };

    nextHandler = () => {
        lsManager.removeItem(storageKeys.firstLogin);
        const { user, actions } = this.props
        actions.updateProfile(updateOnboardingByVoter(user, true), true)
    };

    closeModalHandler = () => {
        this.setState({ showAlertModal: false });
    };

    selectTableHandler = (selectedVoters) => {
        this.setState({ selectedVoters });
    };

    socialConnectHandler = () => {
        this.onLink(routes.socialConnect);
    };

    importFilesHandler = () => {
        this.setState({ isUploadDialogShow: true });
    }

    onSuccessUploadDialog = files => {
        this.setState({ isUploadDialogShow: false })
        this.onLink(routes.socialConnect);
    }

    onCloseUploadDialog = () => {
        this.setState({ isUploadDialogShow: false })
    }

    switchStatusHandler = (fileIndex) => { }

    renderDescription = () => {

        return (
            <>
                <Typography className='page-title'>
                    Add 10 voters to your list
                </Typography>
                <Typography variant='body' lightColor className='page-description'>
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
    };

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
    };

    renderConnectListInfo = () => {
        const { files } = this.state;

        return (
            <ConnectListInfo
                files={files}
                importFiles={this.importFilesHandler}
                switchStatus={this.switchStatusHandler}
                className='connect-list-info' />
        )
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
    };

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
    };

    renderTable = () => {
        const { selectedVoters, searchString } = this.state;
        const data = this.getSearchData();
        const isNotConnected = this.isNotConnected();
        const isNoData = data.length === 0;

        return isNotConnected || isNoData ?
            this.renderNoDataText(isNotConnected, isNoData) :
            (
                <div className='btw-paper table-container'>
                    <Typography variant='body' lightColor fontWeight='600' className='table-description'>
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
    };

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
    };

    render() {
        const { isUploadDialogShow } = this.state;

        return (
            <Container>
                <Row className='btw-select-voters'>
                    <Col>
                        <Row>
                            <Col md={12} lg={9}>
                                {this.renderDescription()}
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} lg={9}>
                                <Row>
                                    <Col>
                                        <SearchInput
                                            placeholder='Search by name or address'
                                            onChange={this.searchInputHandler}
                                            className='search-input' />
                                        {this.renderTable()}
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={12} lg={3}>
                                {this.renderVotersProgressBar('desktop')}
                                {this.renderConnectListInfo()}
                            </Col>
                        </Row>
                    </Col>
                    {this.renderVotersProgressBar('tablet')}
                </Row >
                {this.renderDialog()}
                <UploadFileDialog
                    show={isUploadDialogShow}
                    onClose={this.onCloseUploadDialog}
                    onSuccess={this.onSuccessUploadDialog} />
            </Container>
        );
    }
}

// TODO: Remain these code for implementing API.
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ updateProfile }, dispatch)
});

const mapStateToProps = (state) => {
    const user = AuthStorage.getLoggedUser()
    return {
        user
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SelectVoterManagement));
