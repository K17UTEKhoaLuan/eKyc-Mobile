import React, { useEffect } from 'react';
import { Box, Heading, View, Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { clearState } from '../../store/reducers/user';
import Icon from 'react-native-vector-icons/Ionicons'

const ResultPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const navigateFunc = () => {
    navigation.navigate('Home');
  }

  useEffect(() => {
    dispatch(clearState())
  }, []);

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
        fontSize={45}
        mb={5}
        w='55%'
        textAlign='center'
      >
        Valid Successed
      </Heading>
      <Box shadow={9} mb={35} borderRadius='full' borderColor='#71F22E' bgColor='white' borderWidth={10} p={10}>
        <Icon name='shield-checkmark-sharp' size={90} color='#71F22E' solid />
      </Box>
      <Button
        mt={2}
        w={250}
        mx='auto'
        size='lg'
        colorScheme="success"
        onPress={navigateFunc}
        startIcon={<Icon name="home-sharp" size={30} color='white' />}
      >
        Back to Home
      </Button>
    </View>
  );
};

export default ResultPage;
