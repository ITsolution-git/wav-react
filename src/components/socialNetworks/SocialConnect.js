import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import BaseComponent from '../shared/BaseComponent';
import Button from '../shared/Button';
import SocialItem from './SocialItem';

class SocialConnect extends BaseComponent {
    constructor() {
        super();
        this.state = {
            facebook: false,
            twitter: false,
            linkedIn: false
        }
    }

    // TODO: implement socialConnectHandler
    socialConnectHandler = (name) => {
        this.setState({ [name]: true })
    }

    // TODO: implement showResultHandler
    showResultHandler = () => {
    }

    socialItemRender = () => {
        const { facebook, twitter, linkedIn } = this.state;

        return (
            <div className='socialGroup'>
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

    render() {
        return (
            <div className='btw-social-connect'>
                <div className='content'>
                    <div className='title'>Connect social accounts</div>
                    <div className='description'>
                        Connect your favourite social media services
                        to find your friends among all the voters.
					</div>
                    {this.socialItemRender()}
                    <Button onClick={this.showResultHandler}>
                        Show Results
                    </Button>
                </div>
            </div >
        );
    }
}

// TODO: Remain these code for implementing API.
const mapStateToProps = (state) => {
    const { isUserFound } = state.request;
    return {
        isUserFound
    };
};

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SocialConnect));