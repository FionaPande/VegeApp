import React, { useState, useEffect } from "react";
import {Button, TextInput, View, Text, FlatList, StyleSheet, Alert, ActivityIndicator} from 'react-native';
import Card from '../../components/Card';
import Colors from '../../constants/Colors';
import firebase from 'firebase';

import axios from 'axios';

const AddSuggestion = props => {
 const [title, setTitle] = useState("");
 const [description, setDescription] = useState("");
 const [brand, setBrand] = useState("");
const [userID, setUserID] = useState(false)
var user = firebase.auth().currentUser;
var name, email, uid;

  const titleInputHandler=(enteredText)=>{
    setTitle(enteredText);
  }
  const descriptionInputHandler=(enteredText)=>{
    setDescription(enteredText);
  }

  const brandInputHandler=(enteredText)=>{
    setBrand(enteredText)
  }
  const addSuggestionHandler=()=>{

    saveSuggestion();
    Alert.alert("Thanks!")

  }
useEffect(()=>{
  if (user != null) {
    uid = user.uid;   
    setUserID(true)
  }
})


  async function saveSuggestion() {
    axios
      .post("http://127.0.0.1:8000/vegan/addsuggs",
       {title: title,
         description: description,
          brand: brand, 
        authorID: uid,
          id: "null"} )
      .then(function (response) {
        console.log(response);
    
      })
      .catch(function (error) {
        console.log(error);
      });
  }  
    return (
      <View style={styles.background}>
            <View style={styles.MainContainer}>
              <Card style={styles.card}><Text>Do you know a vegan product that is not yet part of
                our collection? We are always happily accepting new suggestions, and if 
                we think they match our conditions, we will add them. 
         
                  
                </Text></Card>
             
  <Card style={styles.card}>
  
        
      <View style={styles.inputcontainer}>
        <TextInput placeholder="Title" 
                  style={styles.inputStyle} 
                  onChangeText={titleInputHandler}
                  value={setTitle}/>  
                  </View>
                  <View style={styles.inputcontainer}>
             <TextInput placeholder="Brand" 
                  style={styles.inputStyle} 
                  onChangeText={brandInputHandler}
                  value={setBrand}/>  
                  </View>
                  <View style={styles.inputcontainer}>
        <TextInput placeholder="Description" 
                  style={styles.inputStyle} 
                  onChangeText={descriptionInputHandler}
                  value={setDescription}
                  multiline={true}/> 
                  
              </View>
              <View style={styles.inputcontainer}>
                {userID? (
                      <Button title="Add" onPress={addSuggestionHandler}/> 
                ): (
                  <Button
                  onPress={() => props.navigation.navigate({
                    routeName: 'SignUp',
                  })}
                    title="You need to be logged in to send us suggestions"
                     color="#841584"
 />

                )}
                      </View>
      </Card>
             
             
            
      </View>
  
      </View>
    );
};

const styles=StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.background,
  },
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
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderBottomWidth:1,
  },
  gradient: {
    flex: 1,  
  },
  MainContainer: {
    justifyContent: 'flex-start',
    flex: 1,
    margin: 10,
  },
  card: {
    padding: 10,
    margin: 10,
 }

});

export default AddSuggestion;