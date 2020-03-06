import React, { Component } from 'react';
import { View, Text,Image,StyleSheet,TextInput,ImageBackground,TouchableOpacity  } from 'react-native';
import SQLite from 'react-native-sqlite-storage';


export default class QuastionUser extends Component {
    static navigationOptions = { header:null}
    constructor(props){
      super(props)
       this.state = {
        text:''
       }
      db = SQLite.openDatabase({name:'islamquastions', createFromLocation: '~islamquastions.db'},  () => 
      {
           },
             (error) =>
          {
       alert(error);
     }); 


    }

    sendQuastion(){

      var text = this.state.text;
      db.transaction((tx) =>{
      tx.executeSql("INSERT INTO userQuastion (id, content) VALUES ('',"+ text +")" , (tx, results) => { 
       var ret = results.rows.item(0)
        alert(ret)
      
    })
      })
         }
    render(){
        return(
            <View style={{flex:1}}>
              <ImageBackground source={require('../Images/bg.png')}  style={{width: '100%', height: '100%'}}>
                <View style={{top:100,margin:5}}>
                <Text style={{fontSize:20}}>تستطيع ان تكتب سؤالك هنا وسوف نعرضه مع الاجابة في القسم المخصص 
                    وذلك بعد الحصول على الاجابة من قبل وكلاء المراجع 
                </Text>
               </View>
            <View style={{alignItems:'center',top:120}}>
            <Text style={{fontSize:20,textAlign:'center'}}>ضع سؤالك</Text>
                <TextInput
                multiline={true}
                onChangeText={(text)=> this.setState({text})}
                style={{top:10,width:370,height:90,borderRadius:15,backgroundColor:'white',
                shadowColor: '#000',shadowOffset: { width: 2, height: 5},shadowOpacity: 0.7,shadowRadius: 20,elevation: 7}}
              />
              <TouchableOpacity style={{top:30,width:80,height:80,backgroundColor:'#96f7d2',borderRadius:15,justifyContent:'center',
             shadowColor: '#000',shadowOffset: { width: 2, height: 5},shadowOpacity: 0.7,shadowRadius: 20,elevation: 7}}
              onPress={() => this.sendQuastion()}>
                    <Text style={{textAlign:'center',top:5}}>أرسل</Text>
             </TouchableOpacity>

        </View>
           </ImageBackground>
         </View>
        )
    }
}