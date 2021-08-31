import React, { useEffect, useState } from 'react';
import RNFS from 'react-native-fs';
import ImageEditor from '@react-native-community/image-editor';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { ApiContext } from '../../api';
import { addImage } from '../../store/reducers/user';
import Camera from '../../components/Camera';

const CameraPage = (props) => {
  const api = new ApiContext();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { mode = 'back' } = props.route.params;

  const [state, setState] = useState({
    image: null,
    result: false,
    isLoading: false,
  })

  useEffect(() => {
    setState((prev) => ({ ...prev, mode }));
  }, [mode]);

  const takePicture = (uri, width, height) => {
    setState((prev) => ({ ...prev, isLoading: true }))
    const cropData = {
      offset: { x: 0, y: 0 },
      size: { width, height },
      displaySize: { width: 1280, height: 960 },
    };

    ImageEditor.cropImage(uri, cropData)
      .then((resizedImage) => {
        RNFS.readFile(resizedImage, 'base64')
          .then(async base64 => {
            const dataPost = {
              image: base64,
              name: 'HIEU',
              identityNumber: '123',
              address: 'abc',
              birthday: '01/01/2002',
              imageWidth: 1280,
              imageHeight: 960,
              identityWidth: 550,
              identityHeight: 700,
            }

            const { base64String, result } = await api.post('frontside', dataPost);
            dispatch(addImage({
              key: mode,
              dataImage: base64String
            }))
            setState((prev) => ({ ...prev, result, image: base64String, isLoading: false }));
            navigation.navigate('IdentifyCard');
          });
      });
  };

  return (
    <Camera handleCapture={takePicture} isLoading={state.isLoading} />
  );
};

export default CameraPage;
