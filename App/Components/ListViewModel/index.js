'use strict';
import React, { Component} from 'react';
import {
    StyleSheet,
    Text, View,
    ListView,
    TouchableOpacity,
    Image,
} from 'react-native';

import DetailView from '../DtaileView';

export default class HomeListViewModel extends Component {
    constructor(props){
        super(props);
    }

    //enter detail
    _onPressListView(){
        console.log('enter detail')

        this.props.navigator.push({
            component:DetailView,
            title:'',
            rightButtonTitle: '分享',
            onRightButtonPress: DetailView.prototype.showActionSheet,
            rowData:{params:this.props.rowData}
        })
    }
    render(){
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
        padding:10,
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
        fontSize: 18,
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
        fontSize: 14,
        color: '#87CEFA',
        marginTop: 5,
        marginRight: 5
    },
});