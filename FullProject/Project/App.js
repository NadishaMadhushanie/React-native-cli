/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  FlatList,
  StatusBar,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';

/*import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';*/

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import axios from 'axios';

class HomeScreen extends Component {
  constructor() {
    super()
    this.state = {
      dataSource: [],     //storage for fethched data
      isLoading: true,
      name: 'Bruno Mars', //default searching name
    }
  }

  //send data to database
  /*
    clickPost= ({ item}) => { 
      var url = 'http://192.168.8.153:3000/data';
  
      axios.post(url, {
        ArtistName: item.ArtistName,
        CollectionName: item.CollectionName,
        TrackName: item.TrackName,
        ArtWorkUrl: item.ArtWorkUrl,
        TrackPrice: item.TrackPrice,
        ReleaseDate: item.ReleaseDate
  
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
        
    };
    */

  //flatlist items are displayed 
  renderItem = ({ item }) => {

    return (

      <View>
        <TouchableOpacity style={{ flex: 1, flexDirection: 'row', marginBottom: 3 }}
          //onPress={() => ToastAndroid.show(item.artistName, ToastAndroid.SHORT)}
          onPress={() => this.props.navigation.navigate('DetailsScreen')}
        >

          <Image style={{ width: 80, height: 80, margin: 5 }}
            source={{ uri: item.artworkUrl100 }} />
          <View style={{ flex: 1, justifyContent: 'center', marginLeft: 5 }}>
            <Text style={{ fontSize: 18, color: 'green', marginBottom: 15 }}>
              {item.artistName}
            </Text>
            <Text style={{ fontSize: 16, color: 'red', marginBottom: 5 }}>
              {item.collectionName}
            </Text>
            <Text style={{ fontSize: 16, color: 'blue', marginBottom: 5 }}>
              {item.trackCensoredName}
            </Text>
            <Text style={{ fontSize: 16, color: 'brown', marginBottom: 5 }}>
              {item.artworkUrl60}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: 'blue', borderRadius: 10,
              flex: 1, width: 30, height: 40, margin: 10,
              flexDirection: 'row', justifyContent: 'center',
              alignItems: 'center'
            }}
          //onPress={this.clickPost.bind(this)}

          >
            <Text style={{ fontSize: 15, color: 'white', fontWeight: 'bold' }}>
              SAVE
          </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    )

  }

  //separate the flatlist item using a line
  renderSeparator = () => {
    return (
      <View
        style={{ height: 2, width: '100%', backgroundColor: 'black' }}>
      </View>
    )
  }

  //fetch data according to the singer name
  componentDidMount() {
    //const url = 'https://itunes.apple.com/search?term=Bruno+Mars&offset=25&limit=25'
    //const url = 'https://itunes.apple.com/search?term='+this.state.name+'&offset=25&limit=25'
    const url = 'https://itunes.apple.com/search?&term=' + this.state.name + '&entity=song&offset=25&limit=25'
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson.results,
          isLoading: false
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  //updated searching singer details are loaded
  componentDidUpdate(prevState) {
    //const url = 'https://itunes.apple.com/search?term=Bruno+Mars&offset=25&limit=25'
    //const url = 'https://itunes.apple.com/search?term='+this.state.name+'&offset=25&limit=25'
    if (this.state.name !== prevState.name) {
      const url = 'https://itunes.apple.com/search?&term=' + this.state.name + '&entity=song&offset=25&limit=25'
      fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            dataSource: responseJson.results,
            isLoading: false
          })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }


  render() {

    const filteredData = this.state.name
      ? this.state.dataSource.filter(x =>
        x.artistName.toLowerCase().includes(this.state.name.toLowerCase())
      )
      : this.state.dataSource;

    return (
      this.state.isLoading
        ?
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#330066" animating />
        </View>
        :
        <>


          <View style={{ padding: 5 }}>
            <TextInput
              //searchable text box
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              placeholder="Search Artist"
              onChangeText={text => this.setState({ name: text })}
              value={this.state.name}
            />
          </View>


          <View style={styles.container}>
            <FlatList
              // flatlist
              data={filteredData}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={this.renderSeparator}
            />
          </View>

        </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
})


//Details Screen

class DetailsScreen extends Component {
  constructor() {
    super();
    this.state = {
      datastore: [],
    };
  }

  //fetch data
  clickGet() {
    var url = 'http://192.168.8.153:3000/data';
    axios.get(url)
      .then((Data) => {
        console.log(Data.data);
        this.setState({
          datastore: Data.data,
        })
      })
  };

  render() {

    const dataMongo = this.state.datastore.map((item, index) => {
      var array = [' ArtistName: ', item.ArtistName, '\n\n CollectionName: ', item.CollectionName, '\n\n TrackName: ', item.TrackName, '\n\n ArtWorkUrl: ', item.ArtWorkUrl, '\n\n TrackPrice: ', item.TrackPrice, '\n\n ReleaseDate: ', item.ReleaseDate].join(' ');
      return <Text style={{ fontSize: 20, fontWeight: 'bold' }} key={index}>{array}</Text>;
    })


    return (

      <ScrollView>
        <View>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>

            <Text style={{ marginTop: 20, fontSize: 25, fontWeight: 'bold', color: 'green' }}>
              ♥ ARTISTS DETAILS ♥
          </Text>

          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

            <TouchableOpacity
              style={{
                backgroundColor: 'blue', borderRadius: 10,
                flex: 1, width: 100, height: 50, margin: 20,
                flexDirection: 'row', justifyContent: 'center',
                alignItems: 'center'
              }}
              onPress={this.clickGet.bind(this)}
            >
              <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>
                VIEW
            </Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            {dataMongo}
          </View>

        </View>
      </ScrollView>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    DetailsScreen: DetailsScreen
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(AppNavigator);
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

