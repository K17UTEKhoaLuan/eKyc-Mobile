import React from 'react';
import { RNCamera } from 'react-native-camera';
import { View, Text, Button } from 'native-base';

const Camera = (props) => {
    const {
        styles,
        mode = 'back',
        handleCapture
    } = props;

    const takePicture = (camera) => {
        return async () => {
            const options = { quality: 0.5, base64: true };
            const { base64 } = await camera.takePictureAsync(options);
            handleCapture(base64);
        };
    };

    const type = ({
        front: RNCamera.Constants.Type.front,
        back: RNCamera.Constants.Type.back
    }[mode]);

    return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
            <Text>CameraPage</Text>
            <RNCamera
                type={type}
                style={
                    Object.assign({
                        flex: 1,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }, styles)
                }
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
            >
                {({ camera }) => (
                    < Button onPress={takePicture(camera)}>Snap</Button>
                )}
            </RNCamera>
        </View >
    );
};

export default Camera;
