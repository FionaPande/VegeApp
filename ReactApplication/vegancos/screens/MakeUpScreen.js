import React, { useState, useEffect } from 'react';
import {View, Text, FlatList, StyleSheet, ActivityIndicator} from 'react-native';
import * as firebase from 'firebase';

import CategoryCards from '../components/CategoryCards';
import { LinearGradient } from 'expo-linear-gradient';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import Card from '../components/Card';
import Colors from '../constants/Colors'

const MakeUpScreen = props => {
  const [hasError, setErrors] = useState(false);
  const [someError, setSomeErrors] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [test, setTest] = useState(true);
  const[cate, setCate] = useState([]);
  var user = firebase.auth().currentUser;
  var name, email, uid;
  
  if (user != null) {
    name = user.displayName;
    email = user.email;
    uid = user.uid;       
     global.uid =JSON.stringify(uid)
    console.log(global.uid)
  }



  async function fetchCategories() {
    let res = null;
    try {
      res = await fetch("http://127.0.0.1:8000/vegan/categories/");
    }
    catch (error) {
      setErrors(true);
    }
    try {
      const data = await res.json();
      setCate(data);
      const filtered = data.filter(d=>d.pk >10)
        setCate(filtered)
        global.categories = cate
       
   
    }
    catch (err) {
      setErrors(true);
      setSomeErrors("ERROR: " + hasError + " my error " + err);
    }
  }
 
  async function fetchData() {
    let res = null;
    try {
      res = await fetch("http://127.0.0.1:8000/vegan/products/");
    }
    catch (error) {
      setErrors(true);
    }
    try {
      const responseData = await res.json();
      setData(responseData);
      global.myData = responseData;

      // sets the data received from restful service as a global object that can be used anywhere
    }
    catch (err) {
      setErrors(true);
      setSomeErrors("ERROR: " + hasError + " my error " + err);
    }
  }
  useEffect(() => {
    if (isLoading == true) {
      setLoading(false);
      fetchData();
      fetchCategories();
    }
  });
  if (isLoading == true) {
    // if the data does not get loaded yet, we show an Activity Indicator
    return (
      <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }
  else if (hasError) {
    return (
      <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
        <Text>You're probably not connected to the internet</Text>
        <Text>{"" + someError}</Text>
      </View>
    );
  }
  else {
    const renderGridItem = itemData => {
      return (
        
        <CategoryCards style={styles.authContainer}
          title={itemData.item.fields.catID}
          onSelect={() => {
            props.navigation.navigate({
              routeName: 'CategoryProduct',
              params: {
                categoryId: itemData.item.pk,
                categoryTitle: itemData.item.fields.catID
             
                // we forward the ID and title to the next screen
              }
            });
          }}
        />
      );
    };
    

    return (
   
      <View style={styles.screen}>
        <View style={styles.welcome}>
        
        <Text style={styles.suggText}> Hello {name}</Text>
     
        
       </View>
       
    
          <FlatList
            keyExtractor={(item, index) => item.pk}
            data={cate}
            renderItem={renderGridItem}
            numColumns={1}
          />
     
      </View>
  

    );
  };
}
MakeUpScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Make Up',
   
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: Colors.background
  },
  card: {
    padding: 5,
    width: '90%',
    marginBottom: 20,
    opacity: 0.8,
    backgroundColor: Colors.background,
    alignItems: 'center',
    alignContent: 'center'
  },
  authContainer: {
    width: '90%',
    maxWidth: 600,
    maxHeight: 50,
    padding: 7,
    alignContent: 'center',
    alignSelf: 'center',
    textAlign: "center",
  },
  suggText: {
    padding: 5,   
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    fontSize: 20,
   color: Colors.primaryText,
    
  },
  welcome: {
    alignItems: 'center',
  },
  text: {
    padding: 5,   
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    fontSize: 12,
    color: Colors.primaryText,
  }
});

export default MakeUpScreen;