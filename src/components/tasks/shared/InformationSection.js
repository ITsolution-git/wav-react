import React from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import BaseComponent from '../../shared/BaseComponent';
import Icon from '../../shared/Icon';
import StateInfo from './StateInfo';

class InformationSection extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        }
    }

    onArrowClick = () => {
        this.setState({ expanded: !this.state.expanded });
    };

    render () {
        const { expanded } = this.state;
        const { stateInfo } = this.props;
        return stateInfo ? (
            <Col
                md={4}
                xsHidden
                className="btw-task-info">
                <div className="title-20-blue">
                    Pssst. Need a cheat sheet on voting info? We got you covered
                </div>
                { expanded && <StateInfo taskData={this.props.taskData} /> }
                <div id="arrow-icon" onClick={this.onArrowClick}>
                    { expanded
                        ? <Icon name="arrow-up-dark" width="20px" height="12px" />
                        : <Icon name="arrow-down-dark" width="20px" height="12px" />
                    }
                </div>
            </Col>
        ) : null
    }
}

const mapStateToProps = (state) => {
    return {
        stateInfo: state.taskList.stateInfo
    }
};

export default connect(mapStateToProps)(InformationSection);