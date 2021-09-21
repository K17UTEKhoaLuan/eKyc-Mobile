import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { ApiContext } from '../../api';

import Record from '../../components/Record';
import AlertDialogComponent from '../../components/AlertDialog';

const RecordPage = () => {
    const api = new ApiContext();
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [state, setState] = useState({
        pose: '',
        pose_id: '',
        resultValid: false
    })

    useEffect(async () => {
        const result = await api.post('face/gesture', {}, { params: { identityNumber: '025837926' } });
        setState((prev) => ({ ...prev, pose: result.pose, pose_id: result.pose_id }));
    }, [])

    const handleCloseAlert = () => {
        setState((prev) => ({ ...prev, resultValid: false }))
    }

    const record = async (uri) => {
        const data = new FormData();
        data.append('file',
            {
                uri,
                name: 'userProfile.mp4',
                type: 'video/mp4'
            });

        const res = await api.post('face/checkgesture', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            params: { identityNumber: '025837926' }
        });
        console.log(res);
        if (res.complete) {
            navigation.navigate('FaceComparePage')
        } else {

            if (res.result) {
                setState((prev) => ({ ...prev, pose: res.pose, pose_id: res.pose_id }));
            } else {
                setState((prev) => ({ ...prev, resultValid: true }));
            }        
        }
    };

    return (
        <>
            <Record handleRecord={record} guide={state.pose} />
            <AlertDialogComponent
                open={state.resultValid}
                message='Valid failed, please try again!'
                handleCloseAlert={handleCloseAlert}
            />
        </>
    );
};

export default RecordPage;
