
import React, {Component} from 'react';
import SQLite from 'react-native-sqlite-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  TouchableOpacity, StyleSheet,ScrollView,
  View,Text,FlatList,Image,Dimensions,StatusBar,ImageBackground,Animated
} from 'react-native';

var db;
export default class ViewScreen extends Component{
    static navigationOptions = { header:null}
    
constructor(props){
   super(props)
    this.state={
     listdata:"",
     QuastionDay:'',
    }
    
    //الاتصال بقاعدة البيانات Connect to the database
  db = SQLite.openDatabase({name:'islamquastions', createFromLocation: '~islamquastions.db'},  () =>{
    this.getTopics();//جلب select من قاعدة البيانات 
   },
      (error) =>
  {
      alert(error);
  });
  }

getTopics(){
  db.transaction((tx) =>{
    tx.executeSql("select * from topics limit 8", [] , (tx, results) => {
      var len = results.rows.length;
  
if (len > 0){
    var ret = [];
     for(var i=0;i<len;i++){
        ret.push(results.rows.item(i));
           }
             this.setState({listdata:ret});
           }
         },
       (error) => {
      alert(error);
    });
  });

}

ShowItem(item, index){// جلب عناوين الأقسام وعرضها في الفلات ليست get the data from the database to flatlist

  if(index==7){
    return(
      <View style={styles.ContainerView}>
    <TouchableOpacity style={[styles.Title,{backgroundColor:'white'}]} onPress={ () => this.props.Go.navigate('Home')} >
      <Text style={{fontSize:36,textAlign:'center',color:'#21BCBE',left:30,top:10}}>المزيد....</Text>
  </TouchableOpacity>
  </View>
  );
  }

  return(
    <View style={styles.ContainerView}>
      <TouchableOpacity style={styles.Title} onPress={ () => this.props.Go.navigate('Sections',{id:item.id,name:item.name})}>
        <ImageBackground source={{uri: item.fhotos}} imageStyle={{ borderRadius:7}} style={{width:'100%',height:'100%'}}>
          <Text style={styles.Text}>{item.name}</Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  )
}// End

  render(){
     let listdata = this.state.listdata
    
     return(
    <View style={styles.Container}>
      <StatusBar backgroundColor="#45969b" barStyle="light-content" />
      <View style={styles.header}>
         <TouchableOpacity style={styles.headerTouchSearch} onPress={() => this.props.Go.navigate('Search',{})}>
         <Icon name="search" style={{paddingLeft:3,top:3, fontSize:30,color:'#21BCBE'}} />
            <Text style={{paddingRight:5,flex:1,fontSize:20,color:'#21BCBE'}}>إبحث عن السؤال</Text>
         </TouchableOpacity>
     </View>

    <View style={styles.ContainterButtons}>
        <FlatList
            numColumns={2}// عدد الأعمدة
            data={listdata}
            horizontal={false}
            renderItem={({ item, index }) => this.ShowItem(item, index)}
            keyExtractor = { (item, index) => index.toString() }
            Scroll={true}
       />
    </View>
     <View style={{height:10}} />
</View>
    )
  }
};

const styles = StyleSheet.create({
 Container:{
   flex:1,
  }, 
 header:{
   alignItems:'center',
   bottom:5,
  
},
headerTouchSearch:{
  backgroundColor: '#fff',
  flexDirection:'row',
  borderRadius:25,
  width:'90%',
  padding:10,
  shadowColor: '#000',
  shadowOffset: {width: 0, height: 2},
  shadowOpacity: 0.8,
  shadowRadius: 2,
  elevation: 1,
},
Title:{
  width:Dimensions.get("window").width/2 -15,
  backgroundColor: 'black',
  opacity: 0.7,
  height:83,
  borderRadius:10,
  right:5,
  margin:5, 
  shadowColor: '#000',
  shadowOffset: {width: 0, height: 2},
  shadowOpacity: 0.8,
  shadowRadius: 2,
  elevation: 1,
},
ContainterButtons:{
  paddingTop:15,
  paddingLeft:5,
 justifyContent:'center',
 alignItems:'center'
 },
 ContainerView:{
 //paddingBottom:4,
 },
Text:{
  fontSize:24,
  textAlign:'center',
   color:'white',
  top:25
}
});
