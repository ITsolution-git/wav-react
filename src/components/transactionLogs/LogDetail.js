import React from 'react';
import Grid from 'material-ui/Grid';

import BaseComponent from '../shared/BaseComponent';


class LogDetail extends BaseComponent {

    render() {
        const fields = ['Date and Time','Transaction Type','Result','Reason','Channel','First Name', 'Last Name'];
        const keys = ['timestamp','transaction_type','result','reason','chanel','firstname','lastname'];

        const query = this.props.location.query

        if (!query) return ''

        return (
            <div className="container btw-log-details">
                { this.renderBackToHome() }
                <h2>Transaction Details</h2>
                <br />

                <Grid container>

                    {
                        fields.map( (e, index) => {
                            return (
                                <Grid item xs={6} md={4} style={{marginBottom:'30px'}} key={index}>
                                    <b>{e}</b><br/>
                                    {
                                        keys[index] !== 'reason' ? 
                                            query[ keys[index] ] : 
                                            typeof query[ keys[index] ] === 'string' ? query[ keys[index] ] : query[ keys[index] ].statusCode
                                    }
                                    <br/>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </div>
        );
    }
}

export default LogDetail;