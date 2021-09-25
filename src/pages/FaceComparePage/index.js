import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { ApiContext } from '../../api';

import Record from '../../components/Record';
import AlertDialogComponent from '../../components/AlertDialog';

const FaceComparePage = () => {
    const api = new ApiContext();
    const identityNumber = useSelector(state => state.user.identifyNumber);
    const navigation = useNavigation();

    const [state, setState] = useState({
        pose: 'Please see in your camera!',
        pose_id: '',
        alertMessage: ''
    })


    const record = async (uri) => {
        const data = new FormData();
        data.append('file',
            {
                uri,
                name: 'userProfile.mp4',
                type: 'video/mp4'
            });

        const res = await api.post('face/compareface', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            params: { identityNumber }
        });

        if (res.result) {
            navigation.navigate('ResultPage')
        } else {
            setState((prev) => ({ ...prev, alertMessage: res.message }))
        }
    };

    const handleCloseAlert = () => {
        setState((prev) => ({ ...prev, alertMessage: '' }))
    }

    return (
        <>
            <Record handleRecord={record} guide={state.pose} />
            <AlertDialogComponent
                open={!!state.alertMessage}
                message='Valid failed, please try again!'
                handleCloseAlert={handleCloseAlert}
            />
        </>
    );
};

export default FaceComparePage;
