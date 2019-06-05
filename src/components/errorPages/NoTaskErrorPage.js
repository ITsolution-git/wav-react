import React from 'react';
import { withRouter } from 'react-router-dom';

import routes from '../../constants/Routes';
import exclamation from '../../resources/images/exclamation.png';

import BaseComponent from '../shared/BaseComponent';
import {connect} from "react-redux";
import { bindActionCreators } from "redux";

class NoTaskErrorPage extends BaseComponent {
    render() {
        return (
            <div className='btw-error'>
                <img alt='exclamation.png' src={ exclamation } width={150} height={150} />
                <div>
                    <h3>Sorry ....there is not related task.... </h3>
                    <br/><br/><br/>
                    <button className='btn btn-primary btn-general-go-back' 
                            onClick={() => this.onLink(routes.login)}>
                        Back to Home page
                    </button>
                </div>
			</div>
        );
    }
}



const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({  }, dispatch)
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NoTaskErrorPage));
