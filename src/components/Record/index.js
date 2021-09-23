import React, { useEffect, useRef, useState } from 'react';
import { RNCamera } from 'react-native-camera';
import { View, Button, Heading } from 'native-base';
import BarcodeMask from 'react-native-barcode-mask';

const Record = (props) => {
    const {
        styles,
        mode = 'front',
        guide,
        handleRecord,
    } = props;
    const cameraRef = useRef(null);
    const [state, setState] = useState({
        isRecording: false,
        cameraRef: null
    })

    const record = (camera) => () => {
        setState((prev) => ({ ...prev, isRecording: true }));

        const options = {
            quality: RNCamera.Constants.VideoQuality['288p'],
            maxFileSize: 10 * 1024 * 1024,
            maxDuration: 5
        };

        camera.recordAsync(options)
            .then(async ({ uri }) => {
                await handleRecord(uri);
                setState((prev) => ({ ...prev, isRecording: false }));                
            });
    };

    const stopRecord = (camera) => async () => { }

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
                        <BarcodeMask width={400} height={500} showAnimatedLine={false} />

                        {!!guide && (
                            <View style={{
                                backgroundColor: 'white',
                                borderRadius: 6,
                                padding: 10,
                                top: 15,
                                position: 'absolute'
                            }}>
                                <Heading
                                    alignSelf={{
                                        base: "center",
                                        md: "flex-start",
                                    }}
                                >
                                    {guide}
                                </Heading>
                            </View>
                        )}
                        <View style={{ display: !state.isRecording ? 'flex' : 'none', flexDirection: 'row', marginBottom: 30 }}>
                            <Button
                                isLoading={state.isRecording}
                                disabled={!guide}
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
