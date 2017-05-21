/**
 * Sample React Native App for Effect-Views
 * https://github.com/hunghkit/effect-views/example
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  AppRegistry,
} from 'react-native';

import { rippleView, RippleView } from 'effect-views';

export default class example extends Component {
  renderItem(index) {
    return (
      <RippleView
        key={index}
        style={styles.item}
      >
        <Text>{index}</Text>
      </RippleView>
    )
  }

  render() {
    const Button = rippleView(View, { color: 'red' });

    return (
      <View style={styles.container}>
        {[...new Array(10)].map((_, index) => this.renderItem(index))}
        <RippleView style={styles.btn}>
          <Text>RippleView</Text>
        </RippleView>
        <Button style={styles.btn}>
          <Text>Overlay red</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#F5FCFF',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  btn: {
    margin: 4,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#4CAF50',
  },
});
