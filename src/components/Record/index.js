import React, { useEffect, useRef, useState } from 'react';
import { RNCamera } from 'react-native-camera';
import { View, Button,Text } from 'native-base';
import BarcodeMask from 'react-native-barcode-mask';

const Record = (props) => {
    const {
        styles,
        mode = 'back',
        handleRecord,
    } = props;
    const cameraRef = useRef(null);
    const [state, setState] = useState({
        isRecording: false,
        cameraRef: null
    })

    const record = (camera) => () => {
        setState((prev) => ({ ...prev, isRecording: true }));
        const options = { quality: RNCamera.Constants.VideoQuality['1080p'], maxFileSize: 20 * 1024 * 1024 };
        camera.recordAsync(options)
            .then(({ uri }) => {
                handleRecord(uri);
            });
    };

    const stopRecord = (camera) => async () => {
        setState((prev) => ({ ...prev, isRecording: false }));
        await camera.stopRecording();
    }

    const type = ({
        front: RNCamera.Constants.Type.front,
        back: RNCamera.Constants.Type.back
    }[mode]);

    return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
            <RNCamera
                ref={cameraRef}
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
                        <BarcodeMask width={400} height={260} showAnimatedLine={false} />
                        <View style={{ display: !state.isRecording ? 'flex' : 'none', flexDirection: 'row', marginBottom: 30 }}>
                            <Button
                                isLoading={state.isRecording}
                                isLoadingText="Recording ..."
                                onPressIn={record(camera)}
                                onPressOut={stopRecord(camera)}
                            >
                                Continue
                            </Button>
                        </View>
                    </>
                )
                }
            </RNCamera>
        </View >
    );
};

export default Record;
