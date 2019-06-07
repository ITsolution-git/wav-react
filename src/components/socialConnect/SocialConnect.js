import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Grid, Typography, Paper } from '@material-ui/core';

import BaseComponent from '../shared/BaseComponent';
import Button from '../shared/Button';
import SocialItem from './SocialItem';

class SocialConnect extends BaseComponent {
    constructor() {
        super();
        this.state = {
            facebook: true,
            twitter: false,
            linkedIn: false
        }
    }

    socialConnectHandler = (name) => {
        console.log(name);
    }

    showResultHandler = () => {
        console.log('Show Results');
    }

    socialItemRender = () => {
        const { facebook, twitter, linkedIn } = this.state;
       
        return (
            <Paper className='socialGroup'>
                <SocialItem name='facebook' status={facebook} socialConnectHandler={this.socialConnectHandler('facebook')} />
                <SocialItem name='twitter' status={twitter} socialConnectHandler={this.socialConnectHandler('twitter')} />
                <SocialItem name='linkedIn' status={linkedIn} socialConnectHandler={this.socialConnectHandler('linkedIn')} />
            </Paper>
        );
    }

    render() {
        return (
            <div className='btw-social-connect'>
                <Grid container alignItems='center' justify='center'>
                    <Paper className='content'>
                        <Grid container alignItems='center' justify='flex-start'>
                            <Typography className='title'>Connect social accounts</Typography>
                        </Grid>
                        <Grid container alignItems='center' justify='flex-start'>
                            <Typography className='description'>
                                Connect your favourite social media services
                                to find your friends among all the voters.
							</Typography>
                        </Grid>
                        {this.socialItemRender()}
                        <Button
                            color='blue4'
                            style={{ width: '100%', fontSize: 13 }}
                            onClick={this.showResultHandler}>
                            Show Results
                        </Button>
                    </Paper>
                </Grid>
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    const { isUserFound } = state.request;
    return {
        isUserFound
    };
};

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SocialConnect));