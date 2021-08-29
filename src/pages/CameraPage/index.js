import React from 'react';
import Camera from '../../components/Camera';
import { ApiContext, testData } from '../../api';

const CameraPage = () => {
  const api = new ApiContext('frontside');

  const takePicture = async (image) => {
    const res = await api.post(testData);
    console.log(res);
  };
  return (
    <Camera handleCapture={takePicture} mode='back' />
  );
};

export default CameraPage;
