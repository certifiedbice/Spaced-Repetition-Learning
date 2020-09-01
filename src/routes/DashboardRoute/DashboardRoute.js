import React, { Component } from 'react';
import LanguageService from '../../services/lang-service.js';

class DashboardRoute extends Component {
  render() {
    console.log(LanguageService.getAllData());
    return <section>implement and style me</section>;
  }
}

export default DashboardRoute;
