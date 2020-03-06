import React,{Component} from 'react';
import {View,Text,FlatList,StyleSheet,TouchableOpacity,ImageBackground,Dimensions,ScrollView,TextInput} from 'react-native';

import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SQLite from 'react-native-sqlite-storage';
var db ;
var {height, width} = Dimensions.get('window');
export default class Sections  extends Component{
  static navigationOptions = { header:null}

    constructor(props){
        super(props)
        this.state={
          listdata:"",
          name:'',
          textvalue: ''
        }
         db = SQLite.openDatabase({name:'islamquastions', createFromLocation: '~islamquastions.db'},  () =>
           {
              this.getTopics(); //جلب select لعرض الاسئلة
                },
                  (error) =>
               {
            alert(error);
          }); 
        }

      ShowItem(item){

        return(    
          
          <View style={styles.ContainerView}>     
            <TouchableOpacity style={styles.Content} onPress={() => this.props.navigation.navigate('qustions',{id:item.id,name:this.state.name})}>
              <Text style={styles.Text}>{item.title}</Text>
            </TouchableOpacity>
          </View>
        )
      }
      getTopics(){
        const {params} = this.props.navigation.state;
         this.setState({name: params.name});
        
        db.transaction((tx) =>{
         tx.executeSql("select * from questions WHERE topic_id=?", [params.id] ,  (tx, results) => {
 
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
        onFocus = () => {
          return (
            <View><Text style={{backgroundColor:'red'}}>{this.state.listdata}</Text></View>
          )
      }
      filterSearch(text){ 
        if(text.length==0){
          this.getTopics();//ان مسحت كلمة البحث اعد واخرج بيانات القاعدة 
            }else{
            
               db.transaction((tx) =>{
                 tx.executeSql('SELECT * FROM questions WHERE title LIKE ?', ["%" + text + "%"] , (tx, results) => {
                
                   var len = results.rows.length;
                     if (len > 0){
                       var ret = [];
                          for(var i=0;i<len;i++){
                           ret.push(results.rows.item(i));
                             }
                               this.setState({listdata:ret});
                             }
                          },
                       (error) => 
                     {
                  alert(JSON.stringify(error));
                });
             });
          }
          this.setState({textvalue: text.length});
      }

      onCancel() {
        this.getTopics();
        this.setState({textvalue: ''});
      }

    render(){
      const {params} = this.props.navigation.state;

        return(
            <View style={styles.Container}>
                <ImageBackground source={require('../Images/bg.png')}  style={{width: '100%', height: '100%'}}>

             <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'white',height:60}}>
                <Text style={{color:'#21BCBE',fontSize:30}}>{params.name}</Text>
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
         <ScrollView 
         contentContainerStyle={{paddingVertical:10}}>
      <View style={styles.ContainterButtons}
>
     <FlatList
        data={this.state.listdata}
        renderItem={({ item }) => this.ShowItem(item)}
        keyExtractor = { (item, index) => index.toString() }
        Scroll={true}  

      />
      </View>
      </ScrollView>
        </ImageBackground>

  </View>
        )
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
      },
   ContainerView:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    margin:10,
   },
   Content:{
      flex:1,
      padding:10,
      backgroundColor:'white',
      borderRadius:20,   
      borderColor: 'white',
      borderWidth: 0,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 1,   
   },
 
   Text:{
     fontSize:20,
     color:'#21BCBE',
     padding:8
   }
   });
   