import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Button from '@ant-design/react-native/lib/button';
import Icon from '@ant-design/react-native/lib/icon';
// import SearchBar from '@ant-design/react-native/lib/search-bar';
import TabBar from '@ant-design/react-native/lib/tab-bar';
import DeviceInfo from 'react-native-device-info';

import NewsPage from './pages/NewsPage'
import TechPage from './pages/TechPage'
import FinPage from './pages/FinPage'
import SettingPage from './pages/SettingPage'

import {createStore} from 'redux'
import {Provider} from 'react-redux'

import reducers from './reducers/index'

let store = createStore(reducers)

class AppWrapper extends Component<Props> {
  constructor(){
    super();
    this.state = {
      selectedPage:'NewsPage',
      fitForIPhoneX:false,
      pageList:{
        NewsPage,
        TechPage,
        FinPage,
        SettingPage,
      }
    }
  }
  renderPage(pageName){
    return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
      {this.state.fitForIPhoneX?<View style={{height:45}}></View>:null}
        {pageName==='NewsPage'?<NewsPage />:(pageName=='FinPage'?<FinPage />:(pageName=='TechPage'?<TechPage />:<SettingPage/>))}
      </View>
      )
  }
  onChangePage(pageName){
    console.log(pageName)
    if(pageName == this.state.selectedPage){
      console.log(`tap page:${pageName} twice!`)
    }
    this.setState({
      selectedPage:pageName,
    })
  }
  componentDidMount(){
    let deviceInfo = {
      model: DeviceInfo.getModel(),
      name: DeviceInfo.getDeviceName(),
      sysName: DeviceInfo.getSystemName(),
      sysVersion: DeviceInfo.getSystemVersion()
    }
    if(deviceInfo.model=='iPhone X'){
      this.setState({
        fitForIPhoneX:true
      })
    }
    console.log(deviceInfo);
  }
  render() {
    return (
      <TabBar
        unselectedTintColor="grey"
        tintColor="black"
        barTintColor="#fff"
      >
        <TabBar.Item
          title="新闻"
          icon={<Icon name="global" />}
          selected={this.state.selectedPage === 'NewsPage'}
          onPress={() => this.onChangePage('NewsPage')}
        >
          {this.renderPage('NewsPage')}
        </TabBar.Item>
        <TabBar.Item
          icon={<Icon name='stock' />}
          title="财经"
          badge={0}
          selected={this.state.selectedPage === 'FinPage'}
          onPress={() => this.onChangePage('FinPage')}
        >
          {this.renderPage('FinPage')}
        </TabBar.Item>
        <TabBar.Item
          icon={<Icon name="apple" />}
          title="科技"
          selected={this.state.selectedPage === 'TechPage'}
          onPress={() => this.onChangePage('TechPage')}
        >
          {this.renderPage('TechPage')}
        </TabBar.Item>
        <TabBar.Item
          icon={<Icon name="user" />}
          title="设置"
          selected={this.state.selectedPage === 'SettingPage'}
          onPress={() => this.onChangePage('SettingPage')}
        >
          {this.renderPage('SettingPage')}
        </TabBar.Item>
      </TabBar>
    );
  }
}
export default class App extends Component<Props> {
  render(){
    return (
       <Provider store={store}>
        <AppWrapper/>
       </Provider>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
