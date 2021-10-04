import React from 'react';
import { RNCamera } from 'react-native-camera';
import { View } from 'native-base';
import BarcodeMask from 'react-native-barcode-mask';

const QRScan = (props) => {
    const {
        styles,
        mode = 'back',
        onScan
    } = props;

    const onBarCodeRead = (scanResult) => {
        onScan(scanResult.data);
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

                barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
                onBarCodeRead={onBarCodeRead}
            >
                <BarcodeMask width={300} height={300} showAnimatedLine={true} />
            </RNCamera>
        </View >
    );
};

export default QRScan;
