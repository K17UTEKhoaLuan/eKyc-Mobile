import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { stringToSlug, getDateFromScan } from '../../utils';
import { addInfo } from '../../store/reducers/user';

import QRScan from '../../components/QRScan';

const QRScanPage = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleScan = (dataScan = []) => {
        const [
            newIdentityNumber,
            oldIdentityNumber,
            name,
            birthDate,
            address,
            appliedDate
        ] = dataScan.split('|');

        if (newIdentityNumber.length === 12 && oldIdentityNumber.length === 9 && appliedDate.length === 8) {
            dispatch(addInfo({
                name: stringToSlug(name),
                address,
                identifyNumber: newIdentityNumber,
                birthDate: getDateFromScan(birthDate).toISOString().substring(0, 10),
            }));

            navigation.goBack();
        }
    }

    return (
        <>
            <QRScan onScan={handleScan} />
        </>
    );
};

export default QRScanPage;
