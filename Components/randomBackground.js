import React, {Component} from 'react';
import SQLite from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-community/async-storage'
import moment from 'moment';

import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,Share
} from 'react-native';

export default class Qustions extends Component{
    
constructor(props){
    super(props)
    this.state={
        listdata:"",
        listdataAnswer:"",
      id_q:'',
      newData:'',
      newData2:''
    
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
   // const {params} = this.props.navigation.state;
    tx.executeSql("select * from questions", [] , (tx, results) => {
      var len = results.rows.length;
      //alert(len)
      console.log('selected');
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
        title: this.state.listdata,
        message: this.state.listdataAnswer 

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
  Set(){
      let  date   = moment().format();  ; 
      let listD   = this.state.listdata;
      
   

    
  
    AsyncStorage.getItem(date).then(value => {
    NiewVal = Number(value);
     }).then(() => {

    AsyncStorage.setItem(date,JSON.stringify(NiewVal)).then(res => {
      alert(res)
    })
    })
  }
  useGet(){
      return(
          <View>
              <Text>{this.state.newData} </Text>
              <Text>{this.state.newData2}</Text>
          </View>
           )
  }
render(){ 
    return( 
        <View style={styles.Container}>
                  <Text style={styles.Text}>{this.state.listdata}</Text>
                   <Text style={styles.Text}>{this.state.listdataAnswer}</Text>
                   <Text style={styles.Text}>{this.state.newData}</Text>
                   <Text style={styles.Text}>{this.state.newData2}</Text>
                    <TouchableOpacity onPress={() => this.onShare()}>
                      <Text style={styles.Text}>مشاركةالسؤال</Text>
                    </TouchableOpacity>
                    {this.Set()}
        </View>
    )
}
}

const styles = StyleSheet.create({
    Container:{
      flex:1,
      backgroundColor:'#a0855b'
    },
    header:{
     justifyContent:'center',
     alignItems:'center',
     top:40,
   
   },
   sircle:{
     width:150,
     height:150,
     borderRadius:100,
     bottom:20,
     backgroundColor:'#8105d8',
   },
   ContainerView:{
   
     top:40,
    justifyContent:'center',
    alignItems:'center'
   },
   Title:{
     width:250,
     height:50,
     margin:14,
     borderRadius:10,
     backgroundColor:'#f0dab1',
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
   }
   });
   