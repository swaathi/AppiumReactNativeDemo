import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import Login from './App/Components/Login';

export default class DemoTestApp extends Component {
  render() {
    return (
      <Login />
    );
  }
}

AppRegistry.registerComponent('DemoTestApp', () => DemoTestApp);
