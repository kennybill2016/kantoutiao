'use strict';

import React, {Component } from 'react';
import {
    View,Text,
    ScrollView,
    ListView,
    StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default class Me extends Component {
    constructor(props){
        var getSectionData = (dataBlob, sectionID) => {
            return dataBlob[sectionID];
        };
        var getRowData = (dataBlob, sectionID, rowID) => {
            return dataBlob[sectionID + ':' + rowID];
        };

        var jsonData = [
                    {
                        "section":[
                            {
                                title:'夜间模式',
                                iconName:'ios-eye',},
                            {
                                title:'清除缓存',
                                iconName:'ios-color-fill',},
                            ],
                        "sectionTitle":"",
                    },
                    {
                        "section":[
                            {
                                title:'意见反馈',
                                iconName:'ios-help-circle',},
                            {
                                title:'给个好评',
                                iconName:'ios-happy',},
                            {
                                title:'隐私协议',
                                iconName:'ios-paper',},
                            {
                                title:'分享App',
                                iconName:'ios-share',},
                        ],
                        "sectionTitle":"",
                     },
                ];

    //    定义变量
        var dataBlob = {},
            sectionIDs = [],
            rowIDs = [];

        for (var i = 0 ; i < jsonData.length ; i++){
        //    1.拿到所有的sectionId
            sectionIDs.push(i);

        //    2.把组中的内容放入dataBlob内容中
            dataBlob[i] = jsonData[i].sectionTitle;

        //    3.设置改组中每条数据的结构
            rowIDs[i] = [];

        //    4.取出改组中所有的数据
            var sections = jsonData[i].section;

        //    5.便利cars,设置每组的列表数据
            for (var j = 0 ; j < sections.length ; j++){
            //    改组中的每条对应的rowId
                rowIDs[i].push(j);

            // 把每一行中的内容放入dataBlob对象中
                dataBlob[i+':'+j] = sections[j];
            }
        }
        var listview = new ListView.DataSource({
                getSectionData: getSectionData, // 获取组中数据
                getRowData: getRowData, // 获取行中的数据
                rowHasChanged:(r1,r2) => r1 !== r2,
                sectionHeaderHasChanged:(s1, s2) => s1 !== s2
            });

        super(props);
        this.state = {
            // 更新状态
            dataSource: listview.cloneWithRowsAndSections(dataBlob,sectionIDs,rowIDs)
        }
    }

    _renderRow(rowData){
        return (

            <View style={styles.container}>
                <Icon name={rowData.iconName} size={20} color="#4F8EF7" style={styles.icon}/>
                <Text style={styles.title}>{rowData.title}</Text>
                <View style={styles.arrow}>
                  <Icon name="ios-arrow-forward" size={20} color="#4F8EF7" style={styles.icon}/>
                </View>
            </View>



        )
    }

    // 每一组对应的数据
    renderSectionHeader(sectionData,sectionId){
        return (
            <View style={styles.sectionView}>
            </View>
        );
    }

    render(){
        return (
            <ScrollView>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    renderSectionHeader={this.renderSectionHeader}
                />
            </ScrollView>
        )
    }
}
var styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems:'center',
        backgroundColor:'#fcfcfc',
        padding:10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        flex:1,
    },
    sectionView:{
        height:22,
        backgroundColor:"#c3c3c3",
        justifyContent:"center"
    },

    sectionTitle:{
        marginLeft:16,
    },
    title: {
        color:'black',
        fontSize:16,
//        marginTop:10,
        textAlign:'center',
        alignSelf:'flex-end',
    },
    icon: {
        marginRight:10,
    },
    arrow: {
        flex:1,
        alignSelf:'flex-end',
        flexDirection: 'row',
        justifyContent:'flex-end',
        borderRightWidth:0,
    },
});