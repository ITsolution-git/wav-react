import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import _ from 'lodash';

import BaseComponent from './BaseComponent';
import Checkbox from './Checkbox';
import SocialList from './SocialList';
import StatusIcon from './StatusIcon';

class VotersTable extends BaseComponent {

    clearHandler = (id) => {
        let { selectedData, onSelect } = this.props;

        _.remove(selectedData, { id: id });
        onSelect(selectedData);
    }

    addHandler = (item) => {
        let { selectedData, onSelect, maxSelectedVoters } = this.props;
        if (selectedData.length >= maxSelectedVoters) {
            return null;
        }
        selectedData = [
            ...selectedData,
            item
        ]
        onSelect(selectedData);
    }

    checkboxHandler = (value, item) => {
        value ?
            this.addHandler(item) :
            this.clearHandler(item.id);
    }

    isSelected = (id) => {
        const { selectedData } = this.props;
        const targetIndex = selectedData.findIndex(item => (
            item.id === id
        ));

        return targetIndex >= 0;
    }

    renderDesktopHeader = () => {
        return (
            <tr>
                <th className='check'></th>
                <th className='name'>Name</th>
                <th>Connected On</th>
                <th>Status</th>
            </tr>
        );
    }

    renderMobileHeader = () => {
        return (
            <tr>
                <th className='check'></th>
                <th></th>
            </tr>
        );
    }

    renderVoterInfo = (item) => {
        return (
            <React.Fragment>
                <div className='name'>
                    {item.name}
                </div>
                <div className='description'>
                    {`${item.sex} | ${item.street}`}
                </div>
            </React.Fragment>
        );
    }

    renderDesktopBody = () => {
        const { data } = this.props;

        return data.map((item, i) => {
            return (
                <tr key={i}>
                    <td>
                        <div className='check'>
                            <Checkbox onChange={(value) => this.checkboxHandler(value, item)} checked={this.isSelected(item.id)} />
                        </div>
                    </td>
                    <td>{this.renderVoterInfo(item)}</td>
                    <td>
                        <SocialList social={item.social} />
                    </td>
                    <td>
                        <StatusIcon type={item.status} />
                    </td>
                </tr>
            );
        })
    }

    renderMobileBody = () => {
        const { data } = this.props;

        return data.map((item, i) => {
            return (
                <tr key={i}>
                    <td>
                        <div className='check'>
                            <Checkbox onChange={(value) => this.checkboxHandler(value, item)} checked={this.isSelected(item.id)} />
                        </div>
                    </td>
                    <td>
                        {this.renderVoterInfo(item)}
                        <div className='status'>
                            <div>
                                <StatusIcon type={item.status} />
                            </div>
                            <div>
                                <SocialList social={item.social} />
                            </div>
                        </div>
                    </td>
                </tr>
            );
        })
    }

    render() {

        return (
            <div className='btw-voters-table'>
                <Table responsive>
                    <thead>
                        {this.isDesktop() && this.renderDesktopHeader()}
                        {this.isMobile() && this.renderMobileHeader()}
                    </thead>
                    <tbody>
                        {this.isDesktop() && this.renderDesktopBody()}
                        {this.isMobile() && this.renderMobileBody()}
                    </tbody>
                </Table >
            </div >
        );
    }
}

VotersTable.propTypes = {
    data: PropTypes.array,
    selectedData: PropTypes.array,
    maxSelectedVoters: PropTypes.number,
    onSelect: PropTypes.func
};

VotersTable.defaultProps = {
    maxSelectedVoters: 10
}

export default VotersTable;
