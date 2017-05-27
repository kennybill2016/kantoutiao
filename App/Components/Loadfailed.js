'use strict';
import React, { Component} from 'react';
import {
    StyleSheet,
    View, Text,
    TouchableOpacity,
} from 'react-native';

export default class Loading extends Component {
    constructor(props){
        super(props);
        this.state = {
            animating:true
        }
    }

    render(){
        return (
             <TouchableOpacity onPress={() => this._onPressListView()}>
                <View style={styles.container}>
                    <Text style={styles.title} >
                        网络不给力，点击屏幕重试
                    </Text>
                </View>
            </TouchableOpacity>

        )
    }
}

var styles = StyleSheet.create({
    container:{
      marginTop:64,
  //    flex:1,
    },
    centering:{
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    title: {
        fontSize: 16,
        textAlign: 'center',
        color: 'black',
        justifyContent: 'center',
    },

});