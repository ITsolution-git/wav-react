import React from 'react';
import PropTypes from 'prop-types';

import { BaseComponent, Typography, SocialList, Button } from '../shared';

class VoterCommunication extends BaseComponent {
    constructor() {
        super();
        this.state = {
            readMore: false
        }
    }

    readMoreButtonHandler = () => {
        this.setState((prevState) => ({
            readMore: !prevState.readMore
        }));
    }

    renderReadMoreButton = (type) => {
        const { readMore } = this.state;

        if (type === 'showLess') {
            return readMore && (<Typography variant='body' onClick={this.readMoreButtonHandler} className='show-more'>Show Less</Typography>)
        }
        return !readMore && (<>.. <span onClick={this.readMoreButtonHandler} className='show-more'>Read more</span></>)
    }

    renderMessage = () => {
        const { readMore } = this.state;
        const { selectedVoter } = this.props;

        return readMore && (
            <div className='content-part'>
                <Typography variant='body' className='subtitle'>
                    1. Message
                </Typography>
                <Typography variant='body' lightColor className='description'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Praesent vitae porttitor leo. Start with something simple,
                    like that:
                </Typography>
                <Typography variant='body' className=' btw-paper message-sample'>
                    Hey, Dennis! How are you? Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Praesent vitae porttitor leo.
                    Pellentesque sed pharetra erat. Nam non odio turpis.
                    Quisque lectus augue, convallis vel tristique eget, consectetur?
                </Typography>
                <div className='button-list'>
                    <Button size='small' color='blue' className='send-button'>
                        <i className='fa fa-envelope' />
                        Send Email
                    </Button>
                    <SocialList social={selectedVoter.social} className='social-button-list' />
                    <Button size='small' color='white'>
                        Copy
                    </Button>
                </div>
            </div>
        );
    }

    renderPhone = () => {
        const { readMore } = this.state;
        const { selectedVoter } = this.props;

        return readMore && (
            <div className='content-part'>
                <Typography variant='body' className='subtitle'>
                    2. Phone Call
                </Typography>
                <Typography variant='body' lightColor className='description'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate
                    velit esse cillum dolore eu fugiat nulla pariatur.
                </Typography>
                <div className='button-list'>
                    <Button size='small' color='blue' className='send-button'>
                        Call {selectedVoter.phone}
                    </Button>
                </div>
            </div>
        );
    }

    renderPerson = () => {
        const { readMore } = this.state;

        return readMore && (
            <div className='content-part'>
                <Typography variant='body' className='subtitle'>
                    3. In Person
                </Typography>
                <Typography variant='body' lightColor className='description'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat.
                </Typography>
                <ul className='person-list'>
                    <li>
                        <Typography variant='body' lightColor>
                            Lorem ipsum
                        </Typography>
                    </li>
                    <li>
                        <Typography variant='body' lightColor>
                            quis nostrud
                        </Typography>
                    </li>
                    <li>
                        <Typography variant='body' lightColor>
                            ut aliquip ex
                        </Typography>
                    </li>
                </ul>
            </div>
        );
    }

    render() {
        const { selectedVoter } = this.props;

        return (
            <div className='btw-voter-communication'>
                <Typography className='title'>
                    Channels of communication
                </Typography>
                <div className='social-status'>
                    <Typography variant='body' lightColor className='social-text'>
                        You are conneced with this user on:
                    </Typography>
                    <SocialList social={selectedVoter.social} />
                </div>
                <Typography variant='body' lightColor className='social-text'>
                    There are three basic ways for you to communicate with this voter.
                    You can use your social media connections or email;
                    in case you know their phone number, you can call;
                    and the last but not least – you can set up a real meeting.
                    {this.renderReadMoreButton()}
                </Typography>
                {this.renderMessage()}
                {this.renderPhone()}
                {this.renderPerson()}
                {this.renderReadMoreButton('showLess')}
            </div>
        );
    }
}

VoterCommunication.propTypes = {
    selectedVoter: PropTypes.object
};

export default VoterCommunication;
