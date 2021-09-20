import React, { useState } from 'react';
import RNFS from 'react-native-fs';
import ImageEditor from '@react-native-community/image-editor';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { ApiContext } from '../../api';
import { addImage } from '../../store/reducers/user';
import Record from '../../components/Record';

const RecordPage = (props) => {
    const api = new ApiContext();
    const dispatch = useDispatch();
    const navigation = useNavigation();
    // const { mode = 'back' } = props.route.params;

    const [state, setState] = useState({
        image: null,
        result: false,
    })

    const record = (uri) => {
        const data = new FormData();
        data.append('files',
            {
                uri,
                name: 'userProfile.mp4',
                type: 'video/mp4'
            });
            
        api.post('cmnd/uploadfile', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        // result: true
        // nextStep: 'left'
        // complete: true

        // result: false
        // complete: false
    };

    return (
        <Record handleRecord={record} />
    );
};

export default RecordPage;
