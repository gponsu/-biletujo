import React from 'react';
import Intl from 'intl';
import 'intl/locale-data/jsonp/en-US.js';

import { Button, FlatList, StyleSheet, Text, View } from 'react-native';

const holdings = [
  { key: 1, currency: 'BTC', amount: 0.126778, price: 8847.86, change: -0.0033 },
  { key: 2, currency: 'ETH', amount: 2.68, price: 905.22, change: -0.0369 },
  { key: 3, currency: 'XRP', amount: 370, price: 0.891485, change: 0.0214 },
  { key: 4, currency: 'BCH', amount: 0.1, price: 1207.49, change: 0.0164 },
  { key: 5, currency: 'ADA', amount: 3500, price: 0.422626, change: 0.1009 }
];

const PortfolioBalance = () => (
  <View style={styles.portfolio}>
    <Text style={[styles.text, styles.title]}>PORTFOLIO BALANCE</Text>
    <Text style={[styles.text, styles.balance]}>$2,098.56</Text>
    <Text style={[styles.text, styles.change]}>-15.98%</Text>
  </View>
);

const Holdings = () => (
  <View style={styles.holdings}>
    <FlatList
      data={holdings}
      renderItem={({item}) => <Item item={item}/>}
    />
  </View>
);

const Item = ({ item }) => {
  const currencyFormatter = new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "USD"
    }
  );
  const percentageFormatter = new Intl.NumberFormat(
    "en-IN",
    {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }
  );
  const price  = currencyFormatter.format(item.price);
  const value = currencyFormatter.format(item.amount * item.price);
  const change = percentageFormatter.format(item.change);

  return (
    <View style={styles.item}>
      <View style={styles.child}>
        <Text style={styles.huge}>{item.currency}</Text>
        <Text style={styles.tiny}>{price}</Text>
      </View>
      <View style={[styles.child, styles.middle]}>
        <Text style={styles.huge}>{value}</Text>
        <Text style={styles.tiny}>{item.amount}</Text>
      </View>
      <View style={[styles.child, styles.last]}>
        <Text>{change}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  child: {
    flexGrow: 1,
    flexDirection: 'row',
    backgroundColor: 'red'
    // minWidth: 100
  },
  middle: {
    justifyContent: 'center'
  },
  last: {
    justifyContent: 'flex-end'
  },
  huge: {
    fontWeight: 'bold',
    fontSize: 16
  },
  tiny: {
    fontSize: 12,
    opacity: 0.5
  },
  item: {
    padding: 14,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#afb7bb'
  },
  container: {
    backgroundColor: "#fdfffc",
    flex: 1
  },
  portfolio: {
    paddingBottom: 16,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#011627',
  },
  holdings: {
    flex: 4
  },
  text: {
    color: '#fdfffc'
  },
  title: {
    fontSize: 14,
    marginBottom: 8
  },
  balance: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  change: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default HomeScreen = ({ navigation }) => (
  <View style={styles.container}>
    <PortfolioBalance />
    <Holdings />

    {/* <Button
      onPress={() => navigation.navigate('Details')}
      title="Go to details"
    /> */}
  </View>
);
