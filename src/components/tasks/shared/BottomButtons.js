import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Routes from '../../../constants/Routes';
import TileTypes from '../../../constants/ResourceCenterTypes';
import BaseComponent from '../../shared/BaseComponent';

export default class BottomButtons extends BaseComponent {
    onTipsClick = () => {
      this.onLink(`${Routes.resourceCenter}?tile=${TileTypes.tipsForFriends}`)
    };

    render() {
        return (
            <div>
                <Row className="bottoms-buttons no-margin" >
                    { this.isDesktop() ?
                        <Col md={8} onClick={this.onTipsClick}>
                          <div id="buttons-desktop" className="title-20-blue">
                              Want some tips on how to talk to your friends about voting?
                          </div>
                        </Col> :
                        <Row className="no-margin" id="buttons-mobile">
                            <Col xs={6}>
                                <div className="button title-16-white">
                                    Cheat sheet <br />
                                    on voting
                                </div>
                            </Col>
                            <Col xs={6}>
                                <div onClick={this.onTipsClick} className="button title-16-white">
                                    Tips for talking<br />
                                    to your friends
                                </div>
                            </Col>
                        </Row> }
                </Row>
            </div>
        );
    }
}