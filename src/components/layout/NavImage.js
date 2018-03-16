import React from 'react';
import { Image } from 'react-bootstrap';

import BaseComponent from '../shared/BaseComponent';
import appDataTypes from "../../constants/AppDataTypes";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

class Header extends BaseComponent {
    getImagePath = () => {
        const numberOfImages = 7;
        const imageNumber= Math.floor(Math.random() * numberOfImages) + 1;
        const img = require(`../../resources/images/navImages/image${imageNumber}.jpg`);
        return img;
    };
    render() {
        const { profile: { isSuccess, data } } = this.props;
        const name = isSuccess ? data.firstname : '';

        return (
            <div className="btw-nav-image">
                <div className='btw-name'>Welcome {name}</div>
                <Image className='btw-image' src={this.getImagePath()} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const profile = state.app[appDataTypes.profile];
    return { profile };
};

export default connect(mapStateToProps)(withRouter(Header));