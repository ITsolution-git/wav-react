import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LoginBySocial from './auth/LoginBySocial';
import LoginByMail from './auth/LoginByMail';
import GeneralErrorPage from './errorPages/GeneralErrorPage';
import RegisterByMail from './auth/RegisterByMail';
import RegisterBySocial from './auth/RegisterBySocial';
import ChangePassword from './auth/changePassword/changePassword';
import ForgotPassword from './auth/changePassword/forgotPassword';
import VerifyEmail from './verifyEmail/VerifyEmail';

import TasksManagement from './tasksList';
import VotersManagement from './voterList';

import WelcomePage from './onBoarding/WelcomePage';
import SocialConnect from './onBoarding/socialNetworks/SocialConnect';
import SelectDistrict from './onBoarding/selectDistrict/SelectDistrict';
import SelectVoters from './onBoarding/selectVoters/SelectVoters';

import CaptainsDashboard from './captainsDashboard';
import HelpCenter from './helpCenter/HelpCenter';


import Authorization from './hocs/Authorization';
import routes from '../constants/Routes';
import roles from '../constants/Roles';

const { captain, admin, guest } = roles;

const router = () => (
    <Switch>
        {/* auth */}
        <Route exact path={routes.loginBySocial} component={Authorization(LoginBySocial, [guest])} />
        <Route exact path={routes.loginByMail} component={Authorization(LoginByMail, [guest])} />
        <Route exact path={routes.registerByMail} component={Authorization(RegisterByMail, [guest, captain, admin])} />
        <Route exact path={routes.registerBySocial} component={Authorization(RegisterBySocial, [guest, captain, admin])} />
        <Route exact path={routes.pageDown} component={GeneralErrorPage} />
        <Route exact path={routes.changePassword} component={ChangePassword} />
        <Route exact path={routes.forgotPassword} component={ForgotPassword} />
        <Route exact path={routes.verifyEmail} component={Authorization(VerifyEmail, [captain])} />

        {/* on boarding */}
        <Route exact path={routes.selectVoters} component={Authorization(SelectVoters, [captain])} />
        <Route exact path={routes.welcome} component={Authorization(WelcomePage, [captain])} />
        <Route exact path={routes.selectDistrict} component={Authorization(SelectDistrict, [captain])} />
        <Route exact path={routes.socialConnect} component={Authorization(SocialConnect, [captain])} />

        <Route exact path={routes.tasksList} component={Authorization(TasksManagement, [captain])} />
        <Route exact path={routes.voterList} component={Authorization(VotersManagement, [captain])} />
        <Route exact path={routes.helpCenter} component={Authorization(HelpCenter, [captain])} />
        <Route exact path={routes.captainsDashboard} component={Authorization(CaptainsDashboard, [captain])} />
    </Switch>
);

export default router;