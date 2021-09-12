import React from 'react';
import {
    VStack, Heading, View, Button, Container, ScrollView, Image, Box
} from 'native-base';

import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';

import Icon from 'react-native-vector-icons/AntDesign'

import { ApiContext } from '../../api';

const IndentifyCardPage = () => {
    const api = new ApiContext();
    const navigation = useNavigation();
    const user = useSelector(state => state.user);

    const navigateFunc = (mode) => {
        return () => {
            navigation.navigate('Camera', { mode });
        }
    }

    const onValidate = async () => {
        const {
            name = '',
            identifyNumber = '',
            address = '',
            birthDate = '',
            imageCard = {}
        } = user;
        
        const result = await api.post('cmnd/validation', {
            name,
            address,
            identityNumber: identifyNumber,
            birthday: format(new Date(birthDate), 'dd-MM-yyyy'),
            frontside: imageCard.front,
            backside: imageCard.back
        });
        console.log(result);
    }

    return (
        <View
            bgColor='white'
            alignItems='center'
            h='100%'
            p={5}
        >
            <Container borderBottomWidth={1} borderBottomColor='gray'>
                <Heading
                    fontSize={30}
                    mb={5}
                    w={300}
                    textAlign='center'
                >
                    IDENTIFY CARD
                </Heading>
            </Container>
            <ScrollView w='100%' showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                <VStack space={5} p={2} alignItems="center">
                    <Container>
                        {user?.imageCard?.front ? (
                            <Box shadow={9} style={{ border: 'solid', borderWidth: 1 }}>
                                <Image
                                    w={350}
                                    h={250}
                                    source={{
                                        uri: `data:image/png;base64,${user?.imageCard.front}`,
                                    }}
                                    alt='Not found'
                                />
                            </Box>
                        ) : (
                            <Icon name='idcard' size={200} />
                        )}
                        <Button
                            mt={2}
                            mx='auto'
                            startIcon={<Icon name="camerao" size={25} color='white' />}
                            endIcon={<Icon name="arrowright" size={25} color='white' />}
                            onPress={navigateFunc('front')}
                        >
                            Frontside
                        </Button>
                    </Container>
                    <Container>
                        {user?.imageCard?.back ? (
                            <Box shadow={9} style={{ border: 'solid', borderWidth: 1 }}>
                                <Image
                                    w={350}
                                    h={250}
                                    source={{
                                        uri: `data:image/png;base64,${user?.imageCard.back}`,
                                    }}
                                    alt='Not found'
                                />
                            </Box>
                        ) : (
                            <Icon name='creditcard' size={200} />
                        )}
                        <Button
                            mt={2}
                            mx='auto'
                            startIcon={<Icon name="camerao" size={25} color='white' />}
                            endIcon={<Icon name="arrowright" size={25} color='white' />}
                            onPress={navigateFunc('back')}
                        >
                            Backside
                        </Button>
                    </Container>
                    <Button
                        mt={2}
                        mx='auto'
                        onPress={onValidate}
                    >
                        Confirm
                    </Button>
                </VStack>
            </ScrollView>
        </View>
    );
};

export default IndentifyCardPage;
