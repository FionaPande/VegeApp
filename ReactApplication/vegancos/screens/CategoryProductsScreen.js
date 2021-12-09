
import React, { Component, useState } from 'react';
import { ActivityIndicator, Image,Alert, FlatList, Text, StyleSheet, View, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import Card from '../components/Card';
import Colors from '../constants/Colors';
 
export default class CategoryProductsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      text: '',
      data: []
    }
    this.arrayholder = [];
  }
  
  componentDidMount() {
    
      const sortedData = global.myData.filter(
        products => products.fields.position === catId);
        console.log(sortedData)
        this.setState({
          isLoading: false,
          data: sortedData,  
        }, () => {
          this.arrayholder = sortedData;
          // sets the data as an Array
        });    

        console.log(global.uid)   
  }

  

  searchData(text) {
    const data = this.arrayholder.filter(item => {
      const itemData = item.title.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1
    });
    this.setState({
      data: data,
      text: text
      })
    }
 
    itemSeparator = () => {
      return (
        <View
          style={{
            height: .5,
            width: "100%",
          }}
        />
      );
    }
 
    render() {
      if (this.state.isLoading) {
        return (
          <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator />
          </View>
        );
      }
      return (
     

        <View style={styles.MainContainer}>
   
   
        <TextInput 
         style={styles.textInput}
         onChangeText={(text) => this.searchData(text)}
         value={this.state.text}
         underlineColorAndroid='transparent'
         placeholder="Search Here" />
      
        <FlatList
          data={this.state.data}
          keyExtractor={ (item, index) => index.toString() }
          ItemSeparatorComponent={this.itemSeparator}
          renderItem={({ item }) => 
          <Card style={styles.card}>
          <TouchableOpacity onPress={() => {
           this.props.navigation.navigate({
              routeName: 'ProductDetail',
              params: {
                itemId: item.pk,
                itemTitle: item.fields.title,
                itemDescription: item.fields.description,
                itemPhoto: item.fields.photo,
                itemStore: item.fields.stores,
                itemBrand: item.fields.brand,
                itemCategory: item.fields.category
                // forwarding all the parameters to the next screen
            
              }
            });
          }}>
             
          
             <View style={styles.rowing}>

<View style={styles.view1}>
<Text style= {styles.row}>   {item.fields.title} </Text>
</View>


<View>
<View style={styles.view2}>
<Image
  style={styles.tinyLogo}
  source={{
    uri: item.fields.photo,
  }}
/>
</View>
</View>

</View>
<View style={styles.rowing}>
<View style={styles.view1}>  


  <Text style= {styles.rowbrand}> Brand: {item.fields.brand}</Text>
</View>
<View style={styles.view2}>  


  <Text style= {styles.row2}> {item.fields.stores}</Text>
</View>
</View>
          </TouchableOpacity>
          </Card>} />
      </View>

   
    );
  }
}
CategoryProductsScreen.navigationOptions = navigationData => {
  global.catId = navigationData.navigation.getParam('categoryId');
  const catName = navigationData.navigation.getParam('categoryTitle')
  return {
    headerTitle: catName,
  };
};
const styles = StyleSheet.create({
 
  
  MainContainer: {
    justifyContent: 'space-between',
    flex: 1,
    margin: 0,
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.background,
   
  },
  rowing: {
    flex: 1, 
    flexDirection: 'row',
    width: '100%',
    alignContent: 'space-between',
   
  },
  row: {
    fontSize: 13,
    paddingTop: 10,
  textAlign: 'left',
  flexShrink: 1,

  },
  rowbrand: {
    fontSize: 10,
    paddingTop: 0,
  textAlign: 'left',
  color: 'grey',

  },
  
  row2: {
    fontSize: 10,
    paddingTop: 0,

    textAlign: 'right',
    color: 'grey',

  },
  textInput: {
    textAlign: 'center',
    height: 42,
    borderColor: '#009688',
    borderRadius: 8,
    backgroundColor: "#FFFF",
    margin: 10,
  },
  screen: {
    flex: 1,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
 view1: {
   flex: 1,

 },
 view2: {
   flex: 1,
   marginRight: 10,
   marginTop: 10,
 
 },
  column: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  card: {
  marginHorizontal: 6,
  marginBottom: 10,
  
  },
  textstyle: {
    paddingTop: 0,
    marginLeft: 5,
  }
});