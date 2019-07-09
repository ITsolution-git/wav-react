import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import AuthStorage from '../../../storage/AuthStorage'
import { BaseComponent, Button, Typography } from '../../shared'
import { SocialItem, UploadFileDialog } from './index';
import { updateProfile, updateOnboardingBySource } from '../../../actions';

class SocialConnect extends BaseComponent {
    constructor() {
        super();
        this.state = {
            facebook: false,
            twitter: false,
            linkedIn: false,
            isUploadDialogShow: false,
            files: [],
            isImported: false
        }
    }

    socialConnectHandler = (name) => {
        this.setState({ [name]: true, isImported: true })
    };

    showResultHandler = () => {
        if (this.state.isImported) {
            const { user, actions } = this.props
            actions.updateProfile(updateOnboardingBySource(user, true), true)        
        }
    };

    uploadButtonHandler = () => {
        this.setState({ isUploadDialogShow: true })
    }

    onSuccessUploadDialog = files => {
        this.setState({ files, isUploadDialogShow: false, isImported: true })
    }

    onCloseUploadDialog = () => {
        this.setState({ isUploadDialogShow: false })
    }

    socialItemRender = () => {
        const { facebook, twitter, linkedIn } = this.state;

        return (
            <div className='social-group'>
                <SocialItem
                    name='facebook'
                    status={facebook}
                    socialConnectHandler={() => this.socialConnectHandler('facebook')} />
                <SocialItem
                    name='twitter'
                    status={twitter}
                    socialConnectHandler={() => this.socialConnectHandler('twitter')} />
                <SocialItem
                    name='linkedIn'
                    status={linkedIn}
                    socialConnectHandler={() => this.socialConnectHandler('linkedIn')} />
            </div>
        );
    }

    renderUploadContent = () => {
        return (
            <div className='content upload-content'>
                <Typography className='title'>Import your own voters list</Typography>
                <Typography variant='body' lightColor className='description'>
                    Already have a list of voters you want to work with ? Use it!
                </Typography>
                <Typography variant='body' lightColor className='sub-description'>
                    Accepted formats: .csv, Excel (.xls, .xlsx)
                </Typography>
                <Button
                    color='white'
                    size='small'
                    onClick={this.uploadButtonHandler}
                    className='upload-button'>
                    Upload File
                </Button>
            </div>
        )
    }

    render() {
        const { isUploadDialogShow } = this.state;

        return (
            <Container className='btw-social-connect btw-paper'>
                <div className='content'>
                    <Typography className='title'>Connect social accounts</Typography>
                    <Typography variant='body' lightColor className='description'>
                        Connect your favourite social media services
                        to find your friends among all the voters.
					</Typography>
                    {this.socialItemRender()}
                </div>
                {!this.isMobileOnly() && this.renderUploadContent()}
                <Button fullWidth onClick={this.showResultHandler}>
                    Show Results
                </Button>
                <UploadFileDialog
                    show={isUploadDialogShow}
                    onClose={this.onCloseUploadDialog}
                    onSuccess={this.onSuccessUploadDialog} />
            </Container >
        );
    }
}

const mapStateToProps = (state) => {
    const user = AuthStorage.getLoggedUser()
    return {
        user
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ updateProfile }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SocialConnect));