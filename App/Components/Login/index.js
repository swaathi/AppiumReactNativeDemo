'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
} from 'react-native';

import styles from './styles';

class Login extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      email: "",
      password: "",
      errorMessage: "",
      successMessage: "",
    };
  }

  renderStatusBlock() {
    if (this.state.errorMessage !== "") {
      return (
        <View style={styles.errorBlock}>
          <Text style={styles.errorText} 
            accessible={true} 
            accessibilityLabel={this.state.errorMessage}
          >{this.state.errorMessage}</Text>
        </View>
      )
    }
    if (this.state.successMessage !== "") {
      return (
        <View style={styles.successBlock}>
          <Text style={styles.successText}
            accessible={true} 
            accessibilityLabel={this.state.successMessage}
          >
            {this.state.successMessage}
          </Text>
        </View>
      )
    }
  }

  handleSubmit() {
    if (this.state.email === "") {
      this.updateErrorMessage("Please enter your email ID");
      return;
    }
    if (this.state.password === "") {
      this.updateErrorMessage("Please enter your password");
      return;
    }
    if (this.state.email != "dummyemail@example.com" && this.state.password != "dummyPassword") {
      this.updateErrorMessage("Please check your credentials");
      return;
    }
    this.updateSuccessMessage("Login Successful");
  }

  updateSuccessMessage(message) {
    this.setState({
      successMessage: message,
      errorMessage: "",
    });
  }

  updateErrorMessage(message) {
    this.setState({
      errorMessage: message,
      successMessage: "",
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Login</Text>
        {this.renderStatusBlock()}
        <View style={styles.formGroupBlock}>
          <Text style={styles.formLabel}>Email</Text>
          <TextInput 
            accessible={true} 
            accessibilityLabel={'Please enter your email'}
            style={styles.formInput} 
            value={this.state.email}
            autoCapitalize='none' 
            onChangeText={(email) => this.setState({email: email})} 
          />
        </View>
        <View style={styles.formGroupBlock}>
          <Text style={styles.formLabel}>Password</Text>
          <TextInput 
            accessible={true} 
            accessibilityLabel={'Please enter your password'}
            style={styles.formInput}
            value={this.state.password} 
            onChangeText={(password) => this.setState({password: password})}
            secureTextEntry
          />
        </View>
        <View style={styles.formGroupBlock}>
          <TouchableHighlight 
            style={styles.formSubmitButton} 
            onPress={this.handleSubmit.bind(this)}
            accessible={true} 
            accessibilityLabel={'Press me to submit'}>
            <Text style={styles.formSubmitText}>Submit</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default Login;