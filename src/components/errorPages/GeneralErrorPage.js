import React from 'react';
import { withRouter } from 'react-router-dom';

import routes from '../../constants/Routes';
import exclamation from '../../resources/images/exclamation.png';

import BaseComponent from '../shared/BaseComponent';
import {connect} from "react-redux";
import { btwLogout } from "../../actions/SignOnAction";
import { bindActionCreators } from "redux";

class GeneralErrorPage extends BaseComponent {
    constructor( props, context ) {
        super(props, context);
    }

    componentWillMount() {
        setTimeout(() => {
            this.props.actions.btwLogout();
        }, 3000)
    }

    render() {
        return (
            <div className='btw-error'>
                <img src={ exclamation } width={150} height={150}></img>
                <div>
                    <h3>Sorry ....Something went wrong .... Please try again later</h3>
                    <br/><br/><br/>
                    <button className='btn btn-primary btn-general-go-back' 
                            onClick={() => this.onLink(routes.login)}>
                        Back to login page
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
        actions: bindActionCreators({ btwLogout }, dispatch)
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GeneralErrorPage));
