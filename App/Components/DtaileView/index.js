'use strict';
import React, { Component} from 'react';
import {
    View,Text,
    ScrollView,
    StyleSheet,
    Image,
    WebView,
    Dimensions,
    ActionSheetIOS,
    ToastAndroid,
} from 'react-native';

import API from '../../NetWork/api'
import Loading from '../Loading';
import HTMLView from 'react-native-htmlview'
var WeChat=require('react-native-wechat');

const {width, height} = Dimensions.get('window');

var actionSheets = ['微信朋友','微信朋友圈','微信收藏','取消']
var CANCEL_INDEX = 3;

export default class DetailView extends Component {
    constructor(props){
        super(props);
        WeChat.registerApp('wx8d560da3ba038e7e')
        this.state = {
            title:null,
            content:null,
            publish_time:null,
            source:null,
            clicked:'none',
            openurl:null,
        }
    }

    componentWillMount(){
        let url = API.DETAIL_VIEW + "?cid="+this.props.route.rowData.params.type+"&id="+this.props.route.rowData.params.id
        this.setState({openurl:url})
        this._onFetch(url)
    }

shareToTimeline() {
  WeChat.isWXAppInstalled()
  .then((isInstalled) => {
    if (isInstalled) {
      WeChat.shareToTimeline({
        title:'发送给：',
        description: this.title,
        thumbImage: '',
        type: 'news',
        webpageUrl: this.openurl
      })
      .catch((error) => {
        ToastShort(error.message);
      });
    } else {
      ToastShort('没有安装微信软件，请您安装微信之后再试');
    }
  });
 }

shareToSession() {
   WeChat.isWXAppInstalled()
    .then((isInstalled) => {
      if (isInstalled) {
        WeChat.shareToSession({
          title:'微信好友测试链接',
          description: this.title,
          thumbImage: '',
          type: 'news',
          webpageUrl: this.openurl
        })
        .catch((error) => {
          ToastShort(error.message);
        });
      } else {
        ToastShort('没有安装微信软件，请您安装微信之后再试');
      }
    });
 }
 //显示ActionSheet
  showActionSheet() {
    ActionSheetIOS.showActionSheetWithOptions({
      options: actionSheets,
      cancelButtonIndex: CANCEL_INDEX,
      tintColor: 'blue',
    },
    (buttonIndex) => {
        if(buttonIndex==0) {
            () => {this.shareToSession();}
        }
        else if(buttonIndex==1) {
            () => {this.shareToTimeline();}
        }
        else if(buttonIndex==2) {
            () => {this.shareToSession();}
        }
    });
  }
    _onFetch(url){
        fetch(url)
            .then(response => response.json())
            .then(json =>{
//                console.log(json)
                var ptime = new Date(parseInt(json.data.publish_time) * 1000)//.toLocaleString().substr(0,17)
//                newDate.setTime(timestamp3 * 1000);
                var header =  "<head><style>img{max-width:320px !important;}</style></head>"
                this.setState({
                    title:json.data.title,
                    content:header+json.data.content,
                    publish_time:ptime.format('yyyy-MM-dd h:m'),
                    source:json.data.source
                })
            })
    }
    render(){
        var title = this.state.title;
        console.log('title==',title);
        return (
            title?
                <ScrollView>
                    <View style={styles.container}>
                        <Text style={styles.title}>{this.state.title}</Text>
                        <Text style={styles.timer}>{this.state.source}&nbsp;&nbsp;&nbsp;{this.state.publish_time}</Text>
                        <WebView  
                          style={styles.webview_style}
                          source={{html:this.state.content}}
                          javaScriptEnabled={true}  
                          domStorageEnabled={true}  
                          scalesPageToFit={false}  
                        />  
                    </View>
            </ScrollView>:
            <Loading />
        )
    }
}
Date.prototype.format = function(format) {
       var date = {
              "M+": this.getMonth() + 1,
              "d+": this.getDate(),
              "h+": this.getHours(),
              "m+": this.getMinutes(),
              "s+": this.getSeconds(),
              "q+": Math.floor((this.getMonth() + 3) / 3),
              "S+": this.getMilliseconds()
       };
       if (/(y+)/i.test(format)) {
              format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
       }
       for (var k in date) {
              if (new RegExp("(" + k + ")").test(format)) {
                     format = format.replace(RegExp.$1, RegExp.$1.length == 1
                            ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
              }
       }
       return format;
}
var styles = StyleSheet.create({
    container:{
        flexDirection:'column',
        justifyContent:'center',
        flex:1,
        marginTop:64,
        marginBottom:0,
    },
    title: {
        color:'black',
        fontSize:16,
        marginTop:10,
        textAlign:'center',
    },
    timer: {
        color:'gray',
        fontSize:10,
        textAlign:'left',
        marginTop:10,
        left:10,
    },
    itemImage:{
        margin:10,
        width:355,
        height:400
    },
    itemText:{
        color:'gray',
        fontSize:16,
    },
    webview_style:{
       marginTop:10,
       marginBottom:0,
       width:width,
       height:height,
       backgroundColor:'#ffffff',
    } 
});
