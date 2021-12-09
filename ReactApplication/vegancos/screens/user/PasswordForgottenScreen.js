import React, { useState, useEffect , } from "react";
import {AsyncStorage, Button, TextInput, View, Text, FlatList, StyleSheet, Alert, ActivityIndicator} from 'react-native';
import Card from '../../components/Card';
import { LinearGradient } from 'expo-linear-gradient';
import  * as firebase from 'firebase';
import Colors from '../../constants/Colors';



const PasswordForgottenScreen = props => {

  const [email, setEmail] = useState(''),
  sendMail = () => {
    firebase.auth().sendPasswordResetEmail(email)
      .then(function (user) {
        alert('Please check your email...')
      }).catch(function (e) {
        console.log(e)
      })
  }
  const emailInputHandler=(enteredText)=>{
    setEmail(enteredText);
  }
    return (
            <View style={styles.MainContainer}>
              <Card style={styles.card}>
                
              <TextInput placeholder="Fish's weight" 
                  onChangeText={emailInputHandler}
                  value={email}/>  
                  
               </Card>
  <Card>     
 <Text> <Button title="Send me an E-mail for Password recovery" onPress={sendMail} /></Text>
      </Card>
      </View>

    );
};

PasswordForgottenScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Reset your password',
   
  };
};

const styles=StyleSheet.create({
  inputcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
    justifyContent:'center',
    padding: 5,
},
  buttoncontainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
  },
  inputStyle:{
    width:200,
    height:50,
    padding:10,
    borderWidth:2,
    borderColor:'black',
  },
  gradient: {
    flex: 1,  
  },
  MainContainer: {
    justifyContent: 'flex-start',
    flex: 1,
    margin: 10,
    backgroundColor: Colors.background,
  },
  card: {
    padding: 20,
    margin: 10,
 }

});

export default PasswordForgottenScreen;