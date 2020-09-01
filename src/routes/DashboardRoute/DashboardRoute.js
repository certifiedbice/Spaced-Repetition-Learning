import React, { Component } from 'react';
import LanguageService from '../../services/lang-service.js';
import UserContext from '../../contexts/UserContext'

class DashboardRoute extends Component {
	static contextType=UserContext;
	async componentDidMount(){
		const dashboard=await LanguageService.getAllLanguageData();
		this.context.setDashboard(dashboard);
	}
  render() {
	return <section>implement and style me</section>;
  }
}

export default DashboardRoute;