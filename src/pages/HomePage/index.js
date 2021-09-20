import React from 'react';
import { Box, Heading, View } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'

const HomePage = () => {
  const navigation = useNavigation();

  const navigateFunc = () => {
    navigation.navigate('RecordPage');
  }

  return (
    <View
      display='flex'
      flexDirection='column'
      justifyContent='center'
      bgColor='#eefffd'
      alignItems='center'
      h='100%'
    >
      <Heading
        style={{
          textShadowColor: 'rgba(0, 0, 0, 0.75)',
          textShadowOffset: { width: -1, height: 1 },
          textShadowRadius: 10
        }}
        fontSize={70}
        mb={5}
        fontFamily='cursive'
        w='100%'
        textAlign='center'
      >
        EKYC
      </Heading>
      <TouchableOpacity onPress={navigateFunc}>
        <Box shadow={9} mb={35} borderRadius='full' borderColor='#50bfc3' bgColor='white' borderWidth={10} p={10}>
          <Icon name='camera' size={90} color='#50bfc3' solid />
        </Box>
      </TouchableOpacity>
    </View>
  );
};

export default HomePage;
