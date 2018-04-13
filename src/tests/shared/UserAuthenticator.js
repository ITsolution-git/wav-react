import localStorage from 'localStorage';

export default class UserAuthenticator {
    static loginCaptain() {
        const user = {
            "issuer": "https://staging-btw-ui-18.herokuapp.com",
            "issuedAt": 1522449538583,
            "expiresAt": 2522535938583,
            "role": "captain",
            "username": "testUser",
            "email": "test@test.com",
            "userid": "5a6991bbd399dc000452cf9e"
        };
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3N1ZXIiOiJodHRwczovL3N0YWdpbmctYnR3LXVpLTE4Lmhlcm9rdWFwcC5jb20iLCJpc3N1ZWRBdCI6MTUyMjQ0OTUzODU4MywiZXhwaXJlc0F0IjoyNTIyNTM1OTM4NTgzLCJyb2xlIjoiY2FwdGFpbiIsInVzZXJuYW1lIjoidGVzdFVzZXIiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJ1c2VyaWQiOiI1YTY5OTFiYmQzOTlkYzAwMDQ1MmNmOWUifQ._NiWVEh8aYOwPkjPqtzZpdHL9aAD1gQj9JVIJqRrd6k');
    }
}