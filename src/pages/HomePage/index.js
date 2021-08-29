import React from 'react';
import { Button, View, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';

const HomePage = () => {
  const navigation = useNavigation();

  const navigateFunc = () => {
    navigation.navigate('Camera');
  }

  return (
    <View>
      <Text>Home</Text>
      <Button onPress={navigateFunc} >To Cam</Button>
    </View>
  );
};

export default HomePage;
