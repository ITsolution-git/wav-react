import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Login';
import History from '../utility/History';
import GeneralErrorPage from './errorPages/GeneralErrorPage';
import SendInvite from './invites/SendInvite';
import Register from './captainProfile/Register';
import MakeList from './voter/MakeList';
import TasksList from './tasksList/TasksList';
import VotersList from './voterList/VotersList';
import Community from './community/Community';
import CaptainsDashboard from './captainsDashboard/CaptainsDashboard';
import AdminDashBoard from './adminDashboard/AdminDashboard';
import VoterDetail from './voter/VoterDetail';
import MatchList from './voter/MatchList';
import VoterSuccess from './voter/VoterSuccess';
import VoterError from './voter/VoterError';
import Forum from './community/Forum';
import Reports from './reports/Reports';
import AddVoterTask from './tasks/AddVoterTask';
import LiteratureTextTask from './tasks/LiteratureTextTask';
import LiteratureVideoTask from './tasks/LiteratureVideoTask';
import RecruitingCaptainTask from './tasks/RecruitingCaptainTask';
import RegisterVoterTask from './tasks/RegisterVoterTask';
import UpdateProfileTask from './tasks/UpdateProfileTask';

// static pages
import WhyBethewave from './static/WhyBethewave';
import HowContribute from './static/HowContribute';

import Authorization from './hocs/Authorization';
import routes from '../constants/Routes';
import roles from '../constants/Roles';

const { captain, admin, guest } = roles;

const Router =() => (
	<router history={ History }>
		<Switch>
			<Route exact path = {routes.login}
				   component = { Authorization(Login, [guest]) } />
			<Route exact path = {routes.register}
				   component = { Authorization(Register, [guest, captain, admin]) } />
			<Route exact path = {routes.pageDown}
				   component = { GeneralErrorPage } />
			<Route exact path = {routes.invites}
				   component = { Authorization(SendInvite, [captain]) } />
			<Route exact path = {routes.tasksList}
				   component = { Authorization(TasksList, [captain]) } />
			<Route exact path = {routes.voterList}
				   component = { Authorization(VotersList, [captain]) } />
			<Route exact path = {routes.community}
				   component = { Authorization(Community, [captain]) } />
            <Route exact path = {routes.forum}
                   component = { Authorization(Forum, [captain]) } />
			<Route exact path = {routes.captainsDashboard}
				   component = { Authorization(CaptainsDashboard, [captain]) } />
			<Route exact path = {routes.adminDashboard}
				   component = { Authorization(AdminDashBoard, [admin]) } />
            <Route exact path = {routes.reports}
                   component = { Authorization(Reports, [admin]) } />

			// voter onboarding
            <Route exact path = {routes.makelist}
                   component = { Authorization(MakeList, [captain]) } />
			<Route exact path = {routes.voterDetail}
				   component = { Authorization(VoterDetail, [captain]) } />
            <Route exact path = {routes.matchList}
                   component = { Authorization(MatchList, [captain]) } />
            <Route exact path = {routes.voterSuccess}
                   component = { Authorization(VoterSuccess, [captain]) } />
            <Route exact path = {routes.voterError}
                   component = { Authorization(VoterError, [captain]) } />

			// tasks
            <Route exact path = {routes.addVoterTask}
                   component = { Authorization(AddVoterTask, [captain]) } />
            <Route exact path = {routes.addVoterTask}
                   component = { Authorization(AddVoterTask, [captain]) } />
            <Route exact path = {routes.literatureTextTask}
                   component = { Authorization(LiteratureTextTask, [captain]) } />
            <Route exact path = {routes.literatureVideoTask}
                   component = { Authorization(LiteratureVideoTask, [captain]) } />
            <Route exact path = {routes.recruitingCaptainTask}
                   component = { Authorization(RecruitingCaptainTask, [captain]) } />
            <Route exact path = {routes.registerVoterTask}
                   component = { Authorization(RegisterVoterTask, [captain]) } />
            <Route exact path = {routes.updateProfileTask}
                   component = { Authorization(UpdateProfileTask, [captain]) } />

			// static route pages
            <Route exact path = {routes.whyBetheWave} component = { WhyBethewave } />
            <Route exact path = {routes.howContribute} component = { HowContribute } />
		</Switch>
	</router>
);

export default Router;