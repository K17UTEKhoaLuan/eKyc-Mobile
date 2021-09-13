import React, { useEffect, useState } from 'react';
import {
    VStack, Heading, View, FormControl, TextArea,
    Input, IconButton, Text, ScrollView, Button, Container
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { addInfo } from '../../store/reducers/user';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome'
import AlertDialogComponent from '../../components/AlertDialog';

const InfoPage = (props) => {
    const user = useSelector(state => state.user);
    const { alertMessage = '' } = props.route.params;
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

    const stringToSlug = (str) => {
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
        str = str.replace(/\u02C6|\u0306|\u031B/g, "");
        return str.toUpperCase();
    }

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
                            w='98%'
                            placeholder='Ex: TUAN'
                            borderColor='gray'
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
                            w='98%'
                            placeholder='Ex: 025839921'
                            borderColor='gray'
                            _invalid={{
                                borderColor: 'red'
                            }}
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
                        <TextArea w='98%' h={20} placeholder="Address" onChangeText={(e) => { changeInput(e, 'address') }} />
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
