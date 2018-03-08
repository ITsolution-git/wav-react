import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Login';
import History from '../utility/History';
import Page_50_X from './errorPages/Page_50_X';
import SendInvite from './invites/SendInvite';
import Register from './captainProfile/Register';
import Makelist from './captainProfile/Makelist';
import TasksList from './tasksList/TasksList';
import VotersList from './voterList/VotersList';
import Community from './community/Community';
import CaptainsDashboard from './captainsDashboard/CaptainsDashboard';
import AdminDashBoard from './adminDashboard/AdminDashboard';
import Authorization from './hocs/Authorization';
import routes from '../constants/Routes';
import roles from '../constants/Roles';

const { captain, admin, guest } = roles;

const Router =() => (
	<router history={ History }>
		<Switch>
			<Route exact path = {routes.login}
				   component = { Authorization(Login, [guest], routes.login) } />

			<Route exact path = {routes.register}
				   component = { Authorization(Register, [guest, captain, admin]) } />
			<Route exact path = {routes.makelist}
				   component = { Authorization(Makelist, [guest]) } />
			<Route exact path = {routes.pageDown}
				   component = { Page_50_X } />
			<Route exact path = {routes.invites}
				   component = { Authorization(SendInvite, [captain, admin]) } />
			<Route exact path = {routes.tasksList}
				   component = { Authorization(TasksList, [captain]) } />
			<Route exact path = {routes.voterList}
				   component = { Authorization(VotersList, [captain]) } />
			<Route exact path = {routes.community}
				   component = { Authorization(Community, [captain, admin]) } />
			<Route exact path = {routes.captainsDashboard}
				   component = { Authorization(CaptainsDashboard, [captain]) } />
			<Route exact path = {routes.adminDashboard}
				   component = { Authorization(AdminDashBoard, [admin]) } />
		</Switch>
	</router>
);

export default Router;