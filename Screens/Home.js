import React, { Component } from 'react';
import { View, Text,ImageBackground,StyleSheet,TouchableOpacity,Dimensions,FlatList,TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SQLite from 'react-native-sqlite-storage';

import * as Animatable from 'react-native-animatable';

var  db;
export default class Home extends Component {
    static navigationOptions = { header:null}
    
constructor(props){
   super(props)

    this.state={
     listdata:"",
     results:'',
     Color:false,
     textvalue: ''
    }//الاتصال بقاعدة البيانات Connect to the database
  
  db = SQLite.openDatabase({name:'islamquastions', createFromLocation: '~islamquastions.db'},  () =>{
    this.getTopics();//جلب select من قاعدة البيانات 
   },
      (error) =>
  {
      alert(error.message);
  });
  }

getTopics(){
  db.transaction((tx) =>{
    tx.executeSql("select * from topics", [] , (tx, results) => {
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
// بحث في الأقسام
filterSearch(text){ 
  
    if(text.length==0){
      this.getTopics();//ان مسحت كلمة البحث اعد واخرج بيانات القاعدة 
        }else{
          db.transaction((tx) =>{
            tx.executeSql('SELECT * FROM topics WHERE name LIKE ?', ["%" + text + "%"] , (tx, results) => {
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
          alert(JSON.stringify(error));
        });
      });
    }
 // var text = text.length;
   this.setState({textvalue: text.length});
  }
  onCancel() {
    this.getTopics();
    this.setState({textvalue: ''});
  }
 
  //End
ShowItem(item){// جلب عناوين الأقسام وعرضها في الفلات ليست get the data from the database to flatlist
    return(
      <View style={styles.ContainerView}>
        <TouchableOpacity style={styles.Title} onPress={ () => this.props.navigation.navigate('Sections',{id:item.id,name:item.name})}>
        <ImageBackground source={{uri: item.fhotos}} imageStyle={{ borderRadius:7}} style={{width:'100%',height:'100%'}}>
          <Text style={styles.Text}>{item.name}</Text>
        </ImageBackground>    
       </TouchableOpacity>
      </View>
    )
  }// End

    render(){

      return(
       <View style={styles.Container}>
           <ImageBackground source={require('../Images/bg.png')} style={{width:'100%', height:'100%'}}>
           <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'white',height:60}}>
                <Text style={{color:'#21BCBE',fontSize:30}}>الأقسام</Text>
            </View>
           
          <View style={styles.header}>
            
          <View  style={styles.headerSearch}>
          <TextInput
              style={{fontSize:18,padding:12,paddingLeft:50}}
              placeholder = "أبـحث"
              placeholderTextColor = "red"
              onChangeText={(text) => this.filterSearch(text)}
              value={!String(this.state.textvalue) ? String(this.state.textvalue) : null}
           />
           {this.state.textvalue == 0  ?
           <Animatable.View animation={"fadeIn"} style={styles.searchIconCancelOrSearch} >
            <Icon name="search" style={{ fontSize:30,color:'black'}}/>
           </Animatable.View>
            :
            <Animatable.View animation={ "zoomIn"} style={styles.searchIconCancelOrSearch} >
              <TouchableOpacity  onPress={(text) => this.onCancel(text)}>
            <Icon name="clear" style={{ fontSize:30,color:'black'}}/>
              </TouchableOpacity>
            </Animatable.View>
              }
          </View>   


     </View>
    <View style={styles.ContainterButtons}>
        <FlatList
          //contentContainerStyle={{ paddingBottom: 100 }}
           numColumns={2}// عدد الأعمدة
            data={this.state.listdata}
             horizontal={false}
            renderItem={({ item }) => this.ShowItem(item)}
          keyExtractor = { (item, index) => index.toString() }
         Scroll={true}
       />
    </View>
       </ImageBackground>
       </View>
        );
    }
}


const styles = StyleSheet.create({
    Container:{
      flex:1,
    }, 
    header:{
      justifyContent:'center',
      flexDirection:'row',
      padding:20,
    },
    searchIconCancelOrSearch:{
    backgroundColor:'#e8f9e9',
    margin:7,
    width:38,
    height:38,
    borderRadius:38/2,
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
   headerSearch:{
    zIndex:1,
    width:'90%',
    backgroundColor: '#fff',
    borderRadius:25,
   },

   ContainterButtons:{
   flex:1,
   left:4,
   },
   ContainerView:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
   },
   Title:{
    width:Dimensions.get("window").width/2-10,
    opacity: 0.8, backgroundColor: 'black',
    height:83,
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    right:5,
    margin:5, 
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
   },
   Text:{
     fontSize:22,
     textAlign:'center',
     top:30
   },
   });
   