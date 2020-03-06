import React, {Component} from 'react';
import SQLite from 'react-native-sqlite-storage';
import FloatingButton from '../Components/FloatingButton';
import Pager from './Pager'

import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  View,
  Text,
  Dimensions,
  Image,Share
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

var {height, width} = Dimensions.get('window')
export default class qustions extends Component{
  static navigationOptions = { header:null}

constructor(props){
    super(props)
    this.state={
      Color:false,
        listdata:"",
        listdataAnswer:"",
        name:'',
        id_q:'',
    }
    var db = SQLite.openDatabase({name:'islamquastions', createFromLocation: '~islamquastions.db'},  () =>
    {
     console.log('connected');
     //alert('conect')
    },
     (error) =>
    {
     alert(error);
   });
   //questions
   db.transaction((tx) =>{
    const {params} = this.props.navigation.state;
    this.setState({name: params.name});

    tx.executeSql("select * from questions WHERE id=? ", [params.id] , (tx, results) => {
      var len = results.rows.length;
      //alert(len)
      if (len > 0){
        var row = results.rows.item(0)
        this.setState({listdata:row.title});
        this.setState({id_q: row.id});//نأخذ id حتى نستخدمه في حقل الاجوبة ليجلب جواب السؤال نفسه حسب هذه الايدي الخاص بالسؤال
      }
  
    }, (error) => {
      alert(error);
    });
});
//answers
db.transaction((tx) =>{

  let id_qus = this.state.id_q;//ايدي الخاص بالسؤال نجلب من خلاله الجواب الخاص بالسؤال

  tx.executeSql("select * from answers WHERE quanstion_id=? ", [id_qus] , (tx, results) => {
   var long = results.rows.length;
    if(long > 0){
      var rowAnswer = results.rows.item(0)
      this.setState({listdataAnswer: rowAnswer.text});
    }
  });
});
  }

  onShare = async () => {

    try {
      const result = await Share.share({
       title:'مشاركة السؤال',
        message: this.state.listdata +"\n" + this.state.listdataAnswer,

      },{
        dialogTitle:'مشاركة السؤال',
        excludedActivityTypes:
        'com.apple' 
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }

  //تغير لون الشاشة للوضع الليلي
  changedColor(){
    if(this.state.Color == false){
      this.setState({Color: true})
    }else{
      this.setState({Color: false})
    }
    }
render(){
  const {params} = this.props.navigation.state;//جلب عنوان القسم 

  return(

            <ImageBackground source={this.state.Color?  require('../Images/68815.png') : require('../Images/bg.png') }  style={{width: '100%', height: '100%'}}>
          <View style={[styles.Container,{backgroundColor: this.state.Color ?  null: null}]}>
 
          <View style={{justifyContent:'center',alignItems:'center',backgroundColor: this.state.Color ? '#202020' : 'white' ,height:60}}>
             <Text style={{color: this.state.Color ? 'white' : '#21BCBE' , fontSize:30}}>{params.name}</Text>
          </View>

         <ScrollView style={{zIndex:-2, paddingLeft:7, paddingRight:7}}>
        
              <View style={styles.ContainerViewQuastion}>
               
                <View style={[styles.ViewQuastion,{backgroundColor: this.state.Color ? '#505050' : 'white'}]}> 
                  <Text style={[styles.Text,{color: this.state.Color ? 'white' : '#21BCBE' }]}>{this.state.listdata}</Text>
                </View>

                <TouchableOpacity style={{width:35,height:35,borderRadius: 35/2,backgroundColor:'#feb72b',justifyContent:'center',alignItems:'center'}} 
                onPress={this.onShare}>
                  <Icon name="share" style={{fontSize:22,color:'black'}} />
                </TouchableOpacity>

              </View>
           
            <View style={styles.ContainerViewAnser}> 
               <View style={[styles.ViewAnser,{backgroundColor: this.state.Color ? '#505050' : 'white'}]}> 
               <Text style={[styles.Text,{color:'#1b262c',fontSize:16 }]}>حسب رأي السيد السيستاني</Text>
               <Text style={[styles.Text,{color: this.state.Color ? 'white' : '#21BCBE' }]}>{this.state.listdataAnswer}</Text>
               </View>

                <Image source={require('../Images/450909_o.jpg')} style={{width:40,height:40,borderRadius:40/2}} />
            </View>
           
           </ScrollView>

            <FloatingButton 
            home={() => this.props.navigation.navigate('Splash')} 
            pagerScreen={() =>this.props.navigation.navigate('Pager')}
            changedcolor={() => this.changedColor()}
              />

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
   ContainerViewQuastion:{
    flex:1,
    padding:5,
    marginTop:20,
   flexDirection:'row',
   justifyContent:'center',
   alignItems:'flex-end',
   },
   ViewQuastion:{
    width:'90%',
    backgroundColor:  'white',
    borderRadius:25,
      borderWidth: 0,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 1,  
   },

   ContainerViewAnser:{
    padding:5,
    flex: 1, 
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems:'flex-start',
    marginTop:40
   },
   ViewAnser:{
     width:"89%",
     right:6,
    borderRadius:15,
    borderTopEndRadius:1,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,  
   },
   Text:{
     fontSize:22,
     padding:10,
     color:'#21BCBE'
   }
   });
   