import React, { useState, useEffect } from 'react';

import { Image,  FlatList, Text, StyleSheet, View,Alert } from 'react-native';
import firebase from '../database/firebaseDb';
import Card from '../components/Card';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import Colors from '../constants/Colors';
import axios from 'axios';





const ProductDetailScreen = props => {
  const sortedData = global.myData.filter(
    products => products.pk === global.itemId);
    const entityRef =   firebase.firestore().collection('Favorites')
const [itemIsFavorite, setItemIsFavorite] = useState(true);
const [isLoading, setLoading] = useState(true);
const [userID, setUserID] = useState(false);
const [favorites, setFavorites] = useState("");
var user = firebase.auth().currentUser;
var name, email, uid;

async function fetchData() {
  if (user != null) {
    name = user.displayName;
    uid = user.uid;  
    setUserID(true);
  }
}

async function fetchFavs() {
  let res = null;
  try {
    res = await fetch("http://127.0.0.1:8000/vegan/favorites/");
  }
  catch (error) {
    setErrors(true);
  }
  try {
    const data = await res.json();
    const filterArray = data.filter(data => data.fields.authorID === uid)

    setFavorites(filterArray);
    
     
 
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
    fetchFavs();
  
  }
  setLoading(false)
});

async function filter(){
  
  const filterArray = favorites.filter(data =>
     data.fields.title === global.itemTitle &&
     data.fields.authorID === uid
     )
  if (!filterArray.length){
    console.log("Array is empty")   
     setItemIsFavorite(false)
    } else {
      console.log("filter has elements")
     setItemIsFavorite(true)
    }
 
}


const saveFavoriteHandler=()=>{

  saveFavorite();
  Alert.alert("Item has been added to your favorites!!")

}
async function saveFavorite() {
    axios
    .post("http://127.0.0.1:8000/vegan/addfavs",
     {
      id: "null",
      title: global.itemTitle,
      brand: global.itemBrand, 
      authorID: uid,
      photo: global.itemPhoto

        } )
    .then(function (response) {
      console.log(response);
      console.log(uid)
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  return (
<View style={styles.background}>
    <View style={styles.MainContainer}>

<Card>
      <FlatList
        data={sortedData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) =>
          <View style={styles.image}>
            <View style={styles.titleBottom}>
            <Text style={styles.title}>{item.fields.title}</Text>
            </View>
            <Text style={styles.row}>{item.fields.description}</Text>
            
         
            <View style={styles.image}>
              <Image
                style={styles.tinyLogo}
                source={{
                  uri: item.fields.photo,
                }}
              />
            </View>
         <View style={styles.where}>
           <View style={styles.titleBottom}>
            <Text style={styles.text}> Where can I find this product? </Text>
            </View>
            <Text style={styles.stores}>{item.fields.stores}</Text>
            </View>
            <View>
            <Text style={styles.stores}>{item.fields.reference}</Text>
            </View>
            <View style={styles.favorite}>
          
        {itemIsFavorite === true?  (
          <View style={styles.favBack}>
      <Text style={styles.text}> This item is already a favorite of yours!</Text>
      </View>
        ): (
          <View style={styles.favBack}>
          <TouchableOpacity onPress ={saveFavoriteHandler}>
          
            <Text style={styles.text}>Add this to my favorites <Icon name='like'	type='evilicon'	size='30' color= 'black'	/> </Text>
         
          </TouchableOpacity>
          </View>
        )}
       </View>
          </View>
        }
        style={{ marginTop: 10 }} />
</Card>
</View>
</View>
  );
}

ProductDetailScreen.navigationOptions = navigationData => {

  global.itemTitle = navigationData.navigation.getParam('itemTitle');
  global.itemId = navigationData.navigation.getParam('itemId');
  global.itemDescription = navigationData.navigation.getParam("itemDescription");
  global.itemPhoto = navigationData.navigation.getParam("itemPhoto");
  global.itemStore = navigationData.navigation.getParam("itemStore");
  global.itemBrand = navigationData.navigation.getParam("itemBrand");
  global.itemCategory = navigationData.navigation.getParam("itemCategory");

  return {
    headerTitle: itemTitle,
  };
};


const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.background
  },
  MainContainer: {
    justifyContent: 'flex-start',
    flex: 1,
  margin: 15,
    backgroundColor: Colors.background,

  },
  tinyLogo: {
    width: 200,
    height: 200,
  },
  image: {
    alignSelf: 'center',
  },

  row: {
    fontSize: 13,
    padding: 12
  },
  title: {
    fontSize: 30,
    alignContent: 'center',
    alignSelf: 'center',
  },
  titleBottom: {
    borderBottomWidth: 1,
    paddingBottom: 10,
  },

  text: {
    fontSize: 20,
    color: Colors.primaryText,
   
  },
  favorite: {
    margin: 5,
    paddingTop: 40,
   
  },
  stores: {
    textAlign: 'center',
    paddingTop: 10,
  },
  favBack: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'lightpink',
    marginBottom: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '80%',
  
    
  },
  where: {
    alignContent: 'center',
    alignSelf: 'center',
    width: '100%',
    paddingTop: 50,
  }


});

export default ProductDetailScreen;

