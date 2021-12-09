import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from '../../database/firebaseDb';
import Colors from '../../constants/Colors';
import Card from '../../components/Card';


export default class Login extends Component {
  
  constructor() {
    super();
    this.state = { 
      email: '', 
      password: '',
      isLoading: false,
      errorMessage: '',
      error: true,
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  userLogin = () => {
    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signin!')
    } else {
      this.setState({
        isLoading: true,
      })
      firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        console.log(res)
        console.log('User logged-in successfully!')
        this.setState({
          isLoading: false,
          email: '', 
          password: ''
        })
        this.props.navigation.navigate('Home')
      })
      .catch(  error => Alert.alert("Looks like you've entered invalid login details!"),
      this.setState({
      errorMessage: 'looks like something went wrong',
      isLoading: false,
      error: true,
      }))
    }
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
    return (
   <View style={styles.background}>
  
      <View style={styles.container}>  
      <Card style={styles.card}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, 'password')}
          maxLength={15}
          secureTextEntry={true}
        />   
        <Button
          color="#000"
          title="Signin"
          onPress={() => this.userLogin()}
        />   

        <Text 
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('SignUp')}>
          Don't have account? Click here to signup
        </Text>    

        <Text style={styles.loginText}
         onPress={() => this.props.navigation.navigate('Password')}>
           Have you forgotten your password?</Text>   
           </Card>                   
      </View>

      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  background: {
 flex: 1,
 backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
 
  
  },
  card: {
    padding: 15,
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderBottomWidth:1,
   
  },
  loginText: {
    color: '#000',
    marginTop: 25,
    textAlign: 'center'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000'
  },

});