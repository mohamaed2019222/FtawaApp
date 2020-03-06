import {View,Text,Image} from 'react-native';
import React, {Component} from 'react';
import CarouselPager from 'react-native-carousel-pager';
 
export default class Pager extends Component {
  onClickSomething() {
    this.carousel.goToPage(2);
  }
 
  render() {
    return (
      <View style={{flex: 1}}>
        <CarouselPager ref={ref => this.carousel = ref} initialPage={2} pageStyle={{backgroundColor: 'red'}}>
          <View key={'page0'} >
        <Image source={require('../Images/Screens/scr1.png')} style={{width:"100%",height:"100%"}}  />
          </View>
          <View key={'page1'}>
          <Text>asdfsdfsdf</Text>
          </View>
          <View key={'page2'}>
          <Text>asdfsdfsdf</Text>
          </View>
          <View key={'page3'}>
          <Text>asdfsdfsdf</Text>
          </View>
        </CarouselPager>
      </View>
    );
  }
}