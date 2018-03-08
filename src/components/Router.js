import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Login';
import History from '../utility/History';
import Page_50_X from './errorPages/Page_50_X';
import SendInvite from './invites/SendInvite';
import Register from './captainProfile/Register';
import Makelist from './captainProfile/Makelist';



const Router =() => (
	<router history={ History }>
		<Switch>
			<Route exact path ='/' component = {Login}/>
			<Route exact path ='/captainProfile/Register' component = {Register}/>
			<Route exact path ='/captainProfile/Makelist' component = {Makelist}/>
			<Route exact path ='/errorPages/Page_50_X' component = {Page_50_X}/>
			<Route exact path ='/invites/SendInvite' component = {SendInvite}/>
		</Switch>
	</router>
)
export default Router;