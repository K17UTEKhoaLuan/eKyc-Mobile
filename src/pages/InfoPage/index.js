import React, { useEffect, useState } from 'react';
import {
    VStack, Heading, View, FormControl, TextArea,
    Input, IconButton, Text, ScrollView, Button, Container,
    Select, CheckIcon, WarningOutlineIcon
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { addInfo } from '../../store/reducers/user';
import { useNavigation } from '@react-navigation/native';
import { stringToSlug } from '../../utils';

import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconScan from 'react-native-vector-icons/MaterialCommunityIcons';
import AlertDialogComponent from '../../components/AlertDialog';
import { ApiContext } from '../../api';

const InfoPage = (props) => {
    const api = new ApiContext();
    const user = useSelector(state => state.user);
    const alertMessage = props?.route?.params?.messageError || '';
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [state, setState] = useState({
        name: '',
        birthDate: new Date(),
        identifyNumber: '',
        sex: '',
        address: '',
        code: '',
        showDatePicker: false,
        alertMessage: '',
        listProvince: [],
        isScanned: false,
    })

    useEffect(async () => {
        const response = await api.get('location/province');
        setState((prev) => ({
            ...prev,
            listProvince: response?.data
        }))
    }, []);

    const navigateFunc = () => {
        const { name, birthDate, identifyNumber, address, sex, code } = state;
        dispatch(addInfo({
            name: stringToSlug(name),
            sex,
            code,
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
        const { name, birthDate, identifyNumber, address, sex, code, isScanned } = user;
        setState((prev) => ({
            ...prev,
            name,
            sex,
            code,
            address,
            isScanned,
            identifyNumber,
            birthDate: birthDate !== '' ? new Date(birthDate) : new Date(),
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
                    INFORMATION FORM
                </Heading>
            </Container>
            <ScrollView py={4} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                <VStack space={5} alignItems="center">
                    <FormControl isRequired isInvalid={!state.name} isDisabled={state.isScanned}>
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
                        isDisabled={state.isScanned}
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
                    <FormControl isRequired isInvalid={!state.sex}>
                        <FormControl.Label>
                            <Text w='98%' fontSize={20}>
                                Sex
                            </Text>
                        </FormControl.Label>
                        <Select
                            accessibilityLabel="Sex"
                            placeholder="Sex"
                            _selectedItem={{
                                bg: "teal.600",
                                endIcon: <CheckIcon size={5} />,
                            }}
                            mt="1"
                            selectedValue={state.sex}
                            onValueChange={(e) => { changeInput(e, 'sex') }}
                        >
                            <Select.Item label="Male" value="Male" />
                            <Select.Item label="Female" value="Female" />
                        </Select>
                        <FormControl.ErrorMessage
                            _invalid={{
                                display: 'flex'
                            }}
                        >
                            Please make a selection!
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl isRequired isInvalid={!state.code}>
                        <FormControl.Label>
                            <Text w='98%' fontSize={20}>
                                Native Village
                            </Text>
                        </FormControl.Label>
                        <Select
                            accessibilityLabel="Native Village"
                            placeholder="Native Village"
                            _selectedItem={{
                                bg: "teal.600",
                                endIcon: <CheckIcon size={5} />,
                            }}
                            mt="1"
                            selectedValue={state.code}
                            onValueChange={(e) => { changeInput(e, 'code') }}
                        >
                            {state.listProvince?.length ? state.listProvince.map(province => (
                                <Select.Item key={province.code} label={province.name} value={province.code} />
                            )) : <></>}
                        </Select>
                        <FormControl.ErrorMessage
                            _invalid={{
                                display: 'flex'
                            }}
                        >
                            Please make a selection!
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl isRequired isDisabled={state.isScanned}>
                        <FormControl.Label>
                            <Text w='98%' fontSize={20}>
                                Address
                            </Text>
                        </FormControl.Label>
                        <TextArea h={20}
                            placeholder="Address"
                            value={state.address}
                            onChangeText={(e) => { changeInput(e, 'address') }}
                        />
                    </FormControl>
                    <FormControl isRequired isDisabled={state.isScanned}>
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
                        disabled={!state.name || !state.identifyNumber || !(/^\d+$/.test(state.identifyNumber)) || !state.sex || !state.code}
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
