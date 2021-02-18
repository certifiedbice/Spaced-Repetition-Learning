import React, { Component } from 'react';
import Result from '../../components/Result/Result';
import LanguageService from '../../services/lang-service.js';
import UserContext from '../../contexts/UserContext';

class ResultRoute extends Component {
  static contextType = UserContext;

  async componentDidMount() {
    const head = await LanguageService.getLanguageHead();
    this.context.setHead(head);
    const dashboard = await LanguageService.getAllLanguageData();
    this.context.setDashboard(dashboard);
  }
  render() {
    return <Result />;
  }
}

export default ResultRoute;
