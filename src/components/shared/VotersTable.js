import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import classNames from 'classnames';
import _ from 'lodash';

import { BaseComponent, Checkbox, SocialList, StatusIcon } from '../shared';

class VotersTable extends BaseComponent {

    isSelect = () => {
        return this.props.type === 'select';
    }

    clearHandler = (id) => {
        let { selectedData, onSelect } = this.props;

        _.remove(selectedData, { id: id });
        onSelect(selectedData);
    }

    addHandler = (item) => {
        let { selectedData, onSelect, maxSelectedVoters } = this.props;
        if ((selectedData.length >= maxSelectedVoters) && this.isSelect()) {
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

    renderVoterInfo = (item) => {
        return (
            <>
                <div className='name'>
                    {item.name}
                </div>
                <div className='description'>
                    {`${item.sex} | ${item.street}`}
                </div>
            </>
        );
    }

    renderDesktopBody = () => {
        const { data } = this.props;

        return data.map((item, i) => {
            return (
                <tr key={i} className={classNames('desktop-body', { 'selected-row': this.isSelected(item.id) })}>
                    <td>
                        <div className='check'>
                            <Checkbox onChange={(value) => this.checkboxHandler(value, item)} checked={this.isSelected(item.id)} />
                        </div>
                    </td>
                    <td>{this.renderVoterInfo(item)}</td>
                    <td>
                        <SocialList social={item.social} showVoterFile />
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
                <tr key={i} className={classNames('mobile-body', { 'selected-row': this.isSelected(item.id) })}>
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
                                <SocialList social={item.social} showVoterFile />
                            </div>
                        </div>
                    </td>
                </tr>
            );
        })
    }

    render() {
        const { className } = this.props;

        return (
            <div className={classNames('btw-voters-table', className)}>
                <Table responsive>
                    <thead className='desktop-header'>
                        {this.renderDesktopHeader()}
                    </thead>
                    <tbody>
                        {this.renderDesktopBody()}
                        {this.renderMobileBody()}
                    </tbody>
                </Table >
            </div >
        );
    }
}

VotersTable.propTypes = {
    type: PropTypes.oneOf(['select', 'add']),
    data: PropTypes.array,
    selectedData: PropTypes.array,
    maxSelectedVoters: PropTypes.number,
    onSelect: PropTypes.func
};

VotersTable.defaultProps = {
    maxSelectedVoters: 10,
    type: 'select'
}

export default VotersTable;
