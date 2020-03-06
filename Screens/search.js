
import React,{Component} from 'react'
import {View,Text,FlatList,TouchableOpacity,StyleSheet,ImageBackground,TextInput} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
	
import AsyncStorage from '@react-native-community/async-storage';

import SQLite from 'react-native-sqlite-storage';

var db ;

export default class Search extends Component{
  static navigationOptions = { header:null}
  constructor(props){
    super(props)
    this.state={
      listdataQuastion:'',
      name:'',
      textvalue: '',
      backimage1: 'gray',
      backimage2: 'orange',
      changeColor:false,
      insert: ''
    }
     db = SQLite.openDatabase({name:'islamquastions', createFromLocation: '~islamquastions.db'},  () => 
       {
            },
              (error) =>
           {
        alert(error);
      }); 
     
    }
  
    changedColor() {
      
      if(this.state.changeColor == false){
        this.setState({changeColor: true});
        AsyncStorage.setItem('appMode', "dark")
      }else{
        this.setState({changeColor: false})
        AsyncStorage.setItem('appMode', "light")
      }     

    }
    componentDidMount(){

      AsyncStorage.getItem('appMode').then(value => {

        if(value == "dark"){
          this.setState({changeColor: true});
        }else{
          this.setState({changeColor: false})
        }
      })
    }
     //نعمل بحث في الاقسام
      filterSearch(text){ 
        if(text.length !== 0){
          db.transaction((tx) =>{
                 tx.executeSql('SELECT * from questions WHERE questions.tags  LIKE ?', ["%" + text + "%"] , (tx, results) => { 
                   var len = results.rows.length;
                     if (len > 0){
                       var ret = [];
                          for(var i=0;i<len;i++){
                           ret.push(results.rows.item(i));
                             }
                               this.setState({listdataQuastion:ret});
                             }
                          },
                       (error) => 
                     {
                  alert(JSON.stringify(error));
                });
             });
        }else{
         this.state.listdataQuastion
        }  
        this.setState({textvalue: text.length});

      }
      onCancel() {
        this.setState({textvalue: ''});
      }

      ShowItem(item){
      
        return(    
          <View style={styles.ContainerView}>     
              <TouchableOpacity style={styles.Content} onPress={() => this.props.navigation.navigate('qustions',{id:item.id })}>
        <Text style={styles.text} >{item.title}{item.topic_id}</Text>
              </TouchableOpacity>
            </View>
             )
     
        }
        insertvalue(){
          AsyncStorage.multiSet([
            ['backImage1',this.state.backimage1],
            ['backImage2',this.state.backimage2]
          ]).then(res => {
            this.setState({changeColor: true});
          })
        }
      
        getdata(){
          AsyncStorage.multiGet(['backImage1','backImage2']).then(ret => {

             this.setState({backimage1: ret[0][1],
                            backimage2: ret[1][1]});

          })

        }
  render(){

    return(
      
      <View style={styles.Container}>
        <ImageBackground source={this.state.changeColor ? require('../Images/bg.png') : require('../Images/68815.png')  }  style={{width: '100%', height: '100%'}}>
     
        <View style={{justifyContent:'center',alignItems:'center',backgroundColor: this.state.changeColor ?  this.state.backimage1: this.state.backimage2,height:60}}>
           <Text style={{color:'#21BCBE',fontSize:30}}>البحث</Text>
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
           <Animatable.View animation={"fadeIn"} style={styles.searchIconCancelOrSearch}>
            <Icon name="search" style={{ fontSize:30,color:'black'}}/>
           </Animatable.View>
            :
            <Animatable.View animation={ "zoomIn"} style={styles.searchIconCancelOrSearch}>
              <TouchableOpacity  onPress={(text) => this.onCancel(text)}>
            <Icon name="clear" style={{ fontSize:30,color:'black'}}/>
              </TouchableOpacity>
            </Animatable.View>
              }
          </View> 

        </View>
        <View style={styles.ContainterButtons}>
          
          <TouchableOpacity onPress={() => this.changedColor()}>
                <Text>تغير لون</Text>
          </TouchableOpacity>

       
             
        <FlatList  
              data={this.state.listdataQuastion}
              renderItem={({ item }) => this.ShowItem(item)
            }
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
    paddingTop:40
  },
  headerSearch:{
    zIndex:1,
    width:'90%',
    backgroundColor: '#fff',
    borderRadius:25,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
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
  ContainterButtons:{
    flex:1,
    top:20,
    paddingBottom:25
    },
    ContainerView:{
      flex:1,
      alignItems:'center',
      justifyContent:'center',
      margin:10,
     },
     Content:{
      flex:1,
      marginTop:20,
      padding:10,
      backgroundColor:'white',
      borderRadius:20,    
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 1,  
  },
  
  text:{
    fontSize:20,
    color:'#21BCBE',
    padding:8
    }

})
