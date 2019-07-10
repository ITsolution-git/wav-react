import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string'

import history from '../../../utility/History';
import { getTwitterFriends } from '../../../actions/AuthActions';

function ReceiveFromTwitter({ location }) {
    const { oauth_token, oauth_verifier } = queryString.parse(location.search)

    useEffect(() => {
        const getFriends = async () => {
            console.log(await getTwitterFriends(oauth_token, oauth_verifier));
            history.push('/social_connect');
        }
        getFriends();
    }, [oauth_token, oauth_verifier]);

  return <div>oauth_verifier</div>;
}

export default withRouter(ReceiveFromTwitter);
