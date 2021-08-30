import React, { useState } from 'react';
import { Image } from 'native-base';
import { ApiContext } from '../../api';
import RNFS from 'react-native-fs';
import ImageEditor from '@react-native-community/image-editor';

import Camera from '../../components/Camera';

const CameraPage = () => {
  const api = new ApiContext();

  const [state, setState] = useState({
    image: null,
    result: false
  })

  const takePicture = (uri, width, height) => {
    console.log(width, height);
    const cropData = {
      offset: { x: 0, y: 0 },
      size: { width, height },
      // displaySize: { width: RESIZED_WIDTH, height: RESIZED_HEIGHT },
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
              imageWidth: width,
              imageHeight: height,
              identityWidth: 550,
              identityHeight: 700,
            }

            const { base64String, result } = await api.post('frontside', dataPost);
            setState((prev) => ({ ...prev, result, image: base64String }));
          });
      });
  };

  return (
    <>
      {!state.image ? (
        <Camera handleCapture={takePicture} mode='back' />
      ) : (
        <>
          <Image
            width={350}
            height={250}
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
