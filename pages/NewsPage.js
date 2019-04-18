import React, {Component} from 'react';
import { connect } from 'react-redux'
import {StyleSheet, Text, View, ScrollView,RefreshControl,TouchableOpacity} from 'react-native';
import axios from 'axios';
import PropTypes from 'prop-types'

import Toast from '@ant-design/react-native/lib/toast';
// import ListView from '@ant-design/react-native/lib/list-view';
import Icon from '@ant-design/react-native/lib/icon';

class NewsPage extends Component {
  static propTypes = {
    collectionIds:PropTypes.array
  }
  constructor(props){
    super(props);
    this.state = {
      newsPageApi:'https://api.readhub.cn/news',
      fitForIPhoneX:false,
      dataSource:[],
      whichContentIsPressed:'',
      isRefreshing:false
    }
  }
  updateContent(){
    console.log('updateContent')
    let api = this.state.newsPageApi;
    axios.get(api)
    .then(res=>{
      let {status,data} = res;
      if(status!=200){
        console.log('error')
        Toast.fail('请求失败',1)
      }
      data = data.data;
      this.setState({
        dataSource:data
      })
      Toast.success('请求成功',1)
    })
    .catch(err=>{
      console.log(err)
    })
  }
  componenetDidUpdate(){
    console.log('NewsPage componenetDidUpdate')
    this.updateContent();
  }
  componentDidMount(){
    console.log('NewsPage componentDidMount')
    this.updateContent();
  }
  handleSwitchCollecton(color){
    console.log('handleSwitchCollecton')
    if(this.props.onClickCollectButton){
      this.props.onClickCollectButton(color)
    }
  }
  renderItem(){
    let rowData = this.state.dataSource;
    let res = [];
    rowData.forEach((data,index)=>{
      res.push(
        <View key={index} style={{flexDirection:'row',width:'auto'}}>
          <View style={[styles.rowItem,index==rowData.length-1?{marginBottom:45,borderBottomWidth:0}:{}]}>
          <TouchableOpacity activeOpacity={0.5}>
            <Text onPress={this.handleSwitchCollecton.bind(this,index)} style={styles.title}>{data.title}</Text>
          </TouchableOpacity>
            <Text ref={(t)=>{this.ref=t}} onPress={(event)=>{
              console.log(index)
              if(this.state.whichContentIsPressed === index){
                this.setState({whichContentIsPressed:false})
              }else{
                this.setState({
                  whichContentIsPressed:index
                })
              }
              }} style={[data.summary==''?{display:'none'}:{},styles.summary,index===this.state.whichContentIsPressed?{height:'auto'}:{height:30}]}>{data.summary}</Text>
          </View>
        </View>
      )
    })
    return res;
  } 
  _onRefresh(){
    this.setState({
        isRefreshing: true
    });
    //间隔2秒结束下拉刷新
    this.updateContent()
    setTimeout(()=>{
      this.setState({
          isRefreshing: false,
      })
    }, 1500);
  }
  render() {
    return (
      <View>
        <Text style={styles.header}>
        新闻
        </Text>
         <ScrollView refreshControl={
          <RefreshControl refreshing={this.state.isRefreshing}
                          onRefresh={this._onRefresh.bind(this)}
                          tintColor="grey"
                          title="加载中..."
                          titleColor="grey"
                          />}>
         {this.renderItem()}
         </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = (state) =>{
  return {
    collectionIds:state.collectionIds
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onClickCollectButton: (id) => {
      dispatch({ type: 'ID_COLLECT', id: id })
    },
    onClickUnCollectButton: (id) => {
      dispatch({ type: 'ID_UNCOLLECT', id: id })
    }
  }
}

NewsPage = connect(mapStateToProps,mapDispatchToProps)(NewsPage)

export default NewsPage;
const styles = StyleSheet.create({
  header:{
    marginTop:20,
    marginBottom:5,
    fontWeight:'500',
    fontSize:24,
    color:'black',
    textAlign:'center'
  },
  rowItem:{
    justifyContent:'flex-start',
    alignItems:'flex-start',
    flexDirection:'column',
    padding:10,
    borderBottomWidth:1,
    borderStyle:'solid',
    borderColor:'#f1f1f1',
  },
  title:{
    fontWeight:'400',
    fontSize:20,
    margin:5,
    marginBottom:10,
    color:'black',
  },
  summary:{
    fontWeight:'100',
    lineHeight:26,
    fontSize:18,
    color:'black',
    opacity:0.7,
    flexWrap:'wrap',
    margin:5,
    letterSpacing:1
  },
});