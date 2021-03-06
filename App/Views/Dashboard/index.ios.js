'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text, View,TabBarIOS
} from 'react-native';

//import TabBar from '../../Components/TabBar'
import Icon from 'react-native-vector-icons/Ionicons'
//import Icon from 'react-native-vector-icons/FontAwesome'
import RefreshListView from '../../Components/RefreshableListView/index'
//import RefreshListView from '../../Components/RefreshableListView/GiftedListView'
import ScrollableNavBar from '../../Components/ScrollableTab/index'
import Me from './Me';
import Star from './Star'
var WeChat=require('react-native-wechat');

export default class Dashboard extends Component {
    constructor(props){
        super(props);
        WeChat.registerApp('wx21d1824bca8245df')
        this.state = {
            selectTab:'comment'
        }
    }

    _renderContent(type){
        switch(type){
            case 'comment':
                return (<ScrollableNavBar navigator={this.props.navigator}/>);
            case 'star':
                return(<Star navigator={this.props.navigator} />);
            case 'user':
                return(<Me navigator={this.props.navigator} />);
        }
    }

    render(){
        return (
            <TabBarIOS>
                <Icon.TabBarItem
                    title="头条"
                    iconName="ios-home"
                    selectedIconName="ios-home"
                    selected={this.state.selectTab == 'comment'}
                    onPress={() => {
                        this.setState({
                        selectTab:'comment'
                        })
                    }}
                >
                    {this._renderContent('comment')}
                </Icon.TabBarItem>

                <Icon.TabBarItem
                    title="视频"
                    iconName="ios-videocam"
                    selectedIconName="ios-videocam"
                    selected={this.state.selectTab == 'star'}
                    onPress={() => {
                        this.setState({
                            selectTab:'star'
                        })
                    }}
                >
                    {this._renderContent('star')}
                </Icon.TabBarItem>

                <Icon.TabBarItem
                    title="我的"
                    iconName="ios-person"
                    selectedIconName="ios-person"
                    selectedIconColor="red"
                    selected={this.state.selectTab == 'user'}
                    onPress={() => {
                        this.setState({
                           selectTab:'user'
                        })
                    }}
                >
                    {this._renderContent('user')}
                </Icon.TabBarItem>


            </TabBarIOS>
        )
    }
}

var styles = StyleSheet.create({
    tabContent: {
        //flex:1,
        //alignItems:'center',
        //justifyContent:'center'
        backgroundColor:'red'
    },
    listView:{
        marginTop:64
    }
});