import React, { useEffect } from "react";
import {
    AlertDialog,
    Button,
    Center,
    Text
} from "native-base";
import IconEntypo from 'react-native-vector-icons/Entypo';

const AlertDialogComponent = ({ open, message, handleCloseAlert }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => {
        setIsOpen(false);
        handleCloseAlert();
    }
    const cancelRef = React.useRef();

    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    return (
        <Center>
            <AlertDialog
                leastDestructiveRef={cancelRef}
                isOpen={isOpen}
                onClose={onClose}
                motionPreset={"fade"}
            >
                <AlertDialog.Content>
                    <AlertDialog.Header style={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}>
                        <IconEntypo name='info-with-circle' size={25} color='#477AAB' />
                        <Text style={{
                            marginLeft: 10,
                            fontWeight: 'bold',
                            fontSize: 20
                        }}>
                            Message
                        </Text>
                    </AlertDialog.Header>
                    <AlertDialog.Body>
                        <Text style={{
                            fontSize: 22,
                            fontWeight: 'normal'
                        }}>
                            - {message}.
                        </Text>
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Button ref={cancelRef} onPress={onClose}
                            style={{
                                width: 80,
                                height: 45,
                                backgroundColor: 'red',
                            }}
                        >
                            <Text style={{
                                fontSize: 17,
                                fontWeight: 'bold',
                                color: 'white'
                            }}>
                                Close
                            </Text>
                        </Button>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>
        </Center>
    );
}

export default AlertDialogComponent;