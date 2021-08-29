import React, { useState } from 'react';
import { Image } from 'native-base';
import { ApiContext } from '../../api';

import Camera from '../../components/Camera';

const CameraPage = () => {
  const api = new ApiContext();

  const [state, setState] = useState({
    image: null,
    result: false
  })

  const takePicture = async (image, width, height) => {
    const dataPost = {
      image,
      name: 'HIEU',
      identityNumber: '123',
      address: 'abc',
      birthday: '01/01/2002',
      imageWidth: width,
      imageHeight: height,
      identityWidth: 700,
      identityHeight: 550,
    }

    const { base64String, result } = await api.post('frontside', dataPost);
    setState((prev) => ({ ...prev, result, image: base64String }));


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
