import React from 'react';
import { RNCamera } from 'react-native-camera';
import { View, Button } from 'native-base';
import BarcodeMask from 'react-native-barcode-mask';

const Camera = (props) => {
    const {
        styles,
        mode = 'back',
        handleCapture
    } = props;

    const takePicture = (camera) => {
        return async () => {
            const options = { quality: 0.5, base64: true };
            const { uri, width, height } = await camera.takePictureAsync(options);
            handleCapture(uri, width, height);
        };
    };

    const type = ({
        front: RNCamera.Constants.Type.front,
        back: RNCamera.Constants.Type.back
    }[mode]);

    return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
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
                    <>
                        <BarcodeMask width={350} height={250} showAnimatedLine={false} />
                        <Button onPress={takePicture(camera)}>Snap</Button>
                    </>
                )}
            </RNCamera>
        </View >
    );
};

export default Camera;
