import React, { useEffect, useMemo, useRef, useState } from 'react';
import { RNCamera } from 'react-native-camera';
import { View, Button, Heading, Text, Image } from 'native-base';
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
        cameraRef: null,
    })

    const record = (camera) => () => {
        setState((prev) => ({ ...prev, isRecording: true }));

        const options = {
            quality: RNCamera.Constants.VideoQuality['288p'],
            maxFileSize: 10 * 1024 * 1024,
            maxDuration: 3
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

    const mappedGuide = (guide) => ({
        face_down: {
            name: 'Head down',
            url: require('../../../public/down.jpg'),
        },
        face_up: {
            name: 'Head up',
            url: require('../../../public/up.jpg'),
        },
        face_up_and_left: {
            name: 'Head up and turn left',
            url: require('../../../public/up_left.jpg'),
        },
        face_up_and_right: {
            name: 'Head up and turn right',
            url: require('../../../public/up_right.jpg'),
        },
        face_down_left: {
            name: 'Head down and turn left',
            url: require('../../../public/down_left.jpg'),
        },
        face_down_and_right: {
            name: 'Head down and turn right',
            url: require('../../../public/down_right.jpg'),
        },
        face_turn_right: {
            name: 'Turn your head right',
            url: require('../../../public/right.jpg'),
        },
        face_turn_left: {
            name: 'Turn your head left',
            url: require('../../../public/left.jpg'),
        },
        front: {
            name: 'Please see in your camera!',
            url: require('../../../public/front.jpg'),
        },
    }[guide]);

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
            >
                {({ camera }) => (
                    <>
                        <BarcodeMask width={400} height={500} showAnimatedLine={false} />

                        {!!guide && (
                            <>
                                <View style={{
                                    backgroundColor: 'transparent',
                                    padding: 10,
                                    top: 10,
                                    position: 'absolute'
                                }}>
                                    <Heading
                                        alignSelf={{
                                            base: "center",
                                            md: "flex-start",
                                        }}
                                        style={{
                                            color: '#D8DADB',
                                            fontWeight: '600'
                                        }}
                                    >
                                        {mappedGuide(guide).name}
                                    </Heading>
                                </View>
                                {!state.isRecording && (
                                    <View
                                        style={{
                                            borderRadius: 10,
                                            borderStyle: 'solid',
                                            borderWidth: 1,
                                            alignSelf: 'center',
                                            marginBottom: 80
                                        }}
                                        shadow={7}
                                    >
                                        <Image
                                            style={{
                                                borderRadius: 10,
                                                alignSelf: 'center',
                                            }}
                                            w={240}
                                            h={300}
                                            resizeMode='cover'
                                            source={mappedGuide(guide).url}
                                            alt={mappedGuide(guide).name}
                                        />
                                    </View>
                                )}
                            </>
                        )}
                        <View style={{ display: !state.isRecording ? 'flex' : 'none', flexDirection: 'row', marginBottom: 7, padding: 5 }}>
                            <Button
                                isLoading={state.isRecording}
                                disabled={!guide}
                                isLoadingText="Recording ..."
                                onPressIn={record(camera)}
                                onPressOut={stopRecord(camera)}
                                style={{
                                    backgroundColor: '#5F7465',
                                    borderWidth: 1.5,
                                    borderStyle: 'solid',
                                    borderColor: '#464C48',
                                    width: 180
                                }}
                            >
                                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Continue</Text>
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
