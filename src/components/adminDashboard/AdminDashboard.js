import React, { Component } from 'react';
import NavImage from '../layout/NavImage';

class AdminDashboard extends Component {
    render() {
        return (
            <div>
                <NavImage />
                <div className='container'>
                    Admin dashboard
                </div>
            </div>
        );
    }
}

export default AdminDashboard;