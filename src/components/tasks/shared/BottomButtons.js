import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Routes from '../../../constants/Routes';
import TileTypes from '../../../constants/ResourceCenterTypes';
import BaseComponent from '../../shared/BaseComponent';
import Dialog from '../../shared/Dialog';
import StateInfo from './StateInfo';

export default class BottomButtons extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            showCheatSheet: false
        }
    }

    onTipsClick = () => {
      this.onLink(`${Routes.resourceCenter}?tile=${TileTypes.tipsForFriends}`)
    };

    render() {
        const { showCheatSheet } = this.state;
        return (
            <div>
                <Row className="bottoms-buttons no-margin" >
                    { this.isDesktop() ?
                        <Col md={8} onClick={this.onTipsClick}>
                          <div id="buttons-desktop">
                              Want some tips on how to talk to your friends about voting?
                          </div>
                        </Col> :
                        <Row className="no-margin" id="buttons-mobile">
                            <Col xs={6}>
                                <div className="button" onClick={() => this.setState({ showCheatSheet: true })} >
                                    Cheat sheet <br />
                                    on voting
                                </div>
                            </Col>
                            <Col xs={6}>
                                <div onClick={this.onTipsClick} className="button">
                                    Tips for talking<br />
                                    to your friends
                                </div>
                            </Col>
                        </Row> }
                </Row>
                <Dialog show={showCheatSheet} closeButton onClose={() => this.setState({ showCheatSheet: false })}>
                    <div className="btw-cheat-sheet-modal">
                        <div id="title">Cheat sheet</div>
                        <StateInfo taskData={this.props.taskData} />
                    </div>
                </Dialog>
            </div>
        );
    }
}