import React, { useState } from 'react';
import { Image } from 'native-base';
import { ApiContext, testData } from '../../api';
import { Dimensions } from 'react-native';

import Camera from '../../components/Camera';

const CameraPage = () => {
  const api = new ApiContext('frontside');
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [state, setState] = useState({
    image: null,
  })

  const takePicture = async (image) => {
    const dataPost = {
      ...testData,
      windowHeight,
      windowWidth,
      maskHeigth: 250,
      maskWidth: 350,
    }
    const res = api.post(dataPost);
    setState((prev) => ({ ...prev, image: testData.image }));
  };
  return (
    <>
      {!state.image ? (
        <Camera handleCapture={takePicture} mode='back' />
      ) : (
        <>
          <Image
            source={{
              uri: `data:image/png;base64,${state.image}`,
            }}
            alt='Not found'
            size={'2xl'}
          />
        </>
      )}
    </>
  );
};

export default CameraPage;
