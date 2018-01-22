import React from 'react';
import { Button, FlatList, AsyncStorage, StyleSheet, Text, TextInput, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

const data = [
  { name: 'Bitcoin',  symbol: 'BTC', key: 'BTC' },
  { name: 'Etherium', symbol: 'ETH', key: 'ETH' },
  { name: 'Litecoin', symbol: 'LTC', key: 'LTC' },
  { name: 'Cardano',  symbol: 'ADA', key: 'ADA' },
  { name: 'Tron',     symbol: 'TRX', key: 'TRX' },
  { name: 'Verge',    symbol: 'XVG', key: 'XVG' },
  { name: 'Ripple',   symbol: 'XRP', key: 'XRP' },
  { name: 'Stellar',  symbol: 'XLM', key: 'XLM' }
]

class Portfolio extends React.Component {
  static navigationOptions = {
    title: 'Biletujo',
    headerLeft: null,
    headerStyle: {
      backgroundColor: 'lime'
    }
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View>
        <FlatList
          data={this.props.screenProps.trades}
          renderItem={({item}) => <Text>{item.currency}-{item.price}-{item.amount}-{item.fee}</Text>}
        />

        <Button
          onPress={() => navigate('Search')}
          title="Add trade"
          rounded={true}
        />
      </View>
    );
  }
}

class SearchCoin extends React.Component {
  static navigationOptions = {
    title: 'Select coin',
  };

  constructor(props) {
    super(props);

    this.state = {
      dataSource: data
    };
  }

  SearchCoin = (text) => {
    const newData = data.filter((coin) => {
      const coinName = coin.name.toUpperCase();
      const coinSymbol = coin.symbol.toUpperCase();
      const textData = text.toUpperCase();

      return coinName.indexOf(textData) > -1 || coinSymbol.indexOf(textData) > -1;
    });

    this.setState({
      dataSource: newData
    });
  }

  handlePress = (item) => {
    const { navigate } = this.props.navigation;
    navigate('AddTrade', { currency: item.symbol });
  }
  
  render() {
    return (
      <View style={styles.container}>
        <TextInput 
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.SearchCoin(text)}
          underlineColorAndroid='transparent'
          placeholder="Search Here"
        />

        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text onPress={() => this.handlePress(item)}>{item.name}</Text>}
        />
      </View>
    );
  }
}

class AddTrade extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currency: '',
      price: 0, 
      amount: 0, 
      fee: 0
    };
  }

  componentDidMount() {
    let currency = this.props.navigation.state.params.currency;

    this.setState({ currency });
  }

  handleSave = () => {
    const { navigate } = this.props.navigation;
    this.props.screenProps.onSave(this.state);
    navigate('Portfolio');
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput 
          style={{height: 40, width: 300}}
          onChangeText={(price) => this.setState({ price: price })}
          underlineColorAndroid='aliceblue'
          keyboardType={'numeric'}
          placeholder="Price"
        />
        <TextInput 
          style={{height: 40, width: 300}}
          onChangeText={(amount) => this.setState({ amount: amount })}
          underlineColorAndroid='aliceblue'
          keyboardType={'numeric'}
          placeholder="Amount"
        />
        <TextInput 
          style={{height: 40, width: 300}}
          onChangeText={(fee) => this.setState({ fee: fee })}
          underlineColorAndroid='aliceblue'
          keyboardType={'numeric'}
          placeholder="Fee"
        />
        
        <Button
          onPress={() => this.handleSave()}
          title="Save transaction"
        />
      </View>
    )
  }
}

export const Router = StackNavigator({
  Portfolio: { screen: Portfolio },
  Search: { screen: SearchCoin },
  AddTrade: { screen: AddTrade }
});


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.state = { trades: [] }
  }

  async componentDidMount() {
    let response = await AsyncStorage.getItem('trades');
    let trades = await JSON.parse(response) || []; 

    this.setState({ trades: trades });
  }

  async handleSave(trade) {
    const trades =  [...this.state.trades, trade];

    await AsyncStorage.setItem('trades', JSON.stringify(trades));
    this.setState({ trades: trades });
  }

  render() {
    return <Router 
      screenProps={{onSave: this.handleSave, trades: this.state.trades}}
    />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});