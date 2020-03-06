import React, {Component} from 'react';
import SQLite from 'react-native-sqlite-storage';

import ChangeColor from '../Screens/ChangeColor'
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  View,
  Text,
  Image,Share
} from 'react-native';

export default class Player extends Component{
  
render(){

  return(

            <ImageBackground source={require('../Images/bg.png')}  style={{width: '100%', height: '100%'}}>
          <View style={{width:400,height:700,backgroundColor:'blue'}}>

         
      
              </View>
            </ImageBackground>
    )
}
}

const styles = StyleSheet.create({
    Container:{
      flex:1,
      
    },
    header:{
     justifyContent:'center',
     alignItems:'center',
     top:40,
   
   },
   ContainerViewqus:{
    height:140,
    padding:10,
    width:'95%',
    left:10,
    marginTop:20,
    backgroundColor:'white',
    borderRadius:25,
      borderColor: 'white',
      borderWidth: 1,
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 3},
      shadowOpacity: 0.7,
      shadowRadius: 5,
      elevation: 5 
   },

   ContainerViewAns:{
    padding:10,
    flexDirection:'row',
    width:'95%',
    left:10,
    marginTop:50,
    backgroundColor:'white',
    borderRadius:100,
      borderColor: 'white',
      borderWidth: 1,
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 3},
      shadowOpacity: 0.7,
      shadowRadius: 5,
      elevation: 5 
   },
  
   Text:{
     fontSize:22,
     textAlign:'center',
     color:'#21BCBE'
   }
   });
   