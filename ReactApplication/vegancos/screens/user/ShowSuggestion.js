
import React, {useState, useEffect} from 'react';
import { StyleSheet, View,  Text,  FlatList, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';
import firebase from 'firebase';

import Card from '../../components/Card';
import {CheckBox} from 'react-native-elements';
import Colors from '../../constants/Colors';
import { Icon } from 'react-native-elements';

const Suggestions = props => {
  
    const [hasError, setErrors] = useState(false);
    const [someError, setSomeErrors] = useState('');
      const[myFilter, setMyFilter] = useState([]);
      const [userID, setUserID] = useState(false);
      const [data, setData] = useState([]);
      const [isLoading, setLoading] = useState(true);
      const [checked, setChecked] = useState(true);
      const [unchecked, setUnchecked] = useState(false);
      var user = firebase.auth().currentUser;
      var name, uid;
  
    
      async function fetchData() {
        if (user != null) {
          name = user.displayName;
          uid = user.uid;  
          setUserID(true);
        }
      }
    
      async function fetchSuggestions() {
        let res = null;
        try {
          res = await fetch("http://127.0.0.1:8000/vegan/suggestions/");
        }
        catch (error) {
          setErrors(true);
        }
        try {
          const data = await res.json();
          const filterArray = data.filter(data => data.fields.authorID === uid)

          setData(filterArray);
          
           
       
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
          fetchSuggestions();
        
        }
        setLoading(false)
      });





  

function cell ({item}){

  const filterData=  global.myData.filter(data => data.sugg == item.id)
  return (
  <Card style={styles.card}>
  <View style={styles.myText}>  
    <Text style={styles.row}>Title : {item.fields.title}</Text>
    <View style={styles.column}>
    {!filterData.length ? (
   <CheckBox
   checked= {unchecked}
   textStyle= {styles.text}
 />
    ): (
      <CheckBox
      checked= {checked}
      checkedColor = 'purple'
      textStyle= {styles.text}
    />
    )}
</View>
  </View>
  </Card>
  )
 
}

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
else{
  return (
    <View style={styles.background}>
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.suggText}>Suggestions</Text>
        <Text> Here you can see your suggestions</Text>
        </Card>
        {userID ? (
      <FlatList
        data={data}
        keyExtractor={(item, data) => { return item.id}}            
        renderItem={cell  }
        style={{ marginTop: 10 }} />
        ): (
          <Card style={styles.card}>
        <Text>
          
            Looks like you dont have a user account yet.
        </Text> 
        <Button
     onPress={() => props.navigation.navigate({
       routeName: 'SignUp',
     })}
       title="Learn More"
        color="#841584"
  
/>
        </Card>
        )}
    </View>
    </View>
  
  );
};
}


const styles = StyleSheet.create({
  container: {
    padding: 30,
    paddingTop: 50,
      flex: 1,
      margin: 0,
    },
    background: {
      flex: 1,
      backgroundColor: Colors.background,
    },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: '100%',
    marginTop: 16,
  },
  gradient: {
		flex: 1, 
    },
    card: {
		  padding: 10,
      margin: 5,
    },
    column: {
     flexDirection: 'column',
      alignItems: 'flex-end'
    },
    myText: {
      justifyContent: 'space-around',
      flexDirection: 'column',
    },
    text: {
      fontSize: 10,
    },
    suggText: {
      padding: 5,   
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      fontSize: 20,
      color: 'black',
      fontWeight: 'bold',
    },
   
});

export default Suggestions;