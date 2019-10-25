import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, Button,TouchableOpacity,AsyncStorage, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationEvents } from 'react-navigation';
import { LinearGradient } from 'expo-linear-gradient';
import CityFavoris from '../components/CityFavoris';

class FavoritesPage extends React.Component{

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Favoris',
            headerRight: (
                <Icon style={{marginTop:8, marginRight:20}} name="plus-circle" 
                    size={30} color="white" onPress={() => FavoritesPage.onPressFav(navigation)}/>
            )
        }
    };

    static onPressFav(navigation) {
        if (FavoritesPage.count < 15){
            navigation.push('AddFavorites')
        }
        else{
            alert("Vous ne pouvez pas avoir plus de 15 villes favorites")
        }
    }

    static  count = 0 

    state = { cities: [], refreshing: true }

    onRefresh(){
        if (AsyncStorage.getItem('city') != null){
            this.setState({refreshing:true})
            AsyncStorage.getItem('city').then((data) => {
                this.setState({ cities: JSON.parse(data), refreshing: false })
                FavoritesPage.count = this.state.cities.length;
            });
        }else{
            FavoritesPage.count = 0;
        }
    }

    deleteCity(cityname){
        let tab = [...this.state.cities];
        console.log(cityname)
        console.log(JSON.stringify(tab))
        tab.splice(tab.findIndex(e => e.name === cityname), 1);
        console.log(tab)
        AsyncStorage.setItem('city', JSON.stringify(tab)).then(()=>{
            this.setState({cities: tab})
        })
        FavoritesPage.count -= 1;
    }

    suppFav(){
        AsyncStorage.removeItem('city').then(() => {
            this.setState({
                cities : []
            })
            this.onRefresh();
            FavoritesPage.count = 0;
        });

    }

    componentDidMount(){
        this.onRefresh()
    }

    componentDidUpdate(){
    }
      
    render(){
        return(
            this.state.cities !== null && this.state.cities.length != 0 ? (
                <View style={{flex:1}}>
                    <NavigationEvents onDidFocus={() => this.onRefresh()} />
                    <LinearGradient colors={['#9edffb','#4478a2']} style={{flex:1}}>
                    <FlatList
                        data={this.state.cities}
                        renderItem={({ item }) => 
                            <CityFavoris key={item.name} tab={item} onDelete={(tab) => this.deleteCity(tab)}></CityFavoris>
                        }
                        ItemSeparatorComponent={this.renderSeparator}
                        keyExtractor={(item, index) => index.toString()}
                        refreshControl={
                            <RefreshControl
                              //refresh control used for the Pull to Refresh
                              refreshing={this.state.refreshing}
                              onRefresh={() => this.onRefresh()}
                            />
                        }
                    />
                    </LinearGradient>
                    <Button title="Supprimer tout les favoris" onPress={() => this.suppFav()}/>
                </View>
            ):(
            <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
                <NavigationEvents onDidFocus={() => this.onRefresh()} />
                <Text>Vous n'avez pas de favoris :'(</Text>
            </View>
            )
        );
    }

    renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "#CED0CE"
            }}
          />
        );
      };
}

export default FavoritesPage;