import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, Image} from 'react-native';
import {ListItem, Input } from 'react-native-elements'
import axios from 'axios';
import News_Detail from './News_Detail';
import MenuButton from '../components/MenuButton'
import { ScrollView } from 'react-native-gesture-handler';

class Search extends React.Component { 
    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            Type: 'Search',
            input: '',
            inputError: '',
        };
        this.processData = this.processData.bind(this)
      }
    // componentDidMount() {
    //     axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=Business&apiKey=d8ee47eaa0b94b9ba97bbea8c3eb38ff`)
    //         .then(res => {
    //         const categories = res.data.articles;
    //         console.log(categories);
    //         this.setState({ categories, refreshing: false });
    //     }).catch(() => this.setState({ refreshing: false }))
    // } 
    /*static navigationOptions = {    
        title: 'Random User',  
    };*/  
    processData(){
        if (this.state.input == ""){
            this.setState({ inputError: "Your input should not be empty" });
        }
        else {
            axios.get('https://newsapi.org/v2/everything?q=' + this.state.input + '&apiKey=d8ee47eaa0b94b9ba97bbea8c3eb38ff')
      .then(res => {
        const categories = res.data.articles;
        console.log(this.state.input)
        console.log(categories);
        this.setState({ categories });
        })
        }
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
        const {navigate} = this.props.navigation;    
        return (           
            <View style={styles.Header}>
                <View style={{width: "100%", height: "13%", backgroundColor: 'white'}}>
                    <MenuButton navigation={this.props.navigation}/>
                    <Text style={styles.title}>🔍 SEARCH</Text>
                </View>
                <ScrollView>
                <View style={styles.container2}>
                    <Input style={{marginTop: '5%', marginBottom: '5%'}} onChangeText = {(values) =>{
                        this.setState({input : values});
                    }}
                    errorMessage = {this.state.inputError}
                    values = {this.state.input}
                    placeholder = 'Search news here'
                    />
                    <View style = {{width: "70%", marginLeft:50, marginTop:'5%', marginBottom: '10%'}}>
                        <Button color="#0080ff" 
                            title="🔍" onPress={this.processData}/>
                    </View>
                    <FlatList
                        keyExtractor={keyExtractor}
                        data={this.state.categories}
                        renderItem={renderItem}
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
    
export default Search;