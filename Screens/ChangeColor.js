import React,{Component} from 'react';
import { Text, View,TouchableOpacity,Image} from 'react-native';

import ViewScreen from './ViewScreen';
   {/***زر الأعدادات***/}

/*
   <View style={styles.headerSetting}>  
   <TouchableOpacity  onPress={() => this.props.navigation.navigate('Color')}>
     <Image source={require('../Images/settings.png')} style={{height:33,width:37,padding:10,top:3}} />
   </TouchableOpacity>
</View>
*/
export default class ChangeColor extends Component{
    constructor(props){
        super(props)
          this.state={
              Color: false,
              backgroundColor: props.changec,
              backgroundColort: props.changect


          }
          
    }
   
    changecolor(){

        if(this.state.Color == false){
          this.setState({Color: true})
        }else{
          this.setState({Color: false})
        }
      }
    
    render(){

      return(
            <View style={{flex:1,backgroundColor: this.state.Color ? this.state.backgroundColor :this.state.backgroundColort
            }}>

       <TouchableOpacity  onPress={() => this.changecolor()}>
           <Text>{this.state.Color ? 'الوضع النهاري' : 'الوضع الليلي'}</Text>
       </TouchableOpacity>
          <Image source={this.props.img} style={{width:49,height:48,backgroundColor:'black'}} />
           </View>
        )
    }
}


