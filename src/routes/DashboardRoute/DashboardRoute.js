import React, { Component } from 'react';
// import {Redirect} from "react-router-dom";
import LanguageService from '../../services/lang-service.js';
import UserContext from '../../contexts/UserContext';
import Dashboard from '../../components/Dashboard/Dashboard';
import TokenService from '../../services/token-service.js';

class DashboardRoute extends Component {
  static contextType = UserContext;

  async componentDidMount() {
    const dashboard = await LanguageService.getAllLanguageData()
	console.log(dashboard)
	// if(dashboard===401){
		// this.context.setRedirect(true);
	// }
    // if(dashboard!==401)
	// if(dashboard!==undefined)
	this.context.setDashboard(dashboard);
  }

  render() {
	return(
			<Dashboard />
	)
  }
}

export default DashboardRoute;
