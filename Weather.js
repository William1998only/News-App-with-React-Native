import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, Image} from 'react-native';
import {ListItem, Card } from 'react-native-elements'
import axios from 'axios';
import News_Detail from './News_Detail';
import MenuButton from '../components/MenuButton'
import { ScrollView } from 'react-native-gesture-handler';

class Weather extends React.Component { 
    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            weather: [],
            Type: 'Weather',
            //refreshing: true,
            refreshing: true,
        };
      }
    componentDidMount() {
        axios.get(`https://newsapi.org/v2/everything?q=weather&apiKey=d8ee47eaa0b94b9ba97bbea8c3eb38ff`)
            .then(res => {
            const categories = res.data.articles;
            console.log(categories);
            this.setState({ categories, refreshing: false });
        }).catch(() => this.setState({ refreshing: false }))
        axios.get(`https://api.openweathermap.org/data/2.5/group?id=524901,703448,2643743,1642911,6356055,3169070,5128594,6455259,1850692,5172078,1788269,
        6621316,6460657,3913271,3455223,4281323,4400427,4687151,4664170,&units=metric&appid=86fece80e38eb2da04e7115a9a195c1e`)
            .then(res => {
            const weather = res.data.list;
            console.log(weather);
            this.setState({ weather, refreshing: false });
        }).catch(() => this.setState({ refreshing: false }))
    } 
    /*static navigationOptions = {    
        title: 'Random User',  
    };*/  
    handleRefresh() {
        this.setState(
          {
            //refreshing: true,
            refreshing: true,
        },
          () => this.componentDidMount()
        );
      }
    
    render() {  
        keyExtractor = (item, index) => index.toString()
        renderItem = ({ item }) => (
          <ListItem
            button onPress={() => this.props.navigation.navigate('News_Detail',{Content: item.content, 
                Title: item.title, 
                Url: item.url, 
                Type: this.state.Type,
                Image: item.urlToImage,
                Source: item.source.name,
                Author: item.author})}
            title={
                <View>
                    <Image
                        style={{width: 300, height: 200}}
                        source={{uri: item.urlToImage}}
                    />
                    <Text style={{fontSize: 16, fontWeight:'bold'}}>{item.title}</Text>
                </View>
            }
            subtitle={
                <View>
                    <Text></Text>
                    <Text>{item.description}</Text>
                    <Text></Text>
                    <Text style={{fontSize:12}}>{item.publishedAt} || {item.author} - {item.source.name}</Text>
                </View>
            }
            //leftAvatar={{ size: "large", rounded: false, source: { uri: item.urlToImage } }}
            //subtitle={item.description}
            bottomDivider
          />
        )
        renderWeather = ({ item }) => (
            <Card>
            <ListItem
              /*button onPress={() => this.props.navigation.navigate('User',{Content: item.content, 
                  Title: item.title, 
                  Url: item.url, 
                  Type: this.state.Type,
                  Image: item.urlToImage,
                  Source: item.source.name,
                  Author: item.author})}*/
              title={ <View>
                            <Text style={{fontSize: 20, fontWeight:'bold'}}>{item.name}</Text>
                        </View>
                    }
              subtitle={
                  <View>
                      <Text></Text>
                      <Text style={{fontSize: 16}}>{/*<Image
                        style={{width: 30, height: 30}}
                        source={{uri: 'http://openweathermap.org/img/wn/' + item.weather[0].icon + '@2x.png'}}
                      />*/} {item.weather[0].description} || {item.main.temp}°C</Text>
                      <Text></Text>
                      {//<Text style={{fontSize:12}}>{item.publishedAt} || {item.author} - {item.source.name}</Text>
                      }
                  </View>
              }
              leftAvatar={{ size: 'large', source: { uri: 'http://openweathermap.org/img/wn/' + item.weather[0].icon + '@2x.png' } }}
              /*subtitle={
                  <View>
                      <Text></Text>
                      <Text>{item.description}</Text>
                      <Text></Text>
                      <Text style={{fontSize:12}}>{item.publishedAt} || {item.author} - {item.source.name}</Text>
                  </View>
              }
              //leftAvatar={{ size: "large", rounded: false, source: { uri: item.urlToImage } }}
              //subtitle={item.description}
            */
              chevron
            />
            </Card>
          )
        const {navigate} = this.props.navigation;    
        return (           
            <View style={styles.Header}>
                <View style={{width: "100%", height: "13%", backgroundColor: '#808080'}}>
                    <MenuButton navigation={this.props.navigation}/>
                    <Text style={styles.title}>☁️ WEATHER</Text>
                </View>
                <ScrollView>
                    <View style={styles.container2}>
                        <FlatList
                            keyExtractor={keyExtractor}
                            data={this.state.weather}
                            renderItem={renderWeather}
                            refreshing={this.state.refreshing}
                            onRefresh={this.handleRefresh.bind(this)}
                            horizontal
                        />
                        <FlatList
                            keyExtractor={keyExtractor}
                            data={this.state.categories}
                            renderItem={renderItem}
                            refreshing={this.state.refreshing}
                            onRefresh={this.handleRefresh.bind(this)}
                        />
                    </View>
                </ScrollView>
            </View>     
            );  
        }}

const styles = StyleSheet.create({
    Header: {
        flex:1,
    },
    title: {
        top: "10%",
        left: "22%",
        fontSize: 18
    },
    text1: {
        marginLeft: 10,
        marginTop: 5
    },
    container2: {
        flex: 2,
        backgroundColor: 'white',
        //paddingTop: 40
    },
    });
    
export default Weather;