import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, Button, Linking } from 'react-native';
import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {ListItem } from 'react-native-elements'
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

export default class News_Detail extends React.Component {  
    constructor(props) {
        super(props)
        this.state = {
            icon: '<',
            Content: this.props.navigation.state.params.Content,
            Title: this.props.navigation.state.params.Title,
            URL: this.props.navigation.state.params.Url,
            Type: this.props.navigation.state.params.Type,
            Image: this.props.navigation.state.params.Image,
            Source: this.props.navigation.state.params.Source,
            Author: this.props.navigation.state.params.Author,
            Space: ' ',
            News: [],
            More: '',
            categories: [],
        };
        this.Back = this.Back.bind(this)
      }
    componentDidMount() {
        axios.get(`https://newsapi.org/v2/top-headlines?pageSize=5&sources=` + this.state.Source + `&apiKey=d8ee47eaa0b94b9ba97bbea8c3eb38ff`)
            .then(res => {
            const News = res.data.articles;
            if (News.length != 0)
            {
                this.setState({More : 'More From ' + this.state.Source})
                this.setState({ News });
            }
        })
        axios.get(`https://newsapi.org/v2/top-headlines?country=us&pageSize=8&category=general&apiKey=d8ee47eaa0b94b9ba97bbea8c3eb38ff`)
            .then(res => {
            const categories = res.data.articles;
            console.log(categories);
            this.setState({ categories });
        })
    } 
    Back(){
        this.props.navigation.navigate(this.state.Type)
        //this.props.navigation.navigate('General')
    }
    render() {    
        keyExtractor = (item, index) => index.toString()
        renderItem = ({ item }) => (
                <ListItem
                button onPress={() => Linking.openURL(item.url)} 
                /*    Title: item.title, 
                    Url: item.url, 
                    Type: this.state.Type,
                    Image: item.urlToImage,
                    Source: item.source.name,
                    Author: item.author})}*/
                title={ item.title }
                leftAvatar={{ size: 'medium', rounded: false, source: { uri: item.urlToImage } }}
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
                bottomDivider
                chevron
                />
          )
          renderGeneral = ({ item }) => (
            <ListItem
            button onPress={() => Linking.openURL(item.url)} 
            /*    Title: item.title, 
                Url: item.url, 
                Type: this.state.Type,
                Image: item.urlToImage,
                Source: item.source.name,
                Author: item.author})}*/
            title={ item.title }
            leftAvatar={{ size: 'medium', rounded: false, source: { uri: item.urlToImage } }}
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
            bottomDivider
            chevron
            />
      )
        return (      
            <View style={styles.container}> 
                <View style={{width: "100%", height: "13%", backgroundColor: 'white', borderBottomColor: 'black', borderBottomWidth: 1}}>
                    <Text style={{paddingTop:'5%', fontSize: 50, paddingLeft: '5%'}}onPress={this.Back}>{this.state.icon}</Text>
                </View>
                <ScrollView>
                    <Text style={{fontSize:20, fontWeight: 'bold', paddingBottom: '5%', paddingLeft: '5%', paddingRight: '5%'}}> {this.state.Title} </Text>
                    <Text style={{paddingBottom: '5%', paddingLeft: '5%', paddingRight: '5%'}}>{this.state.Author} - {this.state.Source} </Text>
                    <Text style={{paddingBottom: '5%', paddingLeft: '5%', paddingRight: '5%'}}>
                        <Image style={{width: 25, height: 25, marginLeft: '5%'}} source={{uri:"https://image.flaticon.com/icons/png/512/145/145802.png"}}/> {this.state.Space}
                        <Image style={{width: 25, height: 25, marginLeft: '5%'}} source={{uri:"https://image.flaticon.com/icons/png/512/733/733585.png"}}/> {this.state.Space}
                        <Image style={{width: 25, height: 25, marginLeft: '5%'}} source={{uri:"https://image.flaticon.com/icons/png/512/733/733558.png"}}/> {this.state.Space}
                        <Image style={{width: 25, height: 25, marginLeft: '5%'}} source={{uri:"https://image.flaticon.com/icons/png/512/281/281769.png"}}/> {this.state.Space}
                    </Text>
                    <Image
                        style={{width: 300, height: 200, marginLeft: '5%'}}
                        source={{uri: this.state.Image}}
                    />
                    <Text style={{paddingTop: '5%', paddingLeft: '5%', paddingRight: '5%'}}> {this.state.Content} <Text onPress={() => Linking.openURL(this.state.URL)} style={{color: 'blue'}}> VIEW MORE... </Text></Text>
                    <Text style={{paddingTop:'5%', fontSize:16, fontWeight: 'bold', paddingBottom: '5%', paddingLeft: '5%', paddingRight: '5%'}}>{this.state.More}</Text>
                    <FlatList
                        keyExtractor={keyExtractor}
                        data={this.state.News}
                        renderItem={renderItem}
                    />
                    <Text style={{paddingTop:'5%', fontSize:16, fontWeight: 'bold', paddingBottom: '5%', paddingLeft: '5%', paddingRight: '5%'}}>Read More</Text>
                    <FlatList
                        keyExtractor={keyExtractor}
                        data={this.state.categories}
                        renderItem={renderGeneral}
                    />
                </ScrollView>
            </View>    
        );  
    }}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //paddingTop: '10%',
        //paddingLeft: '5%',
        //paddingRight: '5%'
    },
    });
