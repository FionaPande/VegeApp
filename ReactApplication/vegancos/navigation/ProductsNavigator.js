import { Alert, Platform , StyleSheet} from 'react-native';
import React, {useState} from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import {createBottomTabNavigator, createBottomTapNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import {Ionicons} from '@expo/vector-icons';
import { createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'
import { createDrawerNavigator} from 'react-navigation-drawer';
import {Text, View, Button, SafeAreaView} from 'react-native';
import {createSwitchNavigator} from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import CategoryProductsScreen from '../screens/CategoryProductsScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import UsersignupScreen from '../screens/user/UsersignupScreen';
import AddSuggestion from '../screens/user/AddSuggestion';
import ShowSuggestion from '../screens/user/ShowSuggestion';
import FAQScreen from '../screens/FAQScreen';
import DeleteScreen from '../screens/user/DeleteScreen';
import UserloginScreen from '../screens/user/UserloginScreen';
import PasswordForgottenScreen from '../screens/user/PasswordForgottenScreen';
import Colors from '../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MakeUpScreen from '../screens/MakeUpScreen';
import firebase from 'firebase';
import FavoriteScreen from '../screens/FavoritesScreen';


async function signout() {
  try {
      await firebase.auth().signOut();
     Alert.alert("You're logged out")

  } catch (e) {
      console.log(e);
  }
}





const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Colors.background, 
  },
  headerTintColor: 'black',
  gesturesEnabled: true,

};

const ProductsNavigator = createStackNavigator  (
  {
    Home: {
      screen: HomeScreen,
     headerShown: false,
    },
    CategoryProduct: {
      screen: CategoryProductsScreen
    },
    ProductDetail: {
      screen: ProductDetailScreen,
    
    },
  
    MakeUp: MakeUpScreen,
    AddSuggestion: AddSuggestion,
    Favorites: FavoritesScreen,
    ShowSuggestion: ShowSuggestion,
    FAQ: FAQScreen,

    SignUp: UsersignupScreen,
    Login: UserloginScreen,
    Delete: DeleteScreen,
    Password: PasswordForgottenScreen,
    
   
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
   
  }
);
 


const tabScreenConfig = {
  Products: {
    screen: ProductsNavigator,
    navigationOptions: {
      tabBarColor: "#251e3e"
    }
  },
  About: {
    screen: FAQScreen,
    navigationOptions: {
     
      tabBarColor: "#251e3e"
    }
    
  }
  
};

const ProductFavTabNavigator =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeTintColor: 'white',
        barStyle: {
          backgroundColor: "#CCC"
        }
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          activeTintColor: "black"
        }
      });

      
      
      const MyNavigator = createDrawerNavigator(
        {
          Home: {
            screen: ProductFavTabNavigator,
            navigationOptions: {
              drawerLabel: 'Home'
            }
          },
         
          Favorites: FavoritesScreen,
        
        },
         
        {
          contentOptions: {
          
          },
          contentComponent: props => {
        
            return (
             
              <View style={styles.container}>
               
                <SafeAreaView forceInset={{ bottom: 'always', horizontal: 'never' }}>
                <View>
                <TouchableOpacity
                style={styles.touchable}
                    onPress={() => {
                      props.navigation.navigate('Home');
                    }}
                  >
                    <Text> Home</Text>
                  </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.touchable}
                    onPress={() => {
                      props.navigation.navigate('AddSuggestion');
                    }}
                  > 
                  <Text> Suggest something</Text>
                  </TouchableOpacity>
                         <TouchableOpacity
                    style={styles.touchable}
                    onPress={() => {
                      props.navigation.navigate('ShowSuggestion');
                    }}
                  >
                    <Text> Show my Suggestions</Text>
                    </TouchableOpacity>
               <TouchableOpacity
                    style={styles.touchable}
                    onPress={() => {
                      props.navigation.navigate('Favorites');
                    }}
                  > 
                  <Text> Favorites</Text>
                  </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.touchable}
                    onPress={() => {
                      props.navigation.navigate('FAQ');
                    }}
                  >
                    <Text>FAQ</Text>
                    </TouchableOpacity>
                 
                    <View style={styles.bottom}>
               
                   <TouchableOpacity
                    style={styles.touchable}
                    onPress={() => {
                      props.navigation.navigate('Login');
                    }}
                > 
                <Text> SignUp / Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.touchable}
                    onPress={() => signout()}
                > 
                <Text>Logout</Text>
                </TouchableOpacity>
                </View>
                 </View>
                </SafeAreaView>
              </View>
           
            );
          }
        }
      );
  
    
      
      const MainNavigator = createSwitchNavigator({
        Shop: MyNavigator
      });
  
      const styles = StyleSheet.create({
        touchable: {
          height: 40,
          borderBottomWidth: 2,
          paddingTop: 5,
          alignItems: 'center',
          alignContent: 'center',
         
        },
        container: {
          flex: 1,
          paddingTop: 0,
        },
        bottom: {
          paddingTop: 100,
        }
      });
export default createAppContainer(MainNavigator);
