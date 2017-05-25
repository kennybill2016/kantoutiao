'use strict';
import React, { Component} from 'react';
import {
    StyleSheet,
    Text, View,
    ListView,
    TouchableOpacity,
    Image,
    ActionSheetIOS,
    Alert,
} from 'react-native';

import DetailView from '../DtaileView';
import API from '../../NetWork/api'
var WeChat=require('react-native-wechat');


var actionSheets = ['微信朋友','微信朋友圈','微信收藏','取消']
var CANCEL_INDEX = 3;

class CustomButton extends React.Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor="#a5a5a5"
        onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}

export default class HomeListViewModel extends Component {
    constructor(props){
        super(props);

        this.state = {
            _resultsView:null,
            openurl:null,
            title:null,
            clicked: 'none',
        }
        this._showActionSheet = this.showActionSheet.bind(this);
    }

    componentWillMount(){
        let url = API.DETAIL_VIEW + "?cid="+this.props.rowData.type+"&id="+this.props.rowData.id
        this.setState({openurl:url})
        this.setState({title:this.props.rowData.title})
    }

    //enter detail
    _onPressListView(){
        console.log('enter detail')

        this.props.navigator.push({
            component:DetailView,
            title:'',
            rightButtonTitle: '分享',
            onRightButtonPress: this._showActionSheet,
            rowData:{params:this.props.rowData},
            passProps: {
              //ref: this.onResultsRef,
            },
        })
    }

shareToTimeline() {
  WeChat.isWXAppInstalled()
  .then((isInstalled) => {
    if (isInstalled) {
      WeChat.shareToTimeline({
        title:'发送给：',
        description: this.state.title,
        thumbImage: '',
        type: 'news',
        webpageUrl: this.state.openurl
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
  console.log('shareToSession.....');
   WeChat.isWXAppInstalled()
    .then((isInstalled) => {
      if (isInstalled) {
        console.log('start shareToSession.....');
        WeChat.shareToSession({
          title:'微信好友测试链接',
          description: this.state.title,
          thumbImage: '',
          type: 'news',
          webpageUrl: this.state.openurl
        })
        .catch((error) => {
//          ToastShort(error.message);
          console.log(error.message);

        });
      } else {
        console.log('没有安装微信软件，请您安装微信之后再试');
        //ToastShort('没有安装微信软件，请您安装微信之后再试');
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
    (buttonIndex) => this.actionSheetClick(buttonIndex));
  }

 actionSheetClick(buttonIndex) {
    if(buttonIndex==0) {
        this.shareToSession();
    }
    else if(buttonIndex==1) {
        this.shareToTimeline();
    }
    else if(buttonIndex==2) {
    }
//    Alert.alert(
//        'Alert Title',
//        actionSheets[buttonIndex]
//    )
}

//    onResultsRef(resultsViewRef) {
        //this._resultsView = resultsViewRef;
    //}

    render(){
        var ptime = new Date(this.props.rowData.publish_time * 1000)
        var publish = ptime.format('h:m')
        return (
            <TouchableOpacity onPress={() => this._onPressListView()}>
                <View style={styles.containerItem}>
                    <Image
                        style={styles.itemImage}
                        source={{uri:this.props.rowData.cover[0]}}
                    />
                    <View style={styles.itemRightContent} >
                        <Text style={styles.title}>
                            {this.props.rowData.title}
                        </Text>
                        <View style={styles.itemRightBottom} >
                            <Text style={styles.userName} >
                                {this.props.rowData.source}
                            </Text>
                            <Text style={styles.publishtime} >
                                {publish}
                            </Text>

                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

var styles = StyleSheet.create({
    base: {
        flex:1
    },
    containerItem: {
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fcfcfc',
        padding:6,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
    itemImage: {
        width:88,
        height:66,
        marginRight:10
    },
    itemRightContent: {
        flex: 1,
        flexDirection: 'column'
    },
    title: {
        fontSize: 16,
        textAlign: 'left',
        color: 'black'
    },
    itemRightBottom: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    userName: {
        flex: 1,
        fontSize: 12,
        color: '#87CEFA',
        marginTop: 10,
        marginRight: 0
    },
    publishtime: {
        flex: 1,
        fontSize: 12,
        textAlign: 'right',
        color: '#87CEFA',
        marginTop: 10,
        marginRight: 6
    },
    button: {
        margin:5,
        backgroundColor: 'white',
        padding: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#cdcdcd',
  },
});