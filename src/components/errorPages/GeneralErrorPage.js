import React from 'react';
import { withRouter } from 'react-router-dom';

import routes from '../../constants/Routes';
import exclamation from '../../resources/images/exclamation.png';
import { logout } from '../../helpers/AuthHelper';

import BaseComponent from '../shared/BaseComponent';

class GeneralErrorPage extends BaseComponent {
    constructor( props, context ) {
        super(props, context);
    }

    componentWillMount() {
        setTimeout(() => {
            logout();
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

export default withRouter(GeneralErrorPage);