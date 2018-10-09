import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import BaseComponent from '../shared/BaseComponent';
import ContentLayout from '../layout/ContentLayout';
import Tile from './resourceCenter/Tile';
import tileTypes from '../../constants/ResourceCenterTypes';
import Icon from '../shared/Icon';
import { getUrlParams } from '../../helpers/UrlHelper';

const titles = {
    [`${tileTypes.tipsForFriends}`]: 'Tips for talking with friends',
    [`${tileTypes.talkingPoints}`]: 'Talking points',
    [`${tileTypes.registrationInfo}`]: 'Voter Registration Info',
    [`${tileTypes.earlyVotingInfo}`]: 'Early Voting Info',
    [`${tileTypes.idLaws}`]: 'Voter ID Laws',
    [`${tileTypes.ballotGuides}`]: 'Ballot Guides',
    [`${tileTypes.votingFaqs}`]: 'Voting FAQs',

};

class ResourceCenter extends BaseComponent {

    constructor(props) {
        super(props);
        const { tile = ''} = getUrlParams(this.props);
        this.state = {
            activeTile: tile,
            backTo: !!tile
        };
    }
    getViewProps = () => {
        if (this.isDesktop()) {
            return {
                titleClass: 'title-24-blue',
                tileClass: 'title-20-light-blue',
                linkClass: 'link-medium-blue'
            }
        }
        return {
            titleClass: 'title-24-light-blue',
            tileClass: 'title-20-blue',
            linkClass: 'link-medium-light-blue'
        }
    };

    renderTile = (type) => {
      const title = titles[type];
      const viewProps = this.getViewProps();
      return (
          <Col md={3} xs={12} onClick={() => this.setState({ activeTile: type })}>
            <div className={`tile ${viewProps.tileClass}`}>
                { title }
                { this.isMobile()
                    && <span id="arrow-icon">
                        <Icon name="arrow-right" width="25px" height="25px" />
                       </span> }
            </div>
          </Col>
      )
    };

    renderTileDetails = (type) => {
        return <Tile type={type} title={titles[type]} />
    };

    onBackClick = () => {
      if (this.state.backTo) {
         this.props.history.goBack();
         return;
      }
      this.setState({ activeTile: null });
    };

    render() {
        const viewProps = this.getViewProps();
        const { activeTile, backTo } = this.state;

        return (
            <ContentLayout>
                <div className='btw-resource-center container'>
                    <div className={viewProps.titleClass}>
                        { activeTile
                            ? <span onClick={this.onBackClick} className={viewProps.linkClass}>
                                { backTo
                                    ? 'Back to Action'
                                    : 'Back to Resource Center' }
                             </span>
                            : <span>Resource Center</span> }
                    </div>
                    { activeTile ?
                        <div>
                            { this.renderTileDetails(activeTile) }
                        </div>
                        : <div>
                            <Row>
                                { this.renderTile(tileTypes.tipsForFriends) }
                                { this.renderTile(tileTypes.talkingPoints) }
                                { this.renderTile(tileTypes.registrationInfo) }
                                { this.renderTile(tileTypes.earlyVotingInfo) }
                            </Row>
                            <Row>
                                { this.renderTile(tileTypes.idLaws) }
                                { this.renderTile(tileTypes.ballotGuides) }
                                { this.renderTile(tileTypes.votingFaqs) }
                            </Row>
                          </div> }
                     <div id="email-div">
                         <span className="text-18-dark-blue-bold">
                             Have a question? <a href="mailto:hi@bethewave.vote" className="link-medium-dark-blue"> Email us</a>
                         </span>
                     </div>
                </div>
            </ContentLayout>
        );
    }
}

export default withRouter(ResourceCenter);