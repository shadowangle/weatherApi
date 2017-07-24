import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  Picker,
} from 'react-native';

export default class Root extends Component {
    state = {
        units:'metric',
        cityName:'',
        list:[],
        indexUnit: 0,
        backColor:'#F5FCFF'
    };
    _handleName(event){
        console.log('it works!');
        this.setState({cityName: event.nativeEvent.text});
        var cityName = event.nativeEvent.text;
        var units = this.state.units;
         var id = '835222168225a662dbd978aac9f9c4b8';
        fetch('http://api.openweathermap.org/data/2.5/forecast?q='+cityName+'&units='+units+'&appid='+id)
        .then((response) => response.json())
        .then((responseJSON) => {
            console.log(responseJSON);
            this.setState({
                name : responseJSON.name,
                list: responseJSON.list,
            });
            console.log(this.state.list);
        })
        .catch((error) => {
            console.warn(error);
        });
    }
    _reload(itemValue){
        console.log('reload change unit');
         var cityName = this.state.cityName;
        var units = itemValue;
         var id = '835222168225a662dbd978aac9f9c4b8';
        fetch('http://api.openweathermap.org/data/2.5/forecast?q='+cityName+'&units='+units+'&appid='+id)
        .then((response) => response.json())
        .then((responseJSON) => {
            console.log(responseJSON);
            this.setState({
                name : responseJSON.name,
                list: responseJSON.list,
            });
            console.log(this.state.list);
        })
        .catch((error) => {
            console.warn(error);
        });
    }
  render() {
      var listWeather=[];
      var unitName;
      if(this.state.indexUnit==0){
          unitName = '°C';
      }else{
          unitName = '°F';
      }
       for (let i=0; i < this.state.list.length; i++) {
      listWeather.push(<Text>{this.state.list[i].dt_txt.slice()} : {this.state.list[i].weather[0].main} : {this.state.list[i].main.temp}{unitName} <Image source={{uri:"http://openweathermap.org/img/w/"+this.state.list[i].weather[0].icon+".png"}} style={{width:50,height:50}}></Image> {"\n"}</Text>)     
    }
    
    return (
      <View style={{flex: 1,
    alignItems: 'center',
    backgroundColor: this.state.backColor}}>
    <View style={{flexDirection:'row'}}>
    <Text style={{color:'red',fontSize:15,  height:30,width:200}}>background color</Text>
    <Text style={{color:'red',fontSize:15}}> choose Temperature</Text>
    </View>
    <View style={{flexDirection:'row'}}>
          <Picker style={{height:30,width:200}}
        selectedValue={this.state.backColor}
        onValueChange={(itemValue) => this.setState({backColor:itemValue})}>
         <Picker.Item label="Default" value="#F5FCFF" />
          <Picker.Item label="MAROON" value="#800000" />
           <Picker.Item label="FUCHSIA" value="#FF00FF" />
           <Picker.Item label="TEAL" value="#008080" />
        <Picker.Item label="RED" value="	#FF0000" />
        <Picker.Item label="SILVER" value="#C0C0C0" />
        </Picker>
        <Picker style={{height:30,width:200}}
        selectedValue={this.state.units}
        onValueChange={(itemValue, itemIndex) => {this.setState({units: itemValue,indexUnit:itemIndex});
        this._reload(itemValue);
        }}>
        <Picker.Item label="to celsius" value="metric" />
        <Picker.Item label="to fahrenheit" value="imperial" />
        </Picker>
        </View>
        <Text style={styles.welcome}>
      {this.state.cityName}
        </Text>
        
        

        <Text style={styles.instructions}>
            City Name
        </Text>
        <TextInput style={{width:400,height:50,borderWidth:1}} onSubmitEditing={(event) => this._handleName(event)}/>
      <Text style={{color:'black'}}>Time : Weather : Temperature</Text>  
      <ScrollView style={{width:400,height:30,borderWidth:1}}>
      <Text style={{fontSize:10 ,color:'black'}}>
        {listWeather}
        </Text>
        </ScrollView>
                    
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color:'black',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('bally', () => Root);

