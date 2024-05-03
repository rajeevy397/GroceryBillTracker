import React from 'react';
import { StyleSheet,Text, View, Image } from 'react-native';

const FallBack = () => {
  return (
    <View style={{ alignItems:'center' }}>
      <Image
        source={require('../../assets/NoExp.png')}
        style={{ height: 300, width: 300 }}
      />
      <Text>Start Adding your Expenditure</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default FallBack;
