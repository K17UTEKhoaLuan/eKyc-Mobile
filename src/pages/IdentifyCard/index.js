import React from 'react';
import {
    VStack, Heading, View, Button, Container, ScrollView, Image
} from 'native-base';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign'

const IndentifyCardPage = () => {
    const navigation = useNavigation();
    const image = useSelector(state => state);

    const navigateFunc = (mode) => {
        return () => {
            navigation.navigate('Camera', { mode });
        }
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
            <ScrollView w='100%'>
                <VStack space={5} p={2} alignItems="center">
                    <Container>
                        {image.front ? (
                            <Image
                                w={350}
                                h={250}
                                source={{
                                    uri: `data:image/png;base64,${image.front}`,
                                }}
                                alt='Not found'
                            />
                        ) : (
                            <Icon name='idcard' size={200} />
                        )}
                        <Button
                            mx='auto'
                            startIcon={<Icon name="camerao" size={25} color='white' />}
                            endIcon={<Icon name="arrowright" size={25} color='white' />}
                            onPress={navigateFunc('front')}
                        >
                            Frontside
                        </Button>
                    </Container>
                    <Container>
                        {image.back ? (
                            <Image
                                w={350}
                                h={250}
                                source={{
                                    uri: `data:image/png;base64,${image.back}`,
                                }}
                                alt='Not found'
                            />
                        ) : (
                            <Icon name='creditcard' size={200} />
                        )}
                        <Button
                            mx='auto'
                            startIcon={<Icon name="camerao" size={25} color='white' />}
                            endIcon={<Icon name="arrowright" size={25} color='white' />}
                            onPress={navigateFunc('back')}
                        >
                            Backside
                        </Button>
                    </Container>
                </VStack>
            </ScrollView>
        </View>
    );
};

export default IndentifyCardPage;
