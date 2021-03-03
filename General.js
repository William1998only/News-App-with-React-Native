         import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, Image} from 'react-native';
import {ListItem } from 'react-native-elements'
import axios from 'axios';
import News_Detail from './News_Detail';
import MenuButton from '../components/MenuButton'

class General extends React.Component { 
    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            Type: 'General',
            refreshing: true,
        };
      }
    componentDidMount() {
        axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=d8ee47eaa0b94b9ba97bbea8c3eb38ff`)
            .then(res => {
            const categories = res.data.articles;
            console.log(categories);
            this.setState({ categories, refreshing: false });
        }).catch(() => this.setState({ refreshing: false }))
    } 
   /* static navigationOptions = {    
        title: 'Random User',  
    };  */
    handleRefresh() {
        this.setState(
          {
            refreshing: true
        },
          () => this.componentDidMount()
        );
      }
    
    render() {  
        keyExtractor = (item, index) => index.toString()
        renderItem = ({ item }) => (
            <ListItem
                //button onPress={() => navigate('User',{Content: item.content, Title: item.title})}
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
        const {navigate} = this.props.navigation;    
        return (           
            <View style={styles.Header}>
                <View style={{width: "100%", height: "13%", backgroundColor: '#ffff00'}}>
                    <MenuButton navigation={this.props.navigation}/>
                    <Text style={styles.title}> 📰 GENERAL</Text>
                </View>
                <View style={styles.container2}>
                    <FlatList
                        keyExtractor={keyExtractor}
                        data={this.state.categories}
                        renderItem={renderItem}
                        refreshing={this.state.refreshing}
                        onRefresh={this.handleRefresh.bind(this)}
                    />
                </View>
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
    
export default General;