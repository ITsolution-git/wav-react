import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

import BaseComponent from './BaseComponent';
import Checkbox from './Checkbox';

class VotersTable extends BaseComponent {

    clearHandler = (id) => {
        let { selectData, onSelect } = this.props;

        const targetIndex = selectData.findIndex(item => (
            item.id === id
        ));

        selectData = [
            ...selectData.slice(0, targetIndex),
            ...selectData.slice(targetIndex + 1)
        ];
        onSelect(selectData);
    }

    addHandler = (item) => {
        let { selectData, onSelect } = this.props;
        if (selectData.length >= 10) {
            return null;
        }
        selectData = [
            ...selectData,
            item
        ]
        onSelect(selectData);
    }

    checkHandler = (event, item) => {
        const { checked } = event.target;
        checked ?
            this.addHandler(item) :
            this.clearHandler(item.id);
    }

    isSelected = (id) => {
        const { selectData } = this.props;
        const targetIndex = selectData.findIndex(item => (
            item.id === id
        ));
        return targetIndex >= 0;
    }

    desktopHeaderRender = () => {
        return (
            <tr>
                <th className='check'></th>
                <th className='name'>Name</th>
                <th>Connected On</th>
                <th>Status</th>
            </tr>
        );
    }

    mobileHeaderRender = () => {
        return (
            <tr>
                <th className='check'></th>
                <th></th>
            </tr>
        );
    }

    voterInfoRender = (item) => {
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

    desktopBodyRender = () => {
        const { data } = this.props;
        return data.map((item, i) => {
            return (
                <tr key={i}>
                    <td>
                        <div className='check'>
                            <Checkbox onChange={(event) => this.checkHandler(event, item)} checked={this.isSelected(item.id)} />
                        </div>
                    </td>
                    <td>{this.voterInfoRender(item)}</td>
                    <td>Table cell</td>
                    <td>{item.status}</td>
                </tr>
            );
        })
    }

    mobileBodyRender = () => {
        const { data } = this.props;
        return data.map((item, i) => {
            return (
                <tr key={i}>
                    <td>
                        <div className='check'>
                            <Checkbox onChange={(event) => this.checkHandler(event, item)} checked={this.isSelected(item.id)} />
                        </div>
                    </td>
                    <td>
                        {this.voterInfoRender(item)}
                        <div className='status'>
                            <div>
                                {item.status}
                            </div>
                            <div>
                                connect
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
                        {this.isDesktop() && this.desktopHeaderRender()}
                        {this.isMobile() && this.mobileHeaderRender()}
                    </thead>
                    <tbody>
                        {this.isDesktop() && this.desktopBodyRender()}
                        {this.isMobile() && this.mobileBodyRender()}
                    </tbody>
                </Table >
            </div >
        );
    }
}

VotersTable.propTypes = {
    data: PropTypes.array,
    selectData: PropTypes.array,
    onSelect: PropTypes.func
};

export default VotersTable;
