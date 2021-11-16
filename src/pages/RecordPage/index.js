import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { ApiContext } from '../../api';

import Record from '../../components/Record';
import AlertDialogComponent from '../../components/AlertDialog';

const RecordPage = () => {
    const api = new ApiContext();
    const identityNumber = useSelector(state => state.user.identifyNumber);
    const navigation = useNavigation();

    const [state, setState] = useState({
        pose: '',
        pose_id: '',
        alertMessage: '',
        resultValid: false,
    })
    const [timerCount, setTimer] = useState(10)

    useEffect(() => {
        let interval = setInterval(() => {
            setTimer(lastTimerCount => {
                lastTimerCount <= 1 && clearInterval(interval)
                return lastTimerCount - 1
            })
        }, 1000)
        return () => clearInterval(interval)
    }, []);

    useEffect(async () => {
        const result = await api.post('face/gesture', {}, { params: { identityNumber } });
        setState((prev) => ({ ...prev, pose: result.pose, pose_id: result.pose_id }));
    }, [])

    useEffect(() => {
        if (timerCount <= 0) {
            navigation.navigate('IdentifyCard');
        }
    }, [timerCount])

    const handleCloseAlert = () => {
        setState((prev) => ({
            ...prev,
            alertMessage: '',
            resultValid: false,
        }))
    }

    const record = async (uri) => {
        setTimer(10);
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
            params: { identityNumber }
        });
        console.log(res);
        if (res.complete) {
            navigation.navigate('FaceComparePage')
        } else {

            if (res.result) {
                setState((prev) => ({
                    ...prev,
                    pose: res.pose,
                    pose_id: res.pose_id,
                    resultValid: false
                }));
            } else {
                setState((prev) => ({
                    ...prev,
                    resultValid: true,
                    alertMessage: JSON.stringify(res)
                }));
            }
        }
    };

    return (
        <>
            <Record handleRecord={record} guide={state.pose} />
            <AlertDialogComponent
                open={state.resultValid}
                message={state.alertMessage}
                handleCloseAlert={handleCloseAlert}
            />
        </>
    );
};

export default RecordPage;
