
'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text, View,
    TabBarIOS,
    ListView,
    NavigatorIOS,
    TouchableOpacity,
} from 'react-native';

import PullRefresh from 'react-native-pullrefresh-scrollview';
import HomePageList from '../ListViewModel';
import RecreationItem from '../ListViewModel/recreation'
import API from '../../NetWork/api'
import Loading from '../Loading'
import Loadfailed from '../Loadfailed'
import DeviceInfo from 'react-native-device-info'

export default class RefreshableListView extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataSource:new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2}),
            data:[],
            max_time:null,
            min_time:null,
            _listView:null,
            loadfailed:false,
            loaded:false,
        }
    }

    componentWillMount(){
        this.setState({
            loadfailed:false,
            loaded:false,
        })
        this._onFetch(this.props.url,false);
    }
    componentWillReceiveProps(props){
        if(this.props.url !== props.url){
            this._onFetch(props.url,false);
        }
    }

    _onFetch(url,isPullRefresh){
        var isRefresh = isPullRefresh;
        fetch(url)
            .then((response)=> response.json())
            .then(json => {
                console.log(json)
                let data = null;
                if(isRefresh)
                    data = json.data.data.concat(this.state.data)
                else
                    data = this.state.data.concat(json.data.data);
                 var min_time = json.data.min_time
                 var max_time = json.data.max_time
                this.setState({
                    data:data,
                    dataSource:this.state.dataSource.cloneWithRows(data),
                    min_time:min_time,
                    max_time:max_time,
                });
                if(this._listView&&json.data.data.length<8) {
                  this._listView.onLoadMoreEnd();
                }
                if(isRefresh) {
                    this._listView.onRefreshEnd();
                }
                setTimeout(()=>{
                    this.setState({
                        loadfailed:false,
                        loaded:true,
                    });
                },500);
            })
            .catch((error)=>{
                console.log(error)
                setTimeout(()=>{
                    this.setState({
                        loadfailed:true,
                        loaded:true,
                    });
                },500);
            });
    }

    _renderRow(rowData, sectionID, rowID){
        if(this.props.index !== -1){
            return (
                <HomePageList  rowData={rowData} navigator={this.props.navigator}/>
            )
        }else {
            return (
                <RecreationItem  rowData={rowData} navigator={this.props.navigator} />
            )
        }
    }

    _onRetray(){
        console.log('retray....')
        var deviceId = DeviceInfo.getUniqueID().toLowerCase();
        deviceId = deviceId.replace('-','');
        deviceId = deviceId.replace('-','');
        deviceId = deviceId.replace('-','');
        deviceId = deviceId.replace('-','');
        var url = API.HOME_PAGE.format(this.props.ctype,this.state.max_time,"","2",deviceId);
        this._onFetch(url,false);
    }

    _onRefresh(PullRefresh,page){
        var deviceId = DeviceInfo.getUniqueID().toLowerCase();
        deviceId = deviceId.replace('-','');
        deviceId = deviceId.replace('-','');
        deviceId = deviceId.replace('-','');
        deviceId = deviceId.replace('-','');
        var url = API.HOME_PAGE.format(this.props.ctype,this.state.max_time,"","2",deviceId);
        console.log(url)
        this._onFetch(url,true);
    }

    onLoadMore(PullRefresh){    
        var deviceId = DeviceInfo.getUniqueID().toLowerCase();
        deviceId = deviceId.replace('-','');
        deviceId = deviceId.replace('-','');
        deviceId = deviceId.replace('-','');
        deviceId = deviceId.replace('-','');
        var url = API.HOME_PAGE.format(this.props.ctype,"",this.state.min_time,"2",deviceId);
        console.log(url)
        this._onFetch(url,false);
    } 

    render(){
            if(this.state.data.length>0) {
                return(
                    <ListView
                        enableEmptySections={true}
                        renderScrollComponent={(props) =>
                        <PullRefresh
                        ref={(c) => this._listView = c}
                        onRefresh={(PullRefresh)=>this._onRefresh(PullRefresh,this.state.page)} onLoadMore={(PullRefresh)=>this.onLoadMore(PullRefresh)} useLoadMore={1}{...props} />}
                        dataSource={this.state.dataSource}
                        renderRow={this._renderRow.bind(this)}
                    />)
            }
             else if(this.state.loaded && this.state.data.length==0) {
                return(
                    <TouchableOpacity onPress={() => this._onRetray()}>
                        <View style={styles.container}>
                            <Text style={styles.title} >
                                获取数据为空！
                            </Text>
                        </View>
                    </TouchableOpacity>
                )
            }
            else if(this.state.loadfailed) {
                return(
                    <TouchableOpacity onPress={() => this._onRetray()}>
                        <View style={styles.container}>
                            <Text style={styles.title} >
                                网络不给力，点击屏幕重试
                            </Text>
                        </View>
                    </TouchableOpacity>
                )
            }
            else {
                return(<Loading />)
            }
    }
}

var styles = StyleSheet.create({
    container:{
      marginTop:64,
      justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        textAlign: 'center',
        color: 'black',
        justifyContent: 'center',
    },

});

