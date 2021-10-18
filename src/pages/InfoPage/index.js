import React, { useEffect, useState } from 'react';
import {
    VStack, Heading, View, FormControl, TextArea,
    Input, IconButton, Text, ScrollView, Button, Container
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { addInfo } from '../../store/reducers/user';
import { useNavigation } from '@react-navigation/native';
import { stringToSlug } from '../../utils';

import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconScan from 'react-native-vector-icons/MaterialCommunityIcons';
import AlertDialogComponent from '../../components/AlertDialog';

const InfoPage = (props) => {
    const user = useSelector(state => state.user);
    const alertMessage = props?.route?.params?.alertMessage || '';
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [state, setState] = useState({
        name: '',
        birthDate: new Date(),
        identifyNumber: '',
        address: '',
        showDatePicker: false,
        alertMessage: ''
    })


    const navigateFunc = () => {
        const { name, birthDate, identifyNumber, address } = state;
        dispatch(addInfo({
            name: stringToSlug(name),
            address,
            identifyNumber,
            birthDate: birthDate.toISOString().substring(0, 10),
        }));
        navigation.navigate('IdentifyCard');
    }

    const changeInput = (value, key) => {
        setState((prev) => ({ ...prev, [key]: value }))
    }

    const pickDate = (_, date) => {
        setState((prev) => ({
            ...prev,
            birthDate: date || prev.birthDate,
            showDatePicker: !prev.showDatePicker
        }));
    }

    const renderCheckIdentifyNumber = () => {
        if (!state.identifyNumber) return 'Required field.';
        else {
            return !(/^\d+$/.test(state.identifyNumber)) ? 'Invalid identify number.' : 'Required field.';
        }
    }

    const handleCloseAlert = () => {
        setState((prev) => ({ ...prev, alertMessage: '' }))
    }

    useEffect(() => {
        setState((prev) => ({ ...prev, alertMessage }));
    }, [alertMessage]);

    useEffect(() => {
        const { name, birthDate, identifyNumber, address } = user;
        setState((prev) => ({
            ...prev,
            name,
            birthDate: birthDate !== '' ? new Date(birthDate) : new Date(),
            identifyNumber,
            address,
        }))
    }, [user]);

    return (
        <View
            bgColor='white'
            alignItems='center'
            h='100%'
            p={5}
        >
            <Container borderBottomWidth={1}>
                <Heading
                    fontSize={30}
                    mb={5}
                    w={300}
                    textAlign='center'
                >
                    INFOMATION FORM
                </Heading>
            </Container>
            <ScrollView py={4} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                <VStack space={5} alignItems="center">
                    <FormControl isRequired isInvalid={!state.name}>
                        <FormControl.Label>
                            <Text w='98%' fontSize={20}>
                                Full Name
                            </Text>
                        </FormControl.Label>
                        <Input
                            placeholder='Ex: TUAN'
                            _invalid={{
                                borderColor: 'red'
                            }}
                            value={state.name}
                            onChangeText={(e) => { changeInput(e, 'name') }}
                        />
                        <FormControl.HelperText>
                            Write unsigned and uppercase.
                        </FormControl.HelperText>
                        <FormControl.ErrorMessage
                            _invalid={{
                                display: 'flex'
                            }}
                        >
                            Required field.
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl
                        isRequired
                        isInvalid={!state.identifyNumber || !(/^\d+$/.test(state.identifyNumber))}>
                        <FormControl.Label>
                            <Text w='98%' fontSize={20}>
                                Identity Number
                            </Text>
                        </FormControl.Label>
                        <Input
                            placeholder='Ex: 025839921'
                            _invalid={{
                                borderColor: 'red'
                            }}
                            InputRightElement={
                                <IconButton
                                    variant="solid"
                                    icon={<IconScan name='qrcode-scan' size={35} color="white" />}
                                    onPress={() => { navigation.navigate('QRScan') }}
                                />
                            }
                            value={state.identifyNumber}
                            onChangeText={(e) => { changeInput(e, 'identifyNumber') }}
                        />
                        <FormControl.HelperText>
                            Write number.
                        </FormControl.HelperText>
                        <FormControl.ErrorMessage
                            _invalid={{
                                display: 'flex'
                            }}
                        >
                            {renderCheckIdentifyNumber()}
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl >
                        <FormControl.Label>
                            <Text w='98%' fontSize={20}>
                                Address
                            </Text>
                        </FormControl.Label>
                        <TextArea h={20} placeholder="Address" onChangeText={(e) => { changeInput(e, 'address') }} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label>
                            <Text w='98%' fontSize={20}>
                                BirthDate
                            </Text>
                        </FormControl.Label>
                        <Input
                            InputRightElement={
                                <IconButton
                                    variant="solid"
                                    icon={<Icon name='calendar' size={35} color="white" />}
                                    onPress={() => { setState((prev) => ({ ...prev, showDatePicker: !prev.showDatePicker })) }}
                                />
                            }
                            value={state.birthDate.toISOString().substring(0, 10)}
                        />
                        {state.showDatePicker && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={state.birthDate}
                                mode='date'
                                is24Hour={true}
                                display="default"
                                onChange={pickDate}
                            />
                        )}
                    </FormControl>
                    <Button
                        disabled={!state.name || !state.identifyNumber || !(/^\d+$/.test(state.identifyNumber))}
                        my={10}
                        w='100%'
                        onPress={navigateFunc}>
                        Submit
                    </Button>
                </VStack>
            </ScrollView>
            <AlertDialogComponent open={Boolean(state.alertMessage)} message={state.alertMessage} handleCloseAlert={handleCloseAlert} />
        </View>
    );
};

export default InfoPage;
