import React, { Component } from 'react';
import LanguageService from '../../services/lang-service.js';
import UserContext from '../../contexts/UserContext';
import Dashboard from '../../components/Dashboard/Dashboard';

class DashboardRoute extends Component {
  static contextType = UserContext;

  async componentDidMount() {
    const dashboard = await LanguageService.getAllLanguageData()
	// There is an issue with an unauthorized request
	// When first loaded today this.context.dashboard
	// was undefined due to an unauthorized request which
	// prevented retrieving the data.
	this.context.setDashboard(dashboard);
  }

  render() {
    return <Dashboard />;
  }
}

export default DashboardRoute;
