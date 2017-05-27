
import React, {Component} from 'react';
import {
    Text, View,
    StyleSheet,
    NavigatorIOS,
} from 'react-native';

import ScrollableTabView, { ScrollableTabBar} from 'react-native-scrollable-tab-view';
import RefreshListView from '../RefreshableListView'
import API from '../../NetWork/api'

export default class MyScrollableTabView extends Component {
    constructor(props){
        super(props);
        var url = API.HOME_PAGE.format("2","","0","1");
        this.state = {
            url:url
        }
    }

    _onChangeURL(url){
        this.setState({
            url:url
        })
    }

    render(){
        var data = ['搞笑','娱乐','情感','时尚','旅游','养生']
        var dataType = ['2','6','11','14','16','5']
       return (
           <ScrollableTabView
               style={styles.container}
               tabBarPosition="top"
               initialPage={0} //default 0
               renderTabBar={() => <ScrollableTabBar/>}
               tabBarUnderlineColor='deepskyblue'
               tabBarBackgroundColor='#FFFFFF'
               tabBarActiveTextColor='deepskyblue'
               tabBarInactiveTextColor='#000516'
               tabBarTextStyle={{fontSize: 18}}
               onChangeTab={(obj) =>{
                    var requestUrl = API.HOME_PAGE.format(dataType[obj.i],"","0","1");
                    switch (obj.i){
                        case 0:
                            this._onChangeURL(requestUrl)
                            break;
                        case 1:
                            this._onChangeURL(requestUrl)
                            break;
                        case 2:
                           this._onChangeURL(requestUrl)
                           break;
                        default:
                            this._onChangeURL(requestUrl)
                            break;
                    }
               }}
        //       onScroll={(postion) => {
        //  // float类型 [0, tab数量-1]    滑动时触发
        //  console.log('scroll position:' + postion);
        //}}
           >
               {
                   data.map((item,index) => {
                      var requestUrl = API.HOME_PAGE.format(dataType[index],"","0","1");
                       return (
                           <View key={index} tabLabel={data[index]} >
                                   <RefreshListView index={index} url={requestUrl} ctype={dataType[index]} navigator={this.props.navigator} />
                           </View>
                       )
                   })
                }
           </ScrollableTabView>
       )
    }
}

var styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop:64,
        paddingBottom:60,
    }
})