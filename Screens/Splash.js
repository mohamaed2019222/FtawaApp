import React from 'react';
import { View, Text,Image,StyleSheet,Dimensions,ScrollView,ImageBackground,TouchableOpacity,Animated,BackHandler  } from 'react-native';

import BottomDrawer from 'rn-bottom-drawer'; 
import SQLite from 'react-native-sqlite-storage';

import QuastionUser from '../Screens/QuastionUser';

import * as Animatable from 'react-native-animatable';

import ViewScreen from './ViewScreen'

var width = Dimensions.get('window').width  /2;
const TAB_BAR_HEIGHT = 49;
const HEADER_HEIGHT = 0;
var db;


export default class Splash extends React.Component {

    static navigationOptions = { header:null}
      constructor(props){
       super(props)
         this.state={
           QuastionDay:'',
           QuastionUser:'',
           opacityFade: new Animated.Value(1),
           top:false,
           bottom:true,
         }
    // connect with sqlite name
    db = SQLite.openDatabase({name:'islamquastions', createFromLocation: '~islamquastions.db'},  () =>{
        this.GetQuastionDay()// get quastion day function in constractor
       },
     (error) =>
       {
     alert(error);
          });
      }
  //لتعطيل العودة من خلال زر العودة في اجهزة الاندرويد   

 
      GetQuastionDay(){   // select question from question table and answer from answers table جلب السؤوال والجواب بشكل عشوائي من قاعدة البيانات نتيجة واحدة فقط
        db.transaction((tx) =>{
          tx.executeSql("SELECT questions.title,questions.id,questions.topic_id,answers.text ,topics.fhotos,topics.id FROM questions , topics INNER JOIN answers ON questions.topic_id=topics.id AND answers.quanstion_id=questions.id  ORDER BY RANDOM() LIMIT 1", [] , (tx, results) => {
            var len = results.rows.item(0)
            this.setState({QuastionDay: len})
          }, (error) => {
            alert(error.message);
          });
        });
      
        }
      
// bottom sheet
  renderContent = () => {//محتوى البوتوم دراور
    return (
   <ViewScreen Go={this.props.navigation}/>// get some sections from viewscreen جلب صفحة فيوسكرين وعرض خمسة اقسام فيها 
    )
  }
  //function for user quastion
  QuastionUser(){
    return(
      <QuastionUser Fo={this.props.navigation.navigate('User')} />//الانتقال الى صفحة سؤال المستخدم 
          )
  }
 test(){
   if(this.state.text !== ""){
    this.GetQuastionDay()
   }else{
    alert('noooo')
   }
 }
 topFunc(){
     this.setState({top:true,
                    bottom:false});
}
 bottomFunc(){
  this.setState({top:false,
                 bottom:true});
}

  render() {

    return (
      <View style={{flex:1}}>
        <ImageBackground source={require('../Images/bg.png')}  style={{width: '100%', height: '100%'}}>
     

       {/*السؤال اليومي*/}
       {this.state.bottom ? 
           <Animatable.View animation={this.state.top ? "fadeIn" : "fadeIn"} style={styles.ContainerQuastionDay}>
         <View style={styles.borderQuastion}>
           <View style={styles.ImageQuastion}>
             <Image source={{uri: this.state.QuastionDay.fhotos}} style={{width:80,height:80,borderRadius:50}} />
           </View>
         <ScrollView>

           <Text style={styles.titleQuastion}>سؤال اليوم</Text>
           <Text style={styles.contentQuastion}>{this.state.QuastionDay.title}</Text>
           <Text style={styles.contnetAnswer}>{this.state.QuastionDay.text}</Text>
         </ScrollView>
         </View>
      </Animatable.View>
      : 
      <Animatable.View animation={ "zoomIn"} duration={500} style={{top:80,alignItems:'center'}}>
         <Image source={require('../Images/circle.jpg')} style={{width:140,height:140,borderRadius:15}} />
      </Animatable.View>

          }

      <BottomDrawer
         //backgroundColor={'#b1e8ed'}
            startUp={false}
            //shadow={true}
        roundedEdge={false}// عمل حواف مستديرة 
        downDisplay={390}
        containerHeight={540}
        onExpanded = {() => this.topFunc()}
        onCollapsed = {() => this.bottomFunc()}
      >
   <ImageBackground source={require('../Images/backgroundimage/388833-PCQCF9-343.jpg')}
   imageStyle={{borderTopRightRadius:10,borderTopLeftRadius:10,opacity: 0.2}}
   style={{width:'100%',height:'100%'}}>

    <View style={{alignItems:'center'}}>
     <Image source={require('../Images/top.png')} style={{left:6,width:300,height:20,bottom:14,alignItems:'center'}} />
      <View style={{width:45,height:45,borderWidth:3,backgroundColor:'#fff',borderColor:'#21BCBE',borderRadius:45/2,bottom:50,justifyContent:'center',alignItems:'center'}}>
       {this.state.top ?  <Image source={require('../Images/down-arrow.png')} style={{width:20,height:20}} />    : true     }
       {this.state.bottom ?  <Image source={require('../Images/top-arrow.png')} style={{width:20,height:20}} />  : true     }
      </View>
    </View>

             { this.renderContent() /*هنا محتوى here is content for bottom sheet*/}
         {/*here is flotter bottom sheet*/}
        {

    <View style={{bottom:20,padding:15,paddingRight:10,paddingLeft:20,
      borderTopWidth:0,
    shadowColor: "rgba(0,0,0,0.3)",
    shadowOffset: {width:0, height:0},
    shadowOpacity: 1.5,
    shadowRadius: 3,
    elevation: 3}}>
      
      {/*
       <View style={{flexDirection:'row',justifyContent:'space-around'}}>

      <View style={{top:15}}>
        <Image source={require('../icons/facebook.png')} style={{width:70,height:70,borderRadius:50}}/>
      </View>

      <View style={{top:15}}>
        <Image source={require('../icons/instagram.png')} style={{width:70,height:70,borderRadius:50}}/>
      </View>

      <View style={{top:15}}>
        <Image source={require('../icons/telegram.png')} style={{width:70,height:70,borderRadius:50}}/>
      </View>

      <View style={{top:15}}>
        <Image source={require('../icons/youtube.png')} style={{width:70,height:70,borderRadius:50}}/>
      </View>

      </View>
        */}
    </View>
    }
    </ImageBackground>
      </BottomDrawer>

    {/*<Text>{this.state.QuastionUser}</Text>*/}
      </ImageBackground>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  QuastionUser:{
  alignItems:'center',
  height:60,
  top:100,
  },

  ContainerQuastionDay:{
      top:80,
      backgroundColor:"white",
      height:350,
      margin:10,
      borderRadius:20,
  },
  borderQuastion:{
    borderColor:'#21BCBE',
    borderWidth:3,
    margin:7,
    borderRadius:15,
    flex:1
  },
  ImageQuastion:{
    position:'absolute',zIndex:1,top:-50,left:width -62,borderWidth:3,borderColor:'#21BCBE',borderRadius:50,
           opacity: 0.9,
           backgroundColor: 'black',
           shadowColor: '#000',
         shadowOffset: { width: 2, height: 5},
         shadowOpacity: 0.7,
         shadowRadius: 20,
         elevation: 40
  },
  titleQuastion:{
    fontFamily:'MOLarabic', textAlign:'center', fontSize:24,color:'#21BCBE',right:10,top:30
  },
  contentQuastion:{
    fontFamily:'MOLarabic',fontSize:20,color:'black',margin:12,top:20
  },
  contnetAnswer:{
    fontFamily:'MOLarabic',fontSize:20,color:'red',margin:12
  },
  headerSetting:{
    width:'20%',
   },
});