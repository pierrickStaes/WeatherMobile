import React from 'react';
import { TextInput, Text, View, Image, FlatList, Button,TouchableOpacity,AsyncStorage } from 'react-native';
import { ListItem } from 'react-native-elements';
import Loading from '../components/Loading';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import {getWeatherService} from '../actions/weatherServiceAction'

class AddFavoritesPage extends React.Component{

    static navigationOptions = {
        title: 'Ajouter une ville'
    };

    state = {text: ''};

    saveAndGoBack(){
        let base = null;

        this.props.weather.paylord.getWeatherHome(this.state.text).then((resp) =>{
            base = resp.data
            AsyncStorage.getItem('city').then(data => {       
                let tab=[];
                if(data != null){
                    tab = JSON.parse(data);
                }
                tab.push({name: base.name})
                AsyncStorage.setItem('city', JSON.stringify(tab)).then(()=>{
                        this.props.navigation.goBack();
                    }
                ).catch((err) => {
                    alert(err);
                })
            })
        }).catch (error => {
            alert(`Cette ville n'existe pas en France`)
        })
    }
    /* 2eme facon de faire ce qu'il y a au dessus
    
    onPassAddAsync = async () => {
        await AsyncStorage.setItem('city',[this.state.text]);
        this.props.navigation.goBack();
    }*/
      
    render(){
        return(
            <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
                <View
                    style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#CED0CE",
                    marginBottom: 5
                    }}
                />
                <TextInput
                style={height=40}
                placeholder="Entrez votre ville ici"
                onChangeText={(text) => this.setState({text})}
                maxLength={20}
                clearButtonMode='always'
                textAlign={'center'}
                
                />
                <View
                    style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#CED0CE",
                    marginTop:5,
                    marginBottom:10
                    }}
                />
                <Button
                    title="Ajouter la ville"
                    color="#7cbac2"
                    onPress={() => this.saveAndGoBack()}
                />
            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        weather: dispatch(getWeatherService())
    };
}

const mapStateToProps = state => {
    return { weather: state.weather };
};

export default connect(mapStateToProps,mapDispatchToProps)(AddFavoritesPage);