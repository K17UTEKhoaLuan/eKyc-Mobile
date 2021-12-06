import React from 'react';
import { RNCamera } from 'react-native-camera';
import { View, Button, Text } from 'native-base';
import BarcodeMask from 'react-native-barcode-mask';
import { borderColor, borderRadius, height } from 'styled-system';

const Camera = (props) => {
    const {
        styles,
        mode = 'back',
        handleCapture,
        isLoading,
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
            >
                {({ camera }) => (
                    <>
                        <BarcodeMask width={400} height={260} showAnimatedLine={false} />
                        <Button
                            mb={5}
                            isLoading={isLoading}
                            isLoadingText="Loading ..."
                            onPress={takePicture(camera)}
                            style={{
                                backgroundColor: 'transparent',
                                borderStyle: 'solid',
                                borderWidth: 7,
                                borderColor: 'linear-gradient(90deg, rgba(124, 212, 207, 1), rgba(124, 212, 207, 0)),repeating-linear-gradient(-45deg, #9aa6a5, #9aa6a5 1.5px, #49c8c1 2px, #49c8c1 4px);',
                                borderRadius: 9999,
                                height: 100
                            }}
                        >
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Capture</Text>
                        </Button>
                    </>
                )}
            </RNCamera>
        </View >
    );
};

export default Camera;
