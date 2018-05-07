import React from 'react';
import YouTube from 'react-youtube';
import Typography from 'material-ui/Typography';

import BaseComponent from '../../shared/BaseComponent';

export default class HowToRegister extends BaseComponent {
    render() {
        return (
            <div>
                <Typography gutterBottom>
                    First, watch this quick video to learn more about voter registration
                </Typography>
                <YouTube
                    videoId="qSTwrt8oE3g"
                    opts={{
                        playerVars: {
                            autoplay: 0
                        }
                    }}
                    onEnd={this.props.onVideoFinished}
                    className="video"
                    onReady={this._onReady}
                />
            </div>
        );
    }
}
