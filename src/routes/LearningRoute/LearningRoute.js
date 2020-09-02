import React, { Component } from 'react';
import Learning from '../../components/Learning/Learning';
import LanguageService from '../../services/lang-service.js';
import UserContext from '../../contexts/UserContext';

class LearningRoute extends Component {
  static contextType = UserContext;
  async componentDidMount() {
    const dashboard = await LanguageService.getAllLanguageData();
    this.context.setDashboard(dashboard);
  }
  render() {
    return <Learning />;
  }
}

export default LearningRoute;
