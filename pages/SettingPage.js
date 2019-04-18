import React, {Component} from 'react';
import {StyleSheet, Text, View,Image,TouchableOpacity} from 'react-native';
import Icon from '@ant-design/react-native/lib/icon';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class SettingPage extends Component {
  static propTypes = {
    collectionIds:PropTypes.array
  }
  constructor(){
    super();
    this.state = {
      selectedTab:'redTab',
      fitForIPhoneX:false,
      avatarUrl:'https://img.36krcdn.com/20190314/v2_1552541675983_img_000'
    }
  }
  _onPressAvatarButton(){
    console.log(this.props.collectionIds)
    console.log('_onPressAvatarButton')
  }
  render() {
    return (
      <View style={{width:'100%',alignItems:'center',justifyContent:'center'}}>
        <View><Text style={styles.header}>设置</Text></View>
        <View style={styles.container}>
          <View style={styles.avatarAndUsername}>
            <View style={styles.avatarView}>
              <Image style={styles.avatarImage} source={{uri: this.state.avatarUrl}} />
            </View>
            <View style={styles.usernameView}>
            <TouchableOpacity>
              <Text>
                Username@xx.com
              </Text>
            </TouchableOpacity>
            </View>
            <View style={styles.avatarAndUsernameMore}>
              <TouchableOpacity activeOpacity={0.5} style={{height:'100%',alignItems:'center',justifyContent:'center'}} onPress={this._onPressAvatarButton.bind(this)}>
                <Icon name="right" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.setting}>
            <View style={styles.settingItemView}>
            <TouchableOpacity>
              <Text style={styles.collectionText}>
              收藏
              </Text>
              </TouchableOpacity>
              <View style={styles.rightMore}>
                <TouchableOpacity activeOpacity={0.5} style={{height:'100%',alignItems:'center',justifyContent:'center'}} onPress={this._onPressAvatarButton.bind(this)}>
                <Icon name="right" />
              </TouchableOpacity>
              </View>
            </View>
            <View style={styles.settingItemView}>
            <TouchableOpacity>
              <Text style={styles.contactText}>
              联系我们
              </Text>
              </TouchableOpacity>
              <View style={styles.rightMore}>
                <TouchableOpacity activeOpacity={0.5} style={{height:'100%',alignItems:'center',justifyContent:'center'}} onPress={this._onPressAvatarButton.bind(this)}>
                <Icon name="right" />
              </TouchableOpacity>
              </View>
            </View>
            <View style={styles.settingItemView}>
              <TouchableOpacity>
              <Text style={styles.aboutText}>
              关于
              </Text>
              </TouchableOpacity>  
              <View style={styles.rightMore}>
              <TouchableOpacity activeOpacity={0.5} style={{height:'100%',alignItems:'center',justifyContent:'center'}} onPress={this._onPressAvatarButton.bind(this)}>
                <Icon name="right" />
              </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) =>{
  return {
    collectionIds:state.collectionIds
  }
}
SettingPage = connect(mapStateToProps)(SettingPage);
export default SettingPage;
const styles = StyleSheet.create({
  header:{
    marginTop:20,
    marginBottom:5,
    marginBottom:20,
    fontWeight:'500',
    fontSize:24,
    color:'black',
    textAlign:'center'
  },
  container:{
    width:'100%',
    backgroundColor:'#f8f8f8',
  },
  avatarAndUsername:{
    paddingLeft:12,
    paddingRight:12,
    height:80,
    borderColor:'#f1f1f1',
    backgroundColor:'white',
    borderTopWidth:1,
    borderBottomWidth:1,
    flexDirection:'row',
    alignItems:'center'
  },
  avatarView:{
    height:55,
    width:55,
    borderRadius:50,
    backgroundColor:'lightgrey',
    marginRight:30,
  },
  avatarImage:{
    borderRadius:5,
    height:55,
    width:55,
    resizeMode:'cover'
  },
  usernameView:{
    flex:8
  },
  avatarAndUsernameMore:{
    flex:1,
  },
  setting:{
    marginTop:40,
    width:'100%',
  },
  settingItemView:{
    height:60,
    paddingLeft:12,
    paddingRight:12,
    backgroundColor:'white',
    borderBottomWidth:1,
    borderColor:'#f1f1f1',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  contactText:{

  },
  aboutText:{

  },
  contactText:{

  },
  rightMore:{
  }
});