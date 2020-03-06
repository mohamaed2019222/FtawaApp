import React, { Component } from "react";
import {View ,Text,Image,StyleSheet,Animated, TouchableWithoutFeedback,TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default class FloatingButton extends Component{
    state = {
       animation: new Animated.Value(0)
    }
  toggleOpen = () => {
      const toValue = this._open ? 0 : 1;
      Animated.spring(this.state.animation, {
        toValue,
        friction: 5
    }).start();
     this._open = !this._open;
  }
    render(){
     const reloadStyle = {
         transform:[
             {
            scale: this.state.animation
             },{
            translateY: this.state.animation.interpolate({
                inputRange: [0,1],
                outputRange:[0,-70]
            })
             }
        ]
     }
     const topStyle = {
        transform: [
            {
                scale: this.state.animation
            },{
               translateY: this.state.animation.interpolate({
                   inputRange: [0,1],
                   outputRange:[0, -210]
               })
                }
        ]
    }
     const orderStyle = {
         transform: [
             {
                 scale: this.state.animation
             },{
                translateY: this.state.animation.interpolate({
                    inputRange: [0,1],
                    outputRange:[0, -140]
                })
                 }
         ]
     }
     const opacity = this.state.animation.interpolate({
        inputRange:[0,0.5,1],
        outputRange:[0,0,1]
    })
    const rotation = {
        transform:[
           {
               rotate: this.state.animation.interpolate({
                inputRange: [0,1],
                outputRange:["0deg",'45deg']
               })
           }
        ]
      }

            const labelpositionInterpolate =
            this.state.animation.interpolate({
                inputRange:[0,1],
                outputRange:[0,-60]
            });
            const opacityInterpolate = 
            this.state.animation.interpolate({
            inputRange:[0,.8,1],
            outputRange:[0,0,1]
            })
            const labelStyle = {
            opacity: opacityInterpolate,
            transform : [{
                translateX: labelpositionInterpolate
            }]
            }
            
        return(
        <View style={styles.container}>

        <TouchableWithoutFeedback onPress={this.props.changedcolor} >
          <Animated.View style={[styles.button,styles.other,opacity,topStyle]}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
            <Animated.Text style={[styles.label,labelStyle]}> الوضع الليلي</Animated.Text>
          </Animated.View>
        </TouchableWithoutFeedback> 

         <TouchableWithoutFeedback onPress={this.props.home} >
          <Animated.View style={[styles.button,styles.other,opacity,orderStyle]} >
          <Icon name="md-create" style={styles.actionButtonIcon} />
             <Animated.Text style={[styles.label,labelStyle]}> الرئيسية</Animated.Text>
          </Animated.View>
        </TouchableWithoutFeedback> 

        <TouchableWithoutFeedback onPress={ this.props.pagerScreen}>
          <Animated.View style={[styles.button,styles.other,opacity,reloadStyle]}>
          <Icon name="md-done-all" style={styles.actionButtonIcon} />
            <Animated.Text style={[styles.label,labelStyle]}>مشاركة</Animated.Text>
          </Animated.View>
        </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={this.toggleOpen}>
          <Animated.View style={[styles.button,styles.pay,rotation]}>
            <Image source={require('../Images/plus2.png')} style={{width:20,height:20}}/>
          </Animated.View>
           </TouchableWithoutFeedback>
        </View>
        );
    }
}

const styles = StyleSheet.create({
 container:{
  flex:1,
          justifyContent:'center',
     alignItems:'center',
    },
 actionButtonIcon: {
  fontSize: 20,
  height: 22,
  color: '#F02A4B',
},
 button:{
    position:'absolute',
     width:60,
     height:60,
     alignItems:'center',
     justifyContent:'center',
     shadowColor:'#333',
     shadowOpacity:1,
     shadowOffset:{x:2, y:0},
     shadowRadius: 2,
     borderRadius:30,
     bottom:20,
     right:20,
 },
 pay:{
     backgroundColor:'#F02A4B'
 },
 other:{
  width:50,
  height:50,
  borderRadius: 50/2,
  marginRight:5,
  backgroundColor:'white',
 },
 label:{
   flex:1,
    backgroundColor:'white',
    fontSize:18,
    color:'red',
    bottom:10,
    position:'absolute',
    width:100,
    padding:3,
    right:1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    
  }
});