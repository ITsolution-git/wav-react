import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';
import YouTube from 'react-youtube';
import Typography from 'material-ui/Typography';

import BaseComponent from '../../shared/BaseComponent';

class HowToRegister extends BaseComponent {
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
                    className="video"
                    onReady={this._onReady}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    }
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HowToRegister));