import React, { useState, useEffect } from 'react';

import { getTwitterRequestTokens } from '../../../actions/AuthActions';

export default function SendToTwitter() {
  const [token, setToken] = useState('');

  useEffect(() => {
    const getToken = async () => {
      const token = await getTwitterRequestTokens();
      setToken(token);
    };
    getToken();
  }, []);

  return token ? (
    <a href={`https://twitter.com/oauth/authorize?oauth_token=${token}`}>Get contacts from twitter</a>
  ) : (
    <p>Loading...</p>
  );
}
