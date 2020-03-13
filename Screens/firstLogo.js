import React, { Component } from 'react'
import Swiper from 'react-native-deck-swiper'
import { Button, StyleSheet, Text, View ,Image,ScrollView,Dimensions,TouchableOpacity} from 'react-native'
import SQLite from 'react-native-sqlite-storage';
import Carousel from 'react-native-snap-carousel';

// demo purposes only
function * range (start, end) {
  for (let i = start; i <= end; i++) {
    yield i
  }
}
var width = Dimensions.get('window').width  /2;
var Metrics = Dimensions.get('window').width;
var Metricsh = Dimensions.get('window').height;

export default class Logo extends Component {
  static navigationOptions = { header:null}

  constructor (props) {
    super(props)
    this.state = {
      QuastionDay:'',
      cardsItem: [],
      startFrom:0,
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

  GetQuastionDay(){   // select question from question table and answer from answers table جلب السؤوال والجواب بشكل عشوائي من قاعدة البيانات نتيجة واحدة فقط
    db.transaction((tx) =>{
      tx.executeSql("SELECT questions.title,questions.id AS quastionId,questions.topic_id,answers.text ,topics.fhotos,topics.id ,topics.name FROM questions , topics INNER JOIN answers ON questions.topic_id=topics.id AND answers.quanstion_id=questions.id  ORDER BY RANDOM() LIMIT 4", [] , (tx, results) => {
      let len = results.rows.length;
        if (len > 0){

        var ret = [];
        for(var index=0;index<results.rows.length;index++){
            ret.push(results.rows.item(index))
        }
      
        this.setState({cardsItem: ret, startFrom:ret.length}, () => {
          var self = this
          setTimeout(function(){
            self._carousel.snapToItem(self.state.cardsItem.length-1)
          }, 30)
        })
      }
      }, (error) => {
        alert(error.message);
      });
    });
    }
 


_renderItem = ({item, index}) => {
  return (
    <View  style={styles.ContainerQuastionDay}>
    <View style={styles.borderQuastion}>
      <View style={styles.ImageQuastion}>
        <Image source={{uri: item.fhotos}} style={{width:80,height:80,borderRadius:50}} />
      </View>        
      <TouchableOpacity style={styles.Content} onPress={() => this.props.navigation.navigate('qustions',{id:item.quastionId,name:item.name})}>
  
      <Text style={styles.contentQuastion}>{item.title}</Text>
    </TouchableOpacity>
    </View>
  </View>
  );
}

  render () {

    return (
      <View style={styles.container}>
<Carousel
              ref={(c) => { this._carousel = c; }}
              data={this.state.cardsItem}
              renderItem={this._renderItem}
              slideStyle={{paddingTop:30}}
              sliderHeight={Metricsh*0.80}
              sliderWidth={Metrics-50}
              itemHeight={Metricsh*0.75}
              layout={'stack'}
              layoutCardOffset={18}
              vertical
              firstItem={4}
              loop
              loopClonesPerSide={this.state.cardsItem.length}
            />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red'
  },

  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent'
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
  fontFamily:'MOLarabic',fontSize:14,color:'black',margin:12
},
contnetAnswer:{
  fontFamily:'MOLarabic',fontSize:14,color:'red',margin:12
},
})