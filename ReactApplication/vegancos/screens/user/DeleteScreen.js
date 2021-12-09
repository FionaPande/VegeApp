import React, { useState, useEffect , } from "react";
import {AsyncStorage, Button, TextInput, View, Text, FlatList, StyleSheet, Alert, ActivityIndicator} from 'react-native';
import Card from '../../components/Card';
import  * as firebase from 'firebase';
import Colors from '../../constants/Colors';




const DeleteScreen = props => {



 
  const deleteAccount = async () => {

    var user = firebase.auth().currentUser;

    user.delete().then(function() {
      console.log("has been deleted")
      Alert.alert("Account has been deleted")
      props.navigation.navigate('Auth')
    }).catch(function(error) {
      Alert.alert("Error")
    });
 
  };
    return (
     
            <View style={styles.MainContainer}>
              <Card style={styles.card}><Text>
                
         
                  
                </Text></Card>
  <Card>
  
         
 <Text> <Button title="Delete my Profile" onPress={deleteAccount} /></Text>
      </Card>
      </View>
  
  
    );
};

DeleteScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Delete Your Account',
   
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

export default DeleteScreen;