import React, { Component } from 'react';
import LanguageService from '../../services/lang-service.js';
import UserContext from '../../contexts/UserContext';
import Dashboard from '../../components/Dashboard/Dashboard';
import TokenService from '../../services/token-service.js';

class DashboardRoute extends Component {
  static contextType = UserContext;

  async componentDidMount() {
    const dashboard = await LanguageService.getAllLanguageData()
	this.context.setDashboard(dashboard);
  }

  render() {
	return(
			<Dashboard />
	)
  }
}

export default DashboardRoute;
