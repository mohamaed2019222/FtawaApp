import React, { Component } from 'react';
import { View,Image,ImageBackground} from 'react-native';


export default class Logo extends Component{
    static navigationOptions = { header:null}
    constructor(props){
      super(props)
        this.state={
       ShowLogo: false
        }
      }
  
      componentDidMount(){
        setTimeout(() => {
            this.props.navigation.navigate('Splash');
            this.setState({ShowLogo: true})
           }, 500)
      }
  
    render()
       {
        return(
            <View style={{flex:1,backgroundColor:'white'}}>
              {!this.state.ShowLogo ?
             <ImageBackground source={require('../Images/68815.png')} style={{width:'100%',height:'100%'}}>
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
             <Image source={require('../Images/circle.jpg')} style={{width:140,height:140,borderRadius:15}} />
               </View>
             </ImageBackground>

              : null}
            </View>
        )
    }
}