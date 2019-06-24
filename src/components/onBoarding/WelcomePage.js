import React from 'react';
import { withRouter } from 'react-router-dom';
import { findDOMNode } from 'react-dom'
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';
import classnames from 'classnames';

import BaseComponent from '../shared/BaseComponent';
import Button from '../shared/Button';
import Paper from '../shared/Paper';
import routes from '../../constants/Routes';

class WelcomePage extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            playing: false
        }
    }

    onGetStarted = () => {
        this.onLink(routes.selectDistrict);
    };

    playPause = () => {
        this.setState({playing: !this.state.playing});
    };

    ref = player => {
        this.player = player;
    };

    onClickFullscreen = () => {
        screenfull.request(findDOMNode(this.player))
    };

    render() {
        const { playing } = this.state;

        return (
            <div className="layout-center">
                <Paper className={'welcome-div'}>
                    <div className={'welcome-content'}>
                        <h2 className="welcome-title">Hello there!</h2>
                        <p className="welcome-message">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae porttitor leo. Pellentesque sed pharetra erat. Nam non odio turpis. Quisque lectus augue, convallis vel tristique eget, consectetur.</p>
                    </div>

                    <div className="welcome-video-container">
                        <ReactPlayer 
                            url='https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'
                            width="100%"
                            height="100%"
                            playing={playing}
                            ref={this.ref}
                        />

                        <div className="play-button" onClick={this.playPause}>
                            <span className="white-circle">
                                <span className={classnames('play-icon', { "pause" : playing})}></span>
                            </span>
                        </div>

                        <div className="full-screen" onClick={this.onClickFullscreen}>View Full Screen</div>
                    </div>

                    <div className="watch-later-div">
                        <Button onClick={this.onGetStarted}>Watch Later</Button>
                    </div>
                </Paper>
            </div>
            
        );
    }
}

export default withRouter(WelcomePage);